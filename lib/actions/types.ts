export type LessonErrorKeys = "_id" | "title" | "rating";
export type LessonFieldErrors = Partial<Record<LessonErrorKeys, string[]>>;
export type LessonActionState = { Error?: LessonFieldErrors } | null;

// Add these next to your lesson types (or in the same file)

export type CardErrorKeys = "lessonId" | "cardId" | "front" | "back" | "learned";
export type CardFieldErrors = Partial<Record<CardErrorKeys, string[]>>;
export type CardActionState = { Error?: CardFieldErrors } | null;
