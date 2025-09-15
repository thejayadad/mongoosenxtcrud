// components/lesson/LessonSidebar.tsx
import { FiLayers } from "react-icons/fi";

export function LessonSidebar({
  totalCards = 0,
}: { totalCards?: number }) {
  return (
    <aside className="w-[280px] bg-white">
      <div className="p-4">
        <nav className="space-y-2">
          <button
            type="button"
            className="w-full flex items-center justify-between rounded-lg bg-sky-600 text-white px-3 py-2 shadow-sm"
          >
            <span className="inline-flex items-center gap-2">
              <FiLayers className="h-5 w-5" />
              <span className="font-medium">Flashcards</span>
            </span>
            <span className="font-semibold">{totalCards}</span>
          </button>
          {/* future: Audio / Notes items */}
        </nav>
      </div>
    </aside>
  );
}
