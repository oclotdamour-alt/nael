"use client";

import { useMemo } from "react";

const ALL_ITEMS = [
  { label: "Blender", variant: "outline" },
  { label: "Adobe Suite", variant: "filled" },
  { label: "Unreal Engine 5", variant: "outline" },
  { label: "DaVinci Resolve", variant: "filled" },
  { label: "Rive", variant: "outline" },
  { label: "3D Animation", variant: "filled" },
  { label: "Motion Design", variant: "outline" },
  { label: "Branding", variant: "filled" },
  { label: "Art Direction", variant: "outline" },
  { label: "Content", variant: "filled" },
];

// Positions fixes dans la zone, bien réparties
const POSITIONS = [
  { x: 6,  y: 8  },
  { x: 55, y: 5  },
  { x: 78, y: 14 },
  { x: 20, y: 22 },
  { x: 68, y: 28 },
  { x: 8,  y: 62 },
  { x: 42, y: 70 },
  { x: 72, y: 65 },
  { x: 25, y: 80 },
  { x: 60, y: 82 },
];

export default function BouncingSkills({ items }: { items: string[] }) {
  const tags = useMemo(() =>
    ALL_ITEMS.slice(0, Math.min(items.length, POSITIONS.length)).map((item, i) => ({
      ...item,
      pos: POSITIONS[i],
      duration: 4 + (i % 5) * 1.2,
      delay: -(i * 0.7),
      amplitude: 8 + (i % 3) * 5,
    })), [items]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <style>{`
        @keyframes float-tag {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(var(--amp)); }
        }
      `}</style>
      {tags.map((tag) => (
        <span
          key={tag.label}
          className={`absolute whitespace-nowrap text-xs font-medium rounded-full px-4 py-1.5 ${
            tag.variant === "outline"
              ? "border border-foreground/20 text-foreground/50 bg-background/30 backdrop-blur-sm"
              : "bg-foreground/8 text-foreground/50 backdrop-blur-sm"
          }`}
          style={{
            left: `${tag.pos.x}%`,
            top: `${tag.pos.y}%`,
            ["--amp" as string]: `${tag.amplitude}px`,
            animation: `float-tag ${tag.duration}s ease-in-out ${tag.delay}s infinite`,
          }}
        >
          {tag.label}
        </span>
      ))}
    </div>
  );
}
