"use client";

import { useActionState } from "react";
import { deleteLesson } from "@/lib/actions/delete-lesson";
import { SubmitButton } from "@/components/ui/submit-btn"; // or your existing button

export function DeleteLessonForm({ lessonId }: { lessonId: string }) {
  const [state, formAction] = useActionState(deleteLesson, null);

  return (
    <form
      action={formAction}
      onSubmit={(e) => {
        // simple confirm to avoid accidental deletes
        if (!confirm("Delete this lesson? This cannot be undone.")) {
          e.preventDefault();
        }
      }}
      className="inline"
    >
      <input type="hidden" name="_id" value={lessonId} />
      <SubmitButton label="Delete" />
      <span className="ml-2 text-sm text-red-500">
        {Array.isArray(state?.Error?._id) ? state?.Error?._id.join(", ") : state?.Error?._id}
      </span>
    </form>
  );
}
