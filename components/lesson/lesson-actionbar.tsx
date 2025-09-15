// components/lesson/LessonActionBar.tsx
import Link from "next/link";
import { FiChevronLeft, FiPlus } from "react-icons/fi";
import { StaticStars } from "./lesson-skeleton";
import { LinkButton } from "../button/button";


export function LessonActionBar({
  title,
  rating = 0,
  backHref = "/",
  newCardHref = "#",
}: {
  title: string;
  rating?: number;
  backHref?: string;
  newCardHref?: string;
}) {
  return (
    <div className="flex items-center justify-between mx-auto max-w-screen-2xl px-6 py-4">
      <div className="flex items-center gap-3">
        <Link href={backHref} className="text-white/90 hover:text-white inline-flex items-center">
          <FiChevronLeft className="h-5 w-5" />
          <span className="sr-only">Back</span>
        </Link>
        <div>
          <h1 className="text-2xl font-semibold text-white leading-tight">{title}</h1>
          <StaticStars value={rating} className="text-amber-400" />
        </div>
      </div>

      {/* Right: New Flashcard only (Play can be added later) */}
      <LinkButton href={newCardHref} iconLeft={<FiPlus />}>
        New Flashcard
      </LinkButton>
    </div>
  );
}
