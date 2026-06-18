"use client";

import { useRef, useEffect, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

const COLORS = ["#ff0080", "#00ffff", "#ffff00", "#ff4400", "#aa00ff", "#00ff88"];

function DiscoLights() {
  const lights = useMemo(() =>
    Array.from({ length: 6 }, (_, i) => ({
      color: COLORS[i],
      speed: 0.4 + i * 0.3,
      radius: 4 + (i % 3),
      phase: (i / 6) * Math.PI * 2,
      height: 3 + (i % 2) * 2,
    })), []);

  const refs = useRef<(THREE.PointLight | null)[]>([]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    lights.forEach((l, i) => {
      const light = refs.current[i];
      if (!light) return;
      light.position.x = Math.sin(t * l.speed + l.phase) * l.radius;
      light.position.z = Math.cos(t * l.speed * 0.7 + l.phase) * l.radius;
      light.intensity = 6 + Math.sin(t * 8 + l.phase) * 3;
    });
  });

  return (
    <>
      {lights.map((l, i) => (
        <pointLight
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          color={l.color}
          intensity={8}
          distance={20}
          position={[0, l.height, 0]}
        />
      ))}
    </>
  );
}

function DiscoBall() {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (mesh.current) mesh.current.rotation.y = clock.getElapsedTime() * 1.2;
  });
  return (
    <mesh ref={mesh} position={[0, 4.5, 0]}>
      <sphereGeometry args={[0.4, 16, 16]} />
      <meshStandardMaterial color="#ffffff" metalness={1} roughness={0} />
    </mesh>
  );
}

function DiscoCharacter() {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF("/perso-idle.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    Object.values(actions).forEach((a) => a?.reset().fadeIn(0.3).play());
  }, [actions]);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    group.current.position.y = -1.1 + Math.sin(t * 3) * 0.15 + Math.sin(t * 5.3) * 0.06;
    group.current.rotation.y = Math.sin(t * 0.8) * 0.4;
    group.current.rotation.z = Math.sin(t * 2.5) * 0.08;
  });

  return <primitive ref={group} object={scene} scale={1.8} />;
}

function FloorReflection() {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const mat = mesh.current.material as THREE.MeshStandardMaterial;
    mat.color.setHSL((clock.getElapsedTime() * 0.1) % 1, 0.6, 0.05);
  });
  return (
    <mesh ref={mesh} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]}>
      <planeGeometry args={[30, 30]} />
      <meshStandardMaterial metalness={0.9} roughness={0.1} />
    </mesh>
  );
}

function StrobeOverlay() {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const mat = mesh.current.material as THREE.MeshBasicMaterial;
    const t = clock.getElapsedTime();
    mat.opacity = Math.max(0, Math.sin(t * 12) * 0.07);
  });
  return (
    <mesh ref={mesh} position={[0, 0, 2]}>
      <planeGeometry args={[20, 20]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0} depthWrite={false} />
    </mesh>
  );
}

export default function DiscoScene() {
  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      {/* CSS disco bg flicker */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ animation: "discoBg 0.4s infinite alternate" }}
      />

      <style>{`
        @keyframes discoBg {
          0%   { background: radial-gradient(ellipse at 20% 50%, #1a003322 0%, transparent 60%), radial-gradient(ellipse at 80% 30%, #00331a22 0%, transparent 60%); }
          25%  { background: radial-gradient(ellipse at 70% 60%, #33001122 0%, transparent 60%), radial-gradient(ellipse at 30% 20%, #1a330022 0%, transparent 60%); }
          50%  { background: radial-gradient(ellipse at 50% 80%, #00113322 0%, transparent 60%), radial-gradient(ellipse at 50% 10%, #33110022 0%, transparent 60%); }
          75%  { background: radial-gradient(ellipse at 10% 30%, #33002222 0%, transparent 60%), radial-gradient(ellipse at 90% 70%, #00223322 0%, transparent 60%); }
          100% { background: radial-gradient(ellipse at 40% 40%, #22003322 0%, transparent 60%), radial-gradient(ellipse at 60% 80%, #22330022 0%, transparent 60%); }
        }
      `}</style>

      <Canvas camera={{ position: [0, 0.5, 5.5], fov: 50 }}>
        <ambientLight intensity={0.15} />
        <DiscoLights />
        <DiscoBall />
        <Suspense fallback={null}>
          <DiscoCharacter />
        </Suspense>
        <FloorReflection />
        <StrobeOverlay />
      </Canvas>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 text-xs uppercase tracking-widest">
        ↑↑↓↓←→←→BA
      </div>
    </div>
  );
}
