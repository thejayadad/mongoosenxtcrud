export default function LessonsListSkeleton() {
  return (
    <ul className="mt-4 space-y-2 animate-pulse">
      {Array.from({ length: 5 }).map((_, i) => (
        <li key={i} className="h-10 rounded bg-black/10" />
      ))}
    </ul>
  );
}
