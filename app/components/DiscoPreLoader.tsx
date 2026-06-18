"use client";

import { useEffect, useState } from "react";
import { skipPreloader } from "./PreLoader";

// Called by disco page — marks normal preloader as already shown
// so it doesn't fire, then shows our own disco intro instead.
export default function DiscoPreLoader() {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    skipPreloader();
  }, []);

  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const duration = 2200;

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (elapsed < duration) {
        raf = requestAnimationFrame(tick);
      } else {
        setExiting(true);
        setTimeout(() => setShow(false), 700);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    document.body.style.overflow = show ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [show]);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-[999] flex flex-col items-center justify-center bg-black transition-all duration-700 ease-in-out ${
        exiting ? "opacity-0 scale-105 pointer-events-none" : "opacity-100"
      }`}
    >
      <style>{`
        @keyframes discoGlow {
          0%   { color: #ff0080; text-shadow: 0 0 30px #ff0080, 0 0 80px #ff0080; }
          17%  { color: #00ffff; text-shadow: 0 0 30px #00ffff, 0 0 80px #00ffff; }
          33%  { color: #ffff00; text-shadow: 0 0 30px #ffff00, 0 0 80px #ffff00; }
          50%  { color: #ff4400; text-shadow: 0 0 30px #ff4400, 0 0 80px #ff4400; }
          67%  { color: #aa00ff; text-shadow: 0 0 30px #aa00ff, 0 0 80px #aa00ff; }
          83%  { color: #00ff88; text-shadow: 0 0 30px #00ff88, 0 0 80px #00ff88; }
          100% { color: #ff0080; text-shadow: 0 0 30px #ff0080, 0 0 80px #ff0080; }
        }
        @keyframes discoBar {
          0%   { background: #ff0080; }
          17%  { background: #00ffff; }
          33%  { background: #ffff00; }
          50%  { background: #ff4400; }
          67%  { background: #aa00ff; }
          83%  { background: #00ff88; }
          100% { background: #ff0080; }
        }
      `}</style>

      <p
        className="font-medium text-center px-8"
        style={{
          fontSize: "clamp(2rem, 6vw, 4.5rem)",
          animation: "discoGlow 0.4s infinite linear",
          lineHeight: 1.1,
        }}
      >
        Welcome<br />INTOOOOOOOOO...
      </p>

      <div className="mt-12 flex items-center gap-3">
        <span
          className="text-2xl tabular-nums tracking-widest"
          style={{ animation: "discoGlow 0.4s infinite linear" }}
        >
          {String(progress).padStart(3, "0")}%
        </span>
      </div>

      <div className="mt-4 h-1 w-64 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full transition-[width] duration-150 ease-linear"
          style={{
            width: `${progress}%`,
            animation: "discoBar 0.4s infinite linear",
          }}
        />
      </div>
    </div>
  );
}
