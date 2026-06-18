"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="flex items-center gap-1.5 text-sm text-fourth hover:text-foreground transition-colors group"
    >
      <span className="inline-block transition-transform group-hover:-translate-x-1">←</span>
      Back
    </button>
  );
}
