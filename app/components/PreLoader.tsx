"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";

export default function PreLoader() {
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("preloader_shown")) return;
    setShow(true);
  }, []);

  useEffect(() => {
    if (!show) return;
    let raf: number;
    const start = performance.now();
    const duration = 1600;

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (elapsed < duration) {
        raf = requestAnimationFrame(tick);
      } else {
        setExiting(true);
        sessionStorage.setItem("preloader_shown", "1");
        setTimeout(() => setShow(false), 600);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [show]);

  useEffect(() => {
    document.body.style.overflow = show ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [show]);

  if (!show) return null;

  return (
    <div
      className={`preloader-root fixed inset-0 z-[999] flex flex-col items-center justify-center bg-background transition-all duration-600 ease-in-out ${
        exiting ? "opacity-0 scale-105 pointer-events-none" : "opacity-100"
      }`}
    >
      <div
        className={`text-foreground transition-transform duration-700 ${
          exiting ? "scale-75" : "preloader-spin"
        }`}
      >
        <Logo size={140} />
      </div>

      <div className="mt-14 flex items-center gap-3">
        <span className="text-2xl tabular-nums tracking-widest text-fourth">
          {String(progress).padStart(3, "0")}%
        </span>
      </div>

      <div className="mt-6 h-px w-64 overflow-hidden bg-border/20">
        <div
          className="h-full bg-third transition-[width] duration-150 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
