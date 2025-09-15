import connectDB from "@/lib/db";
import mongoose from "mongoose";
import { notFound } from "next/navigation";

import { listCards } from "@/lib/actions/list-cards";
import Lesson from "@/lib/models/deck-schema";
import { NewCardForm } from "@/components/card/card-form";
import { ToggleLearnedForm } from "@/components/card/toggle-learned";



export default async function LessonDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params; // ✅ no await

  if (!mongoose.Types.ObjectId.isValid(id)) return notFound();

  await connectDB();
  const doc = await Lesson.findById(id).lean();
  if (!doc) return notFound();

  const cards = await listCards(id);

  return (
    <div className="p-6 space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">{String(doc.title ?? "Untitled")}</h1>
        <div className="text-sm opacity-70">
          Rating: {Number(doc.rating ?? 0).toFixed(1)} • Updated{" "}
          {new Date(doc.updatedAt as Date).toLocaleString()}
        </div>
      </header>

      <section className="space-y-2">
        <h2 className="font-semibold">Add Flashcard</h2>
        {/* Client component inside Server page is fine */}
        <NewCardForm lessonId={id} />
      </section>

      <section className="space-y-3">
        <h2 className="font-semibold">Flashcards</h2>
        {cards.length === 0 ? (
          <p className="text-sm opacity-70">No cards yet.</p>
        ) : (
          <ul className="space-y-3">
            {cards.map((c) => (
              <li key={c.id} className="border p-3 rounded">
                <div className="font-medium">Q: {c.front}</div>
                <div className="text-sm">A: {c.back}</div>
                <div className="text-xs mt-1">
                  Learned: {c.learned ? "Yes" : "No"} ·{" "}
                  <ToggleLearnedForm lessonId={id} cardId={c.id} learned={c.learned} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
