"use client";

import { useActionState } from "react";

import { updateLesson } from "@/lib/actions/update-lesson";
import { SubmitButton } from "../ui/submit-btn";
import { postLesson } from "@/lib/actions/create-lesson";

interface LessonFormProps {
  lesson?: { _id: string; title: string; rating?: number };
  isEdit?: boolean;
}

export function LessonForm({ lesson, isEdit = false }: LessonFormProps) {
  // match your MoodForm pattern exactly
  const [state, formAction] = useActionState(isEdit ? updateLesson : postLesson, null);

  return (
    <div>
      <form action={formAction}>
        {/* Hidden id when editing */}
        <input type="hidden" name="_id" value={isEdit ? lesson?._id : ""} />

        {/* Title */}
        <label htmlFor="title" className="block text-sm font-medium text-gray-900">
          Lesson Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          defaultValue={isEdit ? lesson?.title : ""}
          className="bg-gray-50 border-black text-gray-900 text-sm rounded-sm w-full p-2"
          placeholder="e.g., Intro to Arrays"
        />
        <div id="title-error" aria-live="polite" aria-atomic="true">
          <p className="mt-2 text-sm text-red-500">
            {/* Flattened Zod errors are arrays — join for display */}
            {Array.isArray(state?.Error?.title) ? state?.Error?.title.join(", ") : state?.Error?.title}
          </p>
        </div>

        {/* Rating */}
        <label htmlFor="rating" className="block text-sm font-medium text-gray-900 mt-3">
          Rating (0–5)
        </label>
        <input
          type="number"
          name="rating"
          id="rating"
          step="0.1"
          min={0}
          max={5}
          defaultValue={
            isEdit
              ? (typeof lesson?.rating === "number" ? String(lesson.rating) : "")
              : ""
          }
          className="bg-gray-50 border-black text-gray-900 text-sm rounded-sm w-full p-2"
          placeholder="0"
        />
        <div id="rating-error" aria-live="polite" aria-atomic="true">
          <p className="mt-2 text-sm text-red-500">
            {Array.isArray(state?.Error?.rating) ? state?.Error?.rating.join(", ") : state?.Error?.rating}
          </p>
        </div>

        {/* ID error (update) */}
        {isEdit && (
          <div id="id-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">
              {Array.isArray(state?.Error?._id) ? state?.Error?._id.join(", ") : state?.Error?._id}
            </p>
          </div>
        )}

        <div className="mt-4">
          <SubmitButton label={isEdit ? "Update Lesson" : "Create Lesson"} />
        </div>
      </form>
    </div>
  );
}
