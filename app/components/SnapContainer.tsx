"use client";

import { useEffect, useRef } from "react";

export default function SnapContainer({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const saved = sessionStorage.getItem("snap-scroll");
    if (saved) {
      el.scrollTop = parseInt(saved, 10);
      sessionStorage.removeItem("snap-scroll");
    }

    const onScroll = () => {
      sessionStorage.setItem("snap-scroll", String(el.scrollTop));
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main ref={ref} className="snap-container">
      {children}
    </main>
  );
}
