// /lib/actions/delete-lesson-form.ts
"use server";

import { z } from "zod";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import connectDB from "@/lib/db";
import Lesson from "../models/deck-schema";
import Card from "../models/card-schema";

const DeleteLessonSchema = z.object({
  _id: z.string().refine(mongoose.Types.ObjectId.isValid, "Invalid lesson id"),
});

export async function deleteLessonForm(formData: FormData): Promise<void> {
  const parsed = DeleteLessonSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    // No state returned (this is a 1-arg form action). Log and bail.
    console.error("deleteLessonForm validation error:", parsed.error.flatten().fieldErrors);
    return;
  }

  const { _id } = parsed.data;

  await connectDB();
  try {
    const removed = await Lesson.findByIdAndDelete(_id).lean();
    if (!removed) {
      console.warn("deleteLessonForm: lesson not found:", _id);
      return; // silently no-op; or throw new Error(...) to surface a 500
    }

    // Optional cascade delete of related cards
    await Card.deleteMany({ lessonId: _id }).catch((e) =>
      console.error("deleteLessonForm: cascade delete cards failed:", e)
    );
  } catch (err) {
    console.error("deleteLessonForm error:", err);
    return;
  }

  // Revalidate lists/home and go home
  revalidatePath("/");
  revalidatePath("/lessons");
  redirect("/");
}
