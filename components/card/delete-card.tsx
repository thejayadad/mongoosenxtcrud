// components/cards/DeleteCardForm.tsx
"use client";

import { useFormState } from "react-dom";
import { deleteCard } from "@/lib/actions/delete-card";
import type { CardActionState } from "@/lib/actions/types";
import { useActionState } from "react";

export function DeleteCardForm({ lessonId, cardId }: { lessonId: string; cardId: string }) {
  // Cast the server action so TS picks the (state, formData) version of useFormState
  const action = deleteCard as unknown as (
    state: CardActionState,
    formData: FormData
  ) => CardActionState | Promise<CardActionState>;

  const [state, formAction] = useActionState<CardActionState, FormData>(action, null);

  return (
    <form
      action={formAction}
      className="inline"
      onSubmit={(e) => {
        if (!confirm("Delete this flash card? This cannot be undone.")) e.preventDefault();
      }}
    >
      <input type="hidden" name="lessonId" value={lessonId} />
      <input type="hidden" name="cardId" value={cardId} />
      <button type="submit" className="text-sm underline text-red-600">Delete</button>
      <span className="text-sm text-red-500 ml-2">
        {Array.isArray(state?.Error?.cardId) ? state?.Error?.cardId.join(", ") : state?.Error?.cardId}
      </span>
    </form>
  );
}
