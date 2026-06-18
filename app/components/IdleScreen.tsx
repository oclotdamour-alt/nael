"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { usePathname } from "next/navigation";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

const IDLE_DELAY = 60_000;

function IdleCharacter() {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF("/perso-idle.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    Object.values(actions).forEach((a) => a?.reset().fadeIn(0.3).play());
  }, [actions]);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    group.current.position.y = -1.1 + Math.sin(t * 0.5) * 0.06;
  });

  return <primitive ref={group} object={scene} scale={1.8} />;
}

export default function IdleScreen() {
  const [idle, setIdle] = useState(false);
  const [bubbleVisible, setBubbleVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  const isExcluded = pathname === "/disco";

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
      <div className="relative w-full h-full">
        <Canvas camera={{ position: [0, 0.3, 5.5], fov: 48 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[3, 6, 4]} intensity={1.2} />
          <Suspense fallback={null}>
            <IdleCharacter />
          </Suspense>
        </Canvas>

        {/* Bulle de dialogue */}
        <div
          className={`absolute top-[18%] left-1/2 -translate-x-1/2 transition-all duration-500 ${
            bubbleVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
          }`}
        >
          <div className="relative bg-white text-black text-base font-medium rounded-2xl px-6 py-3 shadow-xl">
            Are you here ?
            {/* Pointe de la bulle vers le bas */}
            <span className="absolute left-1/2 -translate-x-1/2 -bottom-3 w-0 h-0 border-l-8 border-r-8 border-t-[12px] border-l-transparent border-r-transparent border-t-white" />
          </div>
        </div>
      </div>
    </div>
  );
}
