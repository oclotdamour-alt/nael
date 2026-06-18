"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const SILENT_PATHS = ["/disco"];

export default function AudioManager() {
  const pathname = usePathname();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(false);
  const [started, setStarted] = useState(false);

  const isSilent = SILENT_PATHS.includes(pathname);

  useEffect(() => {
    const audio = new Audio("/site-music.m4a");
    audio.loop = true;
    audio.volume = 0.5;
    audio.addEventListener("ended", () => { audio.currentTime = 0; audio.play().catch(() => {}); });
    audioRef.current = audio;

    const start = () => {
      audio.play().then(() => setStarted(true)).catch(() => {});
      window.removeEventListener("click", start);
      window.removeEventListener("keydown", start);
    };

    window.addEventListener("click", start);
    window.addEventListener("keydown", start);

    return () => {
      audio.pause();
      audio.src = "";
      window.removeEventListener("click", start);
      window.removeEventListener("keydown", start);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isSilent) {
      audio.pause();
    } else if (started) {
      audio.play().catch(() => {});
    }
  }, [isSilent, started]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = muted;
  }, [muted]);

  if (isSilent) return null;

  return (
    <button
      onClick={() => setMuted((m) => !m)}
      aria-label={muted ? "Unmute" : "Mute"}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/10 backdrop-blur-md text-foreground/70 hover:text-foreground hover:bg-white/20 hover:border-white/20 transition-all shadow-sm"
    >
      {muted ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
          <line x1="23" y1="9" x2="17" y2="15"/>
          <line x1="17" y1="9" x2="23" y2="15"/>
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
        </svg>
      )}
    </button>
  );
}
