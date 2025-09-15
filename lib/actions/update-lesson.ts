"use server";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import connectDB from "@/lib/db";
import type { LessonActionState, LessonFieldErrors } from "@/lib/actions/types";
import Lesson from "../models/deck-schema";

const LessonUpdateSchema = z.object({
  _id: z.string().min(1, "Missing lesson id"),
  title: z.string().min(2, "Title must be at least 2 characters"),
  rating: z.coerce.number().min(0).max(5).optional().default(0),
});

export async function updateLesson(
  _prev: LessonActionState,
  formData: FormData
): Promise<LessonActionState> {
  const parsed = LessonUpdateSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    return { Error: parsed.error.flatten().fieldErrors as LessonFieldErrors };
  }

  const { _id, title, rating } = parsed.data;

  await connectDB();
  try {
    const updated = await Lesson.findByIdAndUpdate(
      _id,
      { $set: { title: title.trim(), rating } },
      { new: true }
    ).lean();

    if (!updated) return { Error: { _id: ["Lesson not found."] } };
  } catch (e) {
    return { Error: { title: ["Failed to update lesson. Please try again."] } };
  }

  revalidatePath("/");
  redirect("/");
}
