"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="flex items-center gap-2 text-xs uppercase tracking-widest text-foreground/70 hover:text-foreground transition-all group border border-white/10 bg-white/10 backdrop-blur-md hover:bg-white/20 hover:border-white/20 rounded-full px-4 py-1.5 shadow-sm"
    >
      <span className="inline-block transition-transform group-hover:-translate-x-0.5">←</span>
      Back
    </button>
  );
}
