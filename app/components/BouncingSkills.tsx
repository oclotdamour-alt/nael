"use client";

import { useEffect, useRef, useState } from "react";

type Tag = {
  label: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  w: number;
  h: number;
  variant: "outline" | "filled";
};

const TAG_H = 32;
const PAD_X = 24;
const PAD_Y = 10;

export default function BouncingSkills({ items }: { items: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<Tag[]>([]);
  const rafRef = useRef<number>(0);
  const [, forceRender] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const W = el.clientWidth;
    const H = el.clientHeight;

    // Mesure approx width de chaque tag
    tagsRef.current = items.map((label, i) => {
      const w = label.length * 8.5 + PAD_X * 2;
      const speed = 0.6 + Math.random() * 0.8;
      const angle = Math.random() * Math.PI * 2;
      return {
        label,
        x: Math.random() * (W - w),
        y: Math.random() * (H - TAG_H),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        w,
        h: TAG_H,
        variant: i % 2 === 0 ? "outline" : "filled",
      };
    });

    const tick = () => {
      const W = el.clientWidth;
      const H = el.clientHeight;
      tagsRef.current = tagsRef.current.map((t) => {
        let { x, y, vx, vy } = t;
        x += vx;
        y += vy;
        if (x <= 0) { x = 0; vx = Math.abs(vx); }
        if (x + t.w >= W) { x = W - t.w; vx = -Math.abs(vx); }
        if (y <= 0) { y = 0; vy = Math.abs(vy); }
        if (y + t.h >= H) { y = H - t.h; vy = -Math.abs(vy); }
        return { ...t, x, y, vx, vy };
      });
      forceRender((n) => n + 1);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [items]);

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden">
      {tagsRef.current.map((tag) => (
        <span
          key={tag.label}
          className={`absolute select-none whitespace-nowrap text-xs font-medium rounded-full px-5 py-1.5 transition-none ${
            tag.variant === "outline"
              ? "border border-border/50 text-foreground/70"
              : "bg-foreground/10 text-foreground/80"
          }`}
          style={{ left: tag.x, top: tag.y, height: TAG_H, lineHeight: `${TAG_H}px`, padding: `0 ${PAD_X}px` }}
        >
          {tag.label}
        </span>
      ))}
    </div>
  );
}
