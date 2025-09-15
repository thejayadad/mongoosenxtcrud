import connectDB from "@/lib/db";
import mongoose from "mongoose";
import { notFound } from "next/navigation";

import Lesson from "@/lib/models/deck-schema";
import { listCards } from "@/lib/actions/list-cards";
import { FlashcardPanel } from "@/components/card/flash-card-panel";
import { LessonActionBar } from "@/components/lesson/lesson-actionbar";
import { LessonSidebar } from "@/components/lesson/lesson-sidebar";

// ⬇️ UI bits (copy from previous messages if you haven’t added them yet)

// (optional) If you still want inline controls later:
// import { NewCardForm } from "@/components/card/card-form";
// import { ToggleLearnedForm } from "@/components/card/toggle-learned";
// import { DeleteCardForm } from "@/components/card/delete-card";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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
  const first = cards[0];

  return (
    <main className="flex min-h-[calc(100vh-4rem)]">
      {/* Left: sidebar */}
      <LessonSidebar totalCards={cards.length} />

      {/* Right: blue stage */}
      <section className="flex-1 bg-sky-600">
        {/* Top action bar: back + title + stars (left), New Flashcard (right) */}
        <LessonActionBar
          title={String(doc.title ?? "Untitled")}
          rating={Number(doc.rating ?? 0)}
          backHref="/"
          newCardHref={`/lessons/${id}/cards/new`} // wire this later
        />

        {/* Centered flashcard */}
        <div className="mx-auto max-w-[1100px] px-6 py-8">
          <div className="flex items-center justify-center">
            {first ? (
              <FlashcardPanel
                question={first.front}
                // onEdit={() => router.push(`/cards/${first.id}/edit`)} // wire later
                // onDelete={() => ... } // we can hook your DeleteCardForm if you prefer
                // onFlip={() => setShowBack((v) => !v)}               // add flip later
              />
            ) : (
              <div className="rounded-xl bg-white/90 p-8 text-center ring-1 ring-black/10">
                <p className="text-gray-700 font-medium">
                  No flashcards yet for this lesson.
                </p>
              </div>
            )}
          </div>

          {/* --- Legacy list / forms (optional) ---
          <div className="mt-10 rounded-xl bg-white p-6 ring-1 ring-black/10">
            <section className="space-y-4">
              <h2 className="font-semibold text-gray-900">Add Flashcard</h2>
              <NewCardForm lessonId={id} />
            </section>

            <section className="mt-6 space-y-3">
              <h2 className="font-semibold text-gray-900">Flashcards</h2>
              {cards.length === 0 ? (
                <p className="text-sm text-gray-500">No cards yet.</p>
              ) : (
                <ul className="space-y-3">
                  {cards.map((c) => (
                    <li key={c.id} className="border p-3 rounded">
                      <div className="font-medium">Q: {c.front}</div>
                      <div className="text-sm">A: {c.back}</div>
                      <div className="text-xs mt-1 flex items-center gap-2">
                        Learned: {c.learned ? "Yes" : "No"} ·
                        <ToggleLearnedForm lessonId={id} cardId={c.id} learned={c.learned} />
                        <DeleteCardForm lessonId={id} cardId={c.id} />
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>
          --- end legacy block --- */}
        </div>
      </section>
    </main>
  );
}
