import { LessonForm } from "@/components/lesson/lesson-form";
import connectDB from "@/lib/db";
import Lesson from "@/lib/models/deck-schema";
import mongoose from "mongoose";
import { notFound } from "next/navigation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function EditLessonPage({ params }: { params: { id: string } }) {
  const { id } = params;
  if (!mongoose.Types.ObjectId.isValid(id)) return notFound();

  await connectDB();
  const doc = await Lesson.findById(id).lean();
  if (!doc) return notFound();

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Edit Lesson</h1>
      <LessonForm
        isEdit
        lesson={{
          _id: String(doc._id),
          title: String(doc.title ?? ""),
          rating: Number(doc.rating ?? 0),
        }}
      />
    </div>
  );
}
