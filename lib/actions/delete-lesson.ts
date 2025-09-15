"use server";

import { z } from "zod";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import connectDB from "@/lib/db";
import type { LessonActionState, LessonFieldErrors } from "@/lib/actions/types";
import Lesson from "../models/deck-schema";
import Card from "../models/card-schema";

const DeleteLessonSchema = z.object({
  _id: z.string().refine(mongoose.Types.ObjectId.isValid, "Invalid lesson id"),
});

export async function deleteLesson(
  _prev: LessonActionState,
  formData: FormData
): Promise<LessonActionState> {
  const parsed = DeleteLessonSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    return { Error: parsed.error.flatten().fieldErrors as LessonFieldErrors };
  }

  const { _id } = parsed.data;

  await connectDB();
  try {
    const removed = await Lesson.findByIdAndDelete(_id).lean();
    if (!removed) {
      return { Error: { _id: ["Lesson not found."] } };
    }

    // Optional cascade delete — keep if your app owns Card/Note
    await Promise.all([
      Card.deleteMany({ lessonId: _id }).catch(() => {}),
    //   Note.deleteMany({ lessonId: _id }).catch(() => {}),
    ]);
  } catch (err) {
    console.error("deleteLesson error:", err);
    return { Error: { _id: ["Could not delete lesson. Please try again."] } };
  }

  // Revalidate lists/home and go home
  revalidatePath("/");
  revalidatePath("/lessons");
  redirect("/");
}
