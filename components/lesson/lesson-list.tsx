import { listAllLessons } from "@/lib/actions/list-lesson";
import Link from "next/link";
import { DeleteLessonForm } from "./delete-lesson";

export default async function LessonsList() {
  const items = await listAllLessons();

  if (!items.length) {
    return <p className="mt-4 text-sm opacity-70">No lessons yet. Create one to get started.</p>;
  }

  return (
    <ul className="mt-4 divide-y divide-neutral-200">
      {items.map((l) => (
        <li key={l.id} className="py-3 flex items-center justify-between gap-4">
          <div>
            <Link href={`/${l.id}`} className="font-medium underline">
              {l.title}
            </Link>
            <div className="text-xs opacity-70">
              Rating: {l.rating.toFixed(1)} • Updated {new Date(l.updatedAt).toLocaleString()}
            </div>
          </div>
          <Link href={`/${l.id}/edit`} className="text-sm opacity-80 hover:opacity-100">
            Update 
          </Link>
           <DeleteLessonForm lessonId={l.id} />

        </li>
      ))}
    </ul>
  );
}
