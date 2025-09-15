"use server";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import connectDB from "@/lib/db";
import type { LessonActionState, LessonFieldErrors } from "@/lib/actions/types";
import Lesson from "../models/deck-schema";

const LessonCreateSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  rating: z.coerce.number().min(0).max(5).optional().default(0),
});

export async function postLesson(
  _prev: LessonActionState,
  formData: FormData
): Promise<LessonActionState> {
  const parsed = LessonCreateSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    return { Error: parsed.error.flatten().fieldErrors as LessonFieldErrors };
  }

  const { title, rating } = parsed.data;

  await connectDB();
  try {
    await Lesson.create({ title: title.trim(), rating });
  } catch (e) {
    return { Error: { title: ["Failed to create lesson. Please try again."] } };
  }

  revalidatePath("/");
  redirect("/");
}
