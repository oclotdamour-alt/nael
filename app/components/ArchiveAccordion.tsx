"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Archive } from "../data/projects";

function VideoItem({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  return (
    <div className="relative w-full rounded-xl overflow-hidden bg-black aspect-video">
      <video
        ref={ref}
        src={src}
        controls
        playsInline
        className="w-full h-full object-cover"
      />
    </div>
  );
}

function ImageItem({ src, alt }: { src: string; alt: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="relative aspect-square rounded-xl overflow-hidden bg-border/10 hover:opacity-90 transition-opacity cursor-zoom-in"
      >
        <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
      </button>

      {/* Lightbox */}
      {open && (
        <div
          className="fixed inset-0 z-[1000] bg-black/90 flex items-center justify-center p-6 cursor-zoom-out"
          onClick={() => setOpen(false)}
        >
          <div className="relative max-w-4xl max-h-full w-full h-full">
            <Image src={src} alt={alt} fill className="object-contain" sizes="100vw" />
          </div>
        </div>
      )}
    </>
  );
}

function AccordionItem({ item }: { item: Archive }) {
  const [open, setOpen] = useState(false);

  return (
    <li className="border-b border-border/20">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <div className="flex items-baseline gap-6">
          <span className="text-xl font-medium group-hover:text-third transition-colors">
            {item.name}
          </span>
          <span className="text-xs uppercase tracking-widest text-fourth">{item.type}</span>
        </div>
        <div className="flex items-center gap-6 shrink-0 ml-4">
          <span className="text-sm text-fourth">{item.year}</span>
          <span
            className={`text-foreground/50 transition-transform duration-300 ${open ? "rotate-45" : "rotate-0"}`}
          >
            +
          </span>
        </div>
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          open ? "max-h-[2000px] opacity-100 mb-8" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-sm text-fourth mb-6 max-w-xl">{item.description}</p>

        {/* Videos */}
        {item.media.filter((m) => m.kind === "video").map((m) => (
          <div key={m.src} className="mb-4">
            <VideoItem src={m.src} />
          </div>
        ))}

        {/* Images grid */}
        {item.media.some((m) => m.kind === "image") && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {item.media
              .filter((m) => m.kind === "image")
              .map((m) => (
                <ImageItem key={m.src} src={m.src} alt={item.name} />
              ))}
          </div>
        )}
      </div>
    </li>
  );
}

export default function ArchiveAccordion({ items }: { items: Archive[] }) {
  return (
    <ul className="border-t border-border/20">
      {items.map((item) => (
        <AccordionItem key={item.slug} item={item} />
      ))}
    </ul>
  );
}
