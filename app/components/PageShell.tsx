import ThemeToggle from "./ThemeToggle";
import HomeLink from "./HomeLink";

export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-svh px-8 py-24 md:px-24">
      <header className="fixed top-6 left-6 z-50 flex flex-col gap-3 text-foreground">
        <HomeLink />
      </header>
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>
      <main className="mx-auto max-w-5xl">
        {children}
      </main>
    </div>
  );
}
