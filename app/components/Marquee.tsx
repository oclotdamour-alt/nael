"use client";

const style = `
  @keyframes marquee-left {
    0% { transform: translateX(0); }
    100% { transform: translateX(-33.333%); }
  }
  @keyframes marquee-right {
    0% { transform: translateX(-33.333%); }
    100% { transform: translateX(0); }
  }
`;

export default function Marquee({
  items,
  direction = "left",
  variant = "outline",
}: {
  items: string[];
  direction?: "left" | "right";
  variant?: "outline" | "filled";
}) {
  const doubled = [...items, ...items, ...items];

  return (
    <>
      <style>{style}</style>
    <div className="overflow-hidden w-full" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
      <div
        className="flex gap-3 w-max"
        style={{
          animation: `marquee-${direction} 18s linear infinite`,
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className={
              variant === "outline"
                ? "rounded-full border border-border/30 px-4 py-1.5 text-sm text-foreground whitespace-nowrap"
                : "rounded-full bg-foreground px-4 py-1.5 text-sm text-background whitespace-nowrap"
            }
          >
            {item}
          </span>
        ))}
      </div>
    </div>
    </>
  );
}
