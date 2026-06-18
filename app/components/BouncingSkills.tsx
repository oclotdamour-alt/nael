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

// Positions sur les côtés gauche et droit uniquement
const POSITIONS = [
  { x: 1,  y: 8  },
  { x: 2,  y: 28 },
  { x: 0,  y: 50 },
  { x: 1,  y: 70 },
  { x: 2,  y: 88 },
  { x: 72, y: 12 },
  { x: 74, y: 32 },
  { x: 71, y: 52 },
  { x: 73, y: 72 },
  { x: 72, y: 88 },
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
    <div className="absolute inset-0 overflow-hidden">
      <style>{`
        @keyframes float-tag {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(var(--amp)); }
        }
      `}</style>
      {tags.map((tag) => (
        <span
          key={tag.label}
          className={`absolute whitespace-nowrap text-xs font-medium rounded-full px-4 py-1.5 shadow-sm cursor-default transition-all duration-200 hover:scale-110 hover:shadow-md ${
            tag.variant === "outline"
              ? "border border-foreground/40 text-foreground bg-background hover:bg-foreground hover:text-background hover:border-foreground"
              : "bg-foreground text-background hover:bg-third hover:border-third"
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
