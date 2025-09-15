import { z } from "zod";

// normalizes rating from string -> number, clamps 0..5
const ratingCoerce = z
  .preprocess((v) => (v === "" || v == null ? 0 : Number(v)), z.number().min(0).max(5));

export const LessonCreateSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  rating: ratingCoerce.default(0),
});

export type LessonCreateInput = z.infer<typeof LessonCreateSchema>;

export const LessonUpdateSchema = z.object({
  lessonId: z.string().min(1, "Missing lesson id"),
  title: z.string().min(2, "Title must be at least 2 characters"),
  rating: ratingCoerce.default(0),
});

export type LessonUpdateInput = z.infer<typeof LessonUpdateSchema>;
