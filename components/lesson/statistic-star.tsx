"use client";

import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export function StaticStars({
  value = 0,
  outOf = 5,
  className = "text-amber-400",
}: { value?: number; outOf?: number; className?: string }) {
  const full = Math.floor(value);
  const hasHalf = value - full >= 0.5;
  const empty = outOf - full - (hasHalf ? 1 : 0);

  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`}>
      {Array.from({ length: full }).map((_, i) => (
        <FaStar key={`full-${i}`} className="h-4 w-4" aria-hidden />
      ))}
      {hasHalf && <FaStarHalfAlt className="h-4 w-4" aria-hidden />}
      {Array.from({ length: Math.max(0, empty) }).map((_, i) => (
        <FaRegStar key={`empty-${i}`} className="h-4 w-4" aria-hidden />
      ))}
      <span className="sr-only">{value} out of {outOf} stars</span>
    </span>
  );
}
