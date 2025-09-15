"use client";
import Link from "next/link";
import { FiZap } from "react-icons/fi";

export function StudyMateLogo({
  href = "/",
  compact = false,
  className = "",
}: { href?: string; compact?: boolean; className?: string }) {
  return (
    <Link href={href} className={`flex items-center gap-2 ${className}`}>
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-600 text-white">
        <FiZap aria-hidden className="h-5 w-5" />
      </span>
      {!compact && (
        <span className="text-lg font-bold tracking-tight text-blue-900">
          StudyMate
        </span>
      )}
    </Link>
  );
}
