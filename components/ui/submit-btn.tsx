// /components/submit-button.tsx
"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton({ label = "Submit" }: { label?: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="px-4 py-2 border rounded disabled:opacity-60"
    >
      {pending ? "Working..." : label}
    </button>
  );
}
