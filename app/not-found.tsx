import Link from "next/link";
import Logo from "./components/Logo";
import SkipPreloader from "./components/SkipPreloader";

export default function NotFound() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-background px-8 text-center text-foreground">
      <SkipPreloader />
      <h1 className="mt-8 flex items-center gap-0 font-medium" style={{ fontSize: 150, lineHeight: 1 }}>4<Logo size={150} />4</h1>
      <p className="mt-4 text-lg text-fourth">
        This page drifted off somewhere else.
      </p>
      <Link
        href="/"
        className="mt-10 rounded-full bg-foreground px-6 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-80"
      >
        Back home
      </Link>
    </div>
  );
}
