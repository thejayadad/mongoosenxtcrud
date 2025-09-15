export type LessonErrorKeys = "_id" | "title" | "rating";
export type LessonFieldErrors = Partial<Record<LessonErrorKeys, string[]>>;
export type LessonActionState = { Error?: LessonFieldErrors } | null;

