"use server";

import { unstable_noStore as noStore } from "next/cache";
import connectDB from "@/lib/db";
import Lesson from "../models/deck-schema";

export type LessonListItem = {
  id: string;
  title: string;
  rating: number;
  updatedAt: Date;
};

export async function listAllLessons(): Promise<LessonListItem[]> {
  noStore(); // always fetch fresh in dev/SSR
  await connectDB();

  const docs = await Lesson.find({})
    .sort({ updatedAt: -1 })
    .lean();

  return docs.map((d: any) => ({
    id: String(d._id),
    title: d.title ?? "",
    rating: Number(d.rating ?? 0),
    updatedAt: d.updatedAt as Date,
  }));
}
