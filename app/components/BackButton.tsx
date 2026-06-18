"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="flex items-center gap-2 text-xs uppercase tracking-widest text-foreground/60 hover:text-foreground transition-colors group border border-border/30 hover:border-foreground/40 rounded-full px-4 py-1.5"
    >
      <span className="inline-block transition-transform group-hover:-translate-x-0.5">←</span>
      Back
    </button>
  );
}
