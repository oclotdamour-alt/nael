"use client";

import { createContext, useContext, useState, useCallback } from "react";

type VideoContextType = {
  videoUnmuted: boolean;
  setVideoUnmuted: (v: boolean) => void;
};

const VideoContext = createContext<VideoContextType>({
  videoUnmuted: false,
  setVideoUnmuted: () => {},
});

export function VideoProvider({ children }: { children: React.ReactNode }) {
  const [videoUnmuted, setVideoUnmuted] = useState(false);
  const set = useCallback((v: boolean) => setVideoUnmuted(v), []);
  return (
    <VideoContext.Provider value={{ videoUnmuted, setVideoUnmuted: set }}>
      {children}
    </VideoContext.Provider>
  );
}

export function useVideoContext() {
  return useContext(VideoContext);
}
