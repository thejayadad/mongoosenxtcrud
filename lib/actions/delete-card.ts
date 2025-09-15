// lib/actions/delete-card.ts
"use server";

import { z } from "zod";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import connectDB from "@/lib/db";
import type { CardActionState, CardFieldErrors } from "@/lib/actions/types";
import Card from "../models/card-schema";

const DeleteCardSchema = z.object({
  lessonId: z.string().refine(mongoose.Types.ObjectId.isValid, "Invalid lesson id"),
  cardId:   z.string().refine(mongoose.Types.ObjectId.isValid, "Invalid card id"),
});

export async function deleteCard(
  _prev: CardActionState,
  formData: FormData
): Promise<CardActionState> {
  const parsed = DeleteCardSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    return { Error: parsed.error.flatten().fieldErrors as CardFieldErrors };
  }

  const { lessonId, cardId } = parsed.data;

  await connectDB();
  try {
    const removed = await Card.findOneAndDelete({ _id: cardId, lessonId }).lean();
    if (!removed) return { Error: { cardId: ["Card not found for this lesson."] } };
  } catch (e) {
    return { Error: { cardId: ["Could not delete card. Please try again."] } };
  }

  revalidatePath(`/${lessonId}`);
  redirect(`/${lessonId}`);
}
