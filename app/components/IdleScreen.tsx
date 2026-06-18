"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { usePathname } from "next/navigation";
import { useVideoContext } from "../context/VideoContext";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

const IDLE_DELAY = 20_000;

// Separate GLB copy so the idle character has its OWN scene object and never
// shares the Three.js hierarchy with the hero canvas (which made it invisible).
function IdleCharacter() {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF("/perso-idle-2.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    Object.values(actions).forEach((a) => a?.reset().fadeIn(0.3).play());
    // Disable frustum culling so no skinned mesh (shirt, hair) gets culled out
    scene.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) (obj as THREE.Mesh).frustumCulled = false;
    });
  }, [actions, scene]);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    group.current.position.y = -1.1 + Math.sin(t * 0.5) * 0.06;
    group.current.position.x = 0;
  });

  return <primitive ref={group} object={scene} scale={1.8} position={[0, -1.1, 0]} />;
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
      className="fixed inset-0 z-[998] bg-white flex items-center justify-center cursor-pointer"
      onClick={reset}
      onMouseMove={reset}
    >
      <div className="relative w-full h-full">
        <Canvas camera={{ position: [0, 0, 5.5], fov: 48 }} gl={{ alpha: true }} style={{ background: "white" }}>
          <ambientLight intensity={1.5} />
          <directionalLight position={[3, 6, 4]} intensity={2} />
          <directionalLight position={[-3, 2, -2]} intensity={0.8} />
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
          <div className="relative bg-black text-white text-base font-medium rounded-2xl px-6 py-3 shadow-2xl">
            Are you here ?
            <span className="absolute -bottom-3 left-8 w-0 h-0 border-l-8 border-r-8 border-t-[12px] border-l-transparent border-r-transparent border-t-black" />
          </div>
        </div>

        {/* Hint text bottom */}
        <p className={`absolute bottom-8 left-1/2 -translate-x-1/2 text-xs text-black/30 tracking-widest uppercase transition-opacity duration-700 ${bubbleVisible ? "opacity-100" : "opacity-0"}`}>
          Move your mouse to continue
        </p>
      </div>
    </div>
  );
}
