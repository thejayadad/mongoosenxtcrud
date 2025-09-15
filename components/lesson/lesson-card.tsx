// components/lesson/LessonCard.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import {
  FiShare2,
  FiLayers,
  FiFileText,
  FiMoreHorizontal,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";
import { hslFromString } from "@/lib/color";
import { StaticStars } from "./lesson-skeleton";

type Props = {
  id: string;
  title: string;
  owner?: string;
  cardCount: number;
  noteCount?: number;
  rating?: number;
  href?: string;
  editHref?: string;          // NEW: used by menu
  onDelete?: () => void;      // NEW: used by menu
  className?: string;
};

export function LessonCard({
  id,
  title,
  owner = "",
  cardCount,
  noteCount = 0,
  rating = 0,
  href,
  editHref,
  onDelete,
  className = "",
}: Props) {
  const color = React.useMemo(() => hslFromString(id || title), [id, title]);

  const Wrapper: React.ElementType = href ? Link : "div";
  const wrapperProps = href ? { href } : {};

  return (
    <Wrapper
      {...wrapperProps}
      className={[
        "block w-full transition",
        className,
      ].join(" ")}
    >
      {/* Card shell — NO overflow-hidden */}
      <div className="relative flex min-h-[72px] items-stretch rounded-xl bg-white ring-1 ring-black/10 hover:ring-black/15 hover:shadow">
        {/* Left color column (rounded on its own) */}
        <div
          className="w-16 h-[72px] flex items-center justify-center rounded-l-xl"
          style={{ backgroundColor: color }}
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full ring-2 ring-white text-white">
            <FiShare2 className="h-5 w-5" aria-hidden />
            <span className="sr-only">Lesson icon</span>
          </span>
        </div>

        {/* Middle content */}
        <div className="flex-1 px-4 py-3">
          <h3 className="text-base font-semibold text-gray-900 line-clamp-1">{title}</h3>
          <div className="mt-1 flex items-center gap-3 text-sm text-gray-500">
            {owner && <span className="line-clamp-1">{owner}</span>}
            <span className="inline-flex items-center gap-1">
              <FiLayers className="h-4 w-4" aria-hidden /> {cardCount}
            </span>
            <span className="inline-flex items-center gap-1">
              <FiFileText className="h-4 w-4" aria-hidden /> {noteCount}
            </span>
          </div>
        </div>

        {/* Right: stars + kebab (relative anchor) */}
        <div className="relative pr-4 pl-2 py-3 flex items-center gap-4">
          <StaticStars value={rating} size={16} className="text-amber-400" />
          <KebabMenu editHref={editHref} onDelete={onDelete} />
        </div>
      </div>
    </Wrapper>
  );
}

/* --- Kebab dropdown (no nav, click-outside, Esc to close) --- */
function KebabMenu({
  editHref,
  onDelete,
}: {
  editHref?: string;
  onDelete?: () => void;
}) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement | null>(null);

  // close on outside click & Escape
  React.useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // stop card navigation
  const stopNav = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="More options"
        onClick={(e) => { stopNav(e); setOpen((v) => !v); }}
        className="p-2 rounded-md hover:bg-gray-100 text-gray-900"
      >
        <FiMoreHorizontal className="h-4 w-4" />
      </button>

      {open && (
        <div
          role="menu"
          // place below the button; high z-index; not clipped anymore
          className="absolute right-0 top-full mt-2 z-50 min-w-[160px] overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-lg ring-1 ring-black/10"
          onClick={stopNav}
        >
          {editHref && (
            <Link
              href={editHref}
              role="menuitem"
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-800 hover:bg-gray-50"
              onClick={() => setOpen(false)}
            >
              <FiEdit2 className="h-4 w-4" />
              Edit
            </Link>
          )}
          {onDelete && (
            <button
              type="button"
              role="menuitem"
              className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
              onClick={() => { setOpen(false); onDelete(); }}
            >
              <FiTrash2 className="h-4 w-4" />
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
}
