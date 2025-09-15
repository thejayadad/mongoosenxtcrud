// components/lesson/lesson-list-item-client.tsx
"use client";
import * as React from "react";
import { LessonCard } from "./lesson-card";
import { deleteLessonForm } from "@/lib/actions/delete-lesson";

export function LessonListItemClient({ item }: {
  item: { id: string; title: string; rating: number; cardCount: number }
}) {
  const formRef = React.useRef<HTMLFormElement>(null);

  return (
    <div className="w-full">
      <LessonCard
        id={item.id}
        title={item.title}
        cardCount={item.cardCount}
        rating={item.rating}
        editHref={`/${item.id}/edit`}
        onDelete={() => {
          if (confirm("Delete this lesson? This cannot be undone.")) {
            formRef.current?.requestSubmit();
          }
        }}
      />
      <form ref={formRef} action={deleteLessonForm} className="hidden">
        <input type="hidden" name="_id" value={item.id} />
      </form>
    </div>
  );
}
