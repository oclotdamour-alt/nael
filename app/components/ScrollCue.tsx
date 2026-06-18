"use client";

export default function ScrollCue() {
  const handleClick = () => {
    document
      .getElementById("about")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Scroll to about section"
      className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-10 flex items-center gap-2 text-xs md:text-sm font-medium text-white/90 tracking-widest uppercase drop-shadow-lg hover:text-white transition-colors"
    >
      <span>Scroll</span>
      <span className="inline-block animate-bounce">↓</span>
    </button>
  );
}
