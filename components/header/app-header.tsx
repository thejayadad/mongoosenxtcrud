import { StudyMateLogo } from "../ui/logo";

export function AppHeader() {
  return (
    <header className="w-full h-full  bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <div className="mx-auto flex  h-full max-w-screen-xl items-center px-4">
        <StudyMateLogo />
      </div>
    </header>
  );
}
