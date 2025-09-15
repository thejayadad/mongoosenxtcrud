"use server";

import { unstable_noStore as noStore } from "next/cache";
import connectDB from "@/lib/db";
import Card from "../models/card-schema";

export async function listCards(lessonId: string, opts?: { learned?: boolean }) {
  noStore();
  await connectDB();

  const filter: Record<string, unknown> = { lessonId };
  if (typeof opts?.learned === "boolean") filter.learned = opts.learned;

  const docs = await Card.find(filter).sort({ createdAt: -1 }).lean();
  return docs.map((d: any) => ({
    id: String(d._id),
    front: d.front as string,
    back: d.back as string,
    learned: Boolean(d.learned),
    createdAt: d.createdAt as Date,
  }));
}
