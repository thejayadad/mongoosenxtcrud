import LessonsList from "@/components/lesson/lesson-list";
import LessonsListSkeleton from "@/components/lesson/lesson-skeleton";
import { Suspense } from "react";


export const dynamic = "force-dynamic"; // optional: always render fresh

export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">homePage</h1>

      <Suspense fallback={<LessonsListSkeleton />}>
        <LessonsList />
      </Suspense>
    </div>
  );
}
