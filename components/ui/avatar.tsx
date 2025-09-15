"use client";
import * as React from "react";

export function Avatar({
  name = "T",
  className = "",
}: { name?: string; className?: string }) {
  const initial = name.trim().charAt(0).toUpperCase() || "U";
  return (
    <div
      aria-label={`${name} profile`}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-full bg-neutral-500 text-white font-semibold ${className}`}
    >
      {initial}
    </div>
  );
}
