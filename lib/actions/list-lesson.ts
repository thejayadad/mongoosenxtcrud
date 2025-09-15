"use server";

import { unstable_noStore as noStore } from "next/cache";
import connectDB from "@/lib/db";
import Lesson from "../models/deck-schema";
import Card from "../models/card-schema";


export type LessonListItem = {
  id: string;
  title: string;
  rating: number;
  updatedAt: Date;
  cardCount: number;
};

export async function listAllLessons(): Promise<LessonListItem[]> {
  noStore();
  await connectDB();

  const [lessons, counts] = await Promise.all([
    Lesson.find({}).sort({ updatedAt: -1 }).lean(),
    Card.aggregate([{ $group: { _id: "$lessonId", count: { $sum: 1 } } }]),
  ]);

  const countMap = new Map<string, number>(
    counts.map((c: any) => [String(c._id), Number(c.count)])
  );

  return lessons.map((d: any) => ({
    id: String(d._id),
    title: d.title ?? "",
    rating: Number(d.rating ?? 0),
    updatedAt: d.updatedAt as Date,
    cardCount: countMap.get(String(d._id)) ?? 0,
  }));
}
