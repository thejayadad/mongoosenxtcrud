import LessonsList from "@/components/lesson/lesson-list";
import LessonsListSkeleton from "@/components/lesson/lesson-skeleton";
import { ActionBar } from "@/components/ui/action-bar";
import { Suspense } from "react";


export const dynamic = "force-dynamic"; // optional: always render fresh

export default function Home() {
  return (
     <main className=" bg-sky-600 row-span-11 h-full">
      <ActionBar />
      <section className="mx-auto max-w-screen-lg">
        <LessonsList />
      </section>
    </main>
  );
}

  //  <main>
  //     {/* Blue section like your screenshot */}
  //     <section className="bg-sky-600">
  //       <ActionBar />
  //     </section>

  //     {/* Content area goes here (cards list, etc.) */}
  //     <section className="mx-auto max-w-6xl px-4 py-10">
  //       {/* TODO: class/lesson list */}
  //     </section>
  //   </main>