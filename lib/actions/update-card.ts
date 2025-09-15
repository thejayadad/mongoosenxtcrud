"use server";

import { z } from "zod";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import connectDB from "@/lib/db";
import Card from "../models/card-schema";

const learnedCoerce = z.preprocess((v) => {
  if (v === "on" || v === "true" || v === true || v === 1 || v === "1") return true;
  if (v === "false" || v === false || v === 0 || v === "0") return false;
  return false;
}, z.boolean());

const UpdateLearnedSchema = z.object({
  lessonId: z.string().refine(mongoose.Types.ObjectId.isValid, "Invalid lesson id"),
  cardId:   z.string().refine(mongoose.Types.ObjectId.isValid, "Invalid card id"),
  learned:  learnedCoerce, // required boolean
});

export async function updateCardLearned(_prev: any, formData: FormData) {
  const parsed = UpdateLearnedSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    return { Error: parsed.error.flatten().fieldErrors };
  }

  const { lessonId, cardId, learned } = parsed.data;

  await connectDB();
  try {
    const updated = await Card.findByIdAndUpdate(
      cardId,
      { $set: { learned } },
      { new: true }
    ).lean();
    if (!updated) return { Error: { cardId: ["Card not found."] } };
  } catch (err) {
    console.error("Error updating learned:", err);
    return { Error: { learned: ["Could not update learned state."] } };
  }

  revalidatePath(`/lessons/${lessonId}`);
  redirect(`/lessons/${lessonId}`);
}
