"use client";

import { useRef, useState, useEffect } from "react";
import { useVideoContext } from "../context/VideoContext";

export default function VideoPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const { setVideoUnmuted } = useVideoContext();

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    const nowMuted = videoRef.current.muted;
    setMuted(nowMuted);
    setVideoUnmuted(!nowMuted);
  };

  // Clean up when component unmounts (leaving the page)
  useEffect(() => {
    return () => setVideoUnmuted(false);
  }, [setVideoUnmuted]);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden mb-6">
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-auto"
      />
      <button
        onClick={toggleMute}
        className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-black/40 px-4 py-2 text-xs text-white backdrop-blur-sm transition-opacity hover:opacity-80"
      >
        {muted ? (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.63 3.63a.996.996 0 000 1.41L7.29 8.7 7 9H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h3l3.29 3.29c.63.63 1.71.18 1.71-.71v-4.17l4.18 4.18c-.49.37-1.02.68-1.6.91-.36.15-.58.53-.58.92 0 .72.73 1.18 1.39.91.8-.33 1.55-.77 2.22-1.31l1.34 1.34a.996.996 0 101.41-1.41L5.05 3.63c-.39-.39-1.02-.39-1.42 0zM19 12c0 .82-.15 1.61-.41 2.34l1.53 1.53c.56-1.17.88-2.48.88-3.87 0-3.83-2.4-7.11-5.78-8.4-.59-.23-1.22.23-1.22.86v.19c0 .38.25.71.61.85C17.18 6.54 19 9.06 19 12zm-8.71-6.29l-.17.17L12 7.76V6.41c0-.89-1.08-1.33-1.71-.7zM16.5 12A4.5 4.5 0 0014 7.97v1.79l2.48 2.48c.01-.08.02-.16.02-.24z"/>
            </svg>
            Son coupé
          </>
        ) : (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
            Son activé
          </>
        )}
      </button>
    </div>
  );
}
