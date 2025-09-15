"use client";

import { useActionState } from "react";
import { postCard } from "@/lib/actions/post-card";

export function NewCardForm({ lessonId }: { lessonId: string }) {
  const [state, formAction] = useActionState(postCard, null);

  return (
    <form action={formAction} className="space-y-3">
      <input type="hidden" name="lessonId" value={lessonId} />

      <label htmlFor="front" className="block text-sm font-medium">Front</label>
      <input id="front" name="front" type="text" className="w-full p-2 border rounded" />
      <p className="text-sm text-red-500">
        {Array.isArray(state?.Error?.front) ? state?.Error?.front.join(", ") : state?.Error?.front}
      </p>

      <label htmlFor="back" className="block text-sm font-medium">Back</label>
      <textarea id="back" name="back" className="w-full p-2 border rounded" />
      <p className="text-sm text-red-500">
        {Array.isArray(state?.Error?.back) ? state?.Error?.back.join(", ") : state?.Error?.back}
      </p>

      <label className="inline-flex items-center gap-2">
        <input type="checkbox" name="learned" />
        <span className="text-sm">Mark as learned</span>
      </label>
      <p className="text-sm text-red-500">
        {Array.isArray(state?.Error?.learned) ? state?.Error?.learned.join(", ") : state?.Error?.learned}
      </p>

      <button type="submit" className="px-4 py-2 border rounded">Add Card</button>
    </form>
  );
}
