"use client";

import { useEffect, useRef, useState, Suspense, useMemo } from "react";
import { usePathname } from "next/navigation";
import { useVideoContext } from "../context/VideoContext";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

const IDLE_DELAY = 30_000;

function IdleCharacter() {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF("/perso-idle.glb");

  // Clone the scene so it doesn't share the same Three.js object with HeroCharacter
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    Object.values(actions).forEach((a) => a?.reset().fadeIn(0.3).play());
  }, [actions]);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    group.current.position.y = -1.1 + Math.sin(t * 0.5) * 0.06;
  });

  return <primitive ref={group} object={clonedScene} scale={1.8} />;
}

export default function IdleScreen() {
  const [idle, setIdle] = useState(false);
  const [bubbleVisible, setBubbleVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();
  const { videoUnmuted } = useVideoContext();

  const isExcluded = pathname === "/disco" || videoUnmuted;

  const reset = () => {
    if (idle) setIdle(false);
    setBubbleVisible(false);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setIdle(true);
      setTimeout(() => setBubbleVisible(true), 600);
    }, IDLE_DELAY);
  };

  useEffect(() => {
    if (isExcluded) return;
    const events = ["mousemove", "mousedown", "keydown", "scroll", "touchstart"];
    events.forEach((e) => window.addEventListener(e, reset, { passive: true }));
    timerRef.current = setTimeout(() => {
      setIdle(true);
      setTimeout(() => setBubbleVisible(true), 600);
    }, IDLE_DELAY);
    return () => {
      events.forEach((e) => window.removeEventListener(e, reset));
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isExcluded]);

  if (!idle || isExcluded) return null;

  return (
    <div
      className="fixed inset-0 z-[998] bg-black flex items-center justify-center cursor-pointer"
      onClick={reset}
      onMouseMove={reset}
    >
      {/* Ambient glow background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-purple-500/10 blur-[80px]" />
      </div>

      <div className="relative w-full h-full">
        <Canvas camera={{ position: [0, 0.3, 5.5], fov: 48 }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[3, 6, 4]} intensity={1.5} />
          {/* Coloured rim lights for glow effect */}
          <pointLight position={[-3, 2, 2]} intensity={8} color="#6366f1" distance={10} />
          <pointLight position={[3, 1, 2]} intensity={6} color="#a855f7" distance={10} />
          <pointLight position={[0, -1, 3]} intensity={4} color="#3b82f6" distance={8} />
          <Suspense fallback={null}>
            <IdleCharacter />
          </Suspense>
        </Canvas>

        {/* Bulle de dialogue — en haut à gauche, loin du perso centré */}
        <div
          className={`absolute top-[12%] left-[8%] transition-all duration-500 ${
            bubbleVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
          }`}
        >
          <div className="relative bg-white text-black text-base font-medium rounded-2xl px-6 py-3 shadow-2xl">
            Are you here ?
            {/* Pointe vers la droite-bas (vers le perso) */}
            <span className="absolute -bottom-3 left-8 w-0 h-0 border-l-8 border-r-8 border-t-[12px] border-l-transparent border-r-transparent border-t-white" />
          </div>
        </div>

        {/* Hint text bottom */}
        <p className={`absolute bottom-8 left-1/2 -translate-x-1/2 text-xs text-white/30 tracking-widest uppercase transition-opacity duration-700 ${bubbleVisible ? "opacity-100" : "opacity-0"}`}>
          Move your mouse to continue
        </p>
      </div>
    </div>
  );
}
