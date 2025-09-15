import { listAllLessons } from "@/lib/actions/list-lesson";
import { LessonListItemClient } from "@/components/lesson/LessonListItemClient";

export default async function LessonsList() {
  const items = await listAllLessons();

  if (!items.length) {
    return (
      <p className="mt-4 text-sm text-gray-500">
        No lessons yet. Create one to get started.
      </p>
    );
  }

  return (
    <div className="mt-4 space-y-3">
      {items.map((l) => (
        <LessonListItemClient
          key={l.id}
          item={{
            id: l.id,
            title: l.title,
            rating: l.rating,
            cardCount: l.cardCount,
          }}
        />
      ))}
    </div>
  );
}
