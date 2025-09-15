"use server";

import { z } from "zod";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import connectDB from "@/lib/db";
import Card from "../models/card-schema";

const learnedCoerce = z.preprocess((v) => {
  // HTML checkbox posts "on" when checked; treat truthy strings/numbers/booleans
  if (v === "on" || v === "true" || v === true || v === 1 || v === "1") return true;
  if (v === "false" || v === false || v === 0 || v === "0") return false;
  return false; // unchecked -> false
}, z.boolean());

const CardCreateSchema = z.object({
  lessonId: z
    .string()
    .min(1, "Missing lesson id")
    .refine((v) => mongoose.Types.ObjectId.isValid(v), "Invalid lesson id"),
  front: z.string().min(2, "Front must be at least 2 characters"),
  back:  z.string().min(1, "Back cannot be empty"),
  learned: learnedCoerce.optional().default(false), // <- new
});

export async function postCard(_prevState: any, formData: FormData) {
  const parsed = CardCreateSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    return { Error: parsed.error.flatten().fieldErrors };
  }

  const { lessonId, front, back, learned } = parsed.data;

  await connectDB();
  try {
    await Card.create({ lessonId, front, back, learned });
  } catch (err) {
    console.error("Error creating card:", err);
    return { Error: { front: ["Failed to create card. Please try again."] } };
  }

  revalidatePath(`/${lessonId}`);
  redirect(`/${lessonId}`);
}
