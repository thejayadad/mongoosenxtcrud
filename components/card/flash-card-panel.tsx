// components/cards/FlashcardPanel.tsx
"use client";

import { FiEdit2, FiTrash2 } from "react-icons/fi";

export function FlashcardPanel({
  question,
  onEdit,
  onDelete,
  onFlip,
}: {
  question: string;
  onEdit?: () => void;
  onDelete?: () => void;
  onFlip?: () => void;
}) {
  return (
    <div className="relative">
      {/* subtle stacked backdrop */}
      <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-xl bg-black/10" aria-hidden />
      <div className="relative w-[640px] max-w-[90vw] rounded-xl bg-white ring-1 ring-black/10 shadow p-5">
        {/* header */}
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold text-gray-900">Question</div>
          <div className="flex items-center gap-2 text-gray-600">
            <button className="p-2 rounded-md hover:bg-gray-100" aria-label="Edit flashcard" onClick={onEdit}>
              <FiEdit2 className="h-4 w-4" />
            </button>
            <button className="p-2 rounded-md hover:bg-gray-100" aria-label="Delete flashcard" onClick={onDelete}>
              <FiTrash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
        <hr className="mt-2 mb-10 border-gray-200" />

        {/* body */}
        <div className="min-h-[260px] flex items-center justify-center">
          <p className="text-xl font-semibold text-gray-500 text-center px-6">
            {question}
          </p>
        </div>

        {/* footer */}
        <div className="mt-8 flex items-center justify-center">
          <button
            className="px-4 py-2 rounded-lg bg-sky-600 text-white font-semibold hover:bg-sky-500"
            onClick={onFlip}
          >
            Flip
          </button>
        </div>
      </div>
    </div>
  );
}
