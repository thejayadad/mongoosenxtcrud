import * as React from "react";

export function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <label htmlFor={htmlFor}>{label}</label>
      {children}
    </div>
  );
}

export function FieldError({ messages }: { messages?: string[] }) {
  if (!messages?.length) return null;
  return <p className="text-sm text-red-600">{messages.join(", ")}</p>;
}
