"use client";

import { updateCardLearned } from "@/lib/actions/update-card";
import { useActionState } from "react";

export function ToggleLearnedForm({
  lessonId,
  cardId,
  learned,
}: { lessonId: string; cardId: string; learned: boolean }) {
  const [state, formAction] = useActionState(updateCardLearned, null);

  return (
    <form action={formAction} className="inline">
      <input type="hidden" name="lessonId" value={lessonId} />
      <input type="hidden" name="cardId" value={cardId} />
      <input type="hidden" name="learned" value={(!learned).toString()} />
      <button type="submit" className="text-sm underline">
        {learned ? "Mark unlearned" : "Mark learned"}
      </button>
      <span className="text-sm text-red-500 ml-2">
        {Array.isArray(state?.Error?.learned) ? state?.Error?.learned.join(", ") : state?.Error?.learned}
      </span>
    </form>
  );
}
