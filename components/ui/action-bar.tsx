import { FiPlus } from "react-icons/fi";
import { LinkButton } from "../button/button";

export function ActionBar({
  title = "My Lessons",
  newHref = "/new",
  className = "",
}: { title?: string; newHref?: string; className?: string }) {
  return (
    <div className={`mx-auto flex max-w-6xl items-center justify-between px-4 py-6 ${className}`}>
      <h2 className="text-2xl font-bold text-white">{title}</h2>
      <LinkButton
          labelVisibility="md+"
        
         iconClassName="text-green-600"       // 👈 icon color
        variant="primary"                  // white pill look
      href={newHref} iconLeft={<FiPlus className="h-4 w-4" />}  size="md">
        New Lesson
      </LinkButton>
    </div>
  );
}
