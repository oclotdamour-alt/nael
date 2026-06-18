"use client";

import { useRef, useEffect, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations, SpotLight } from "@react-three/drei";
import * as THREE from "three";

const COLORS = ["#ff0080", "#00ffff", "#ffff00", "#ff4400", "#aa00ff", "#00ff88"];

function DiscoSpotlights() {
  const refs = useRef<(THREE.SpotLight | null)[]>([]);
  const targetRefs = useRef<(THREE.Object3D | null)[]>([]);

  const spots = useMemo(() =>
    Array.from({ length: 6 }, (_, i) => ({
      color: COLORS[i],
      speed: 0.5 + i * 0.35,
      radius: 3.5 + (i % 3) * 0.8,
      phase: (i / 6) * Math.PI * 2,
    })), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    spots.forEach((s, i) => {
      const light = refs.current[i];
      const target = targetRefs.current[i];
      if (!light || !target) return;

      // Projecteur depuis le haut qui tourne
      light.position.x = Math.sin(t * s.speed + s.phase) * s.radius;
      light.position.z = Math.cos(t * s.speed * 0.8 + s.phase) * s.radius;
      light.position.y = 7;

      // Cible oscille autour du bonhomme
      target.position.x = Math.sin(t * s.speed * 1.3 + s.phase + 1) * 0.5;
      target.position.y = 0;
      target.position.z = Math.cos(t * s.speed + s.phase) * 0.5;

      // Intensité pulse
      light.intensity = 180 + Math.sin(t * 6 + s.phase) * 60;
    });
  });

  return (
    <>
      {spots.map((s, i) => (
        <group key={i}>
          <spotLight
            ref={(el) => { refs.current[i] = el; }}
            color={s.color}
            intensity={180}
            angle={0.28}
            penumbra={0.4}
            distance={20}
            castShadow
            position={[0, 7, 0]}
            target-position={[0, 0, 0]}
          />
          <object3D
            ref={(el) => { targetRefs.current[i] = el; }}
            position={[0, 0, 0]}
          />
        </group>
      ))}
      {/* Flash strobe central */}
      <pointLight color="#ffffff" intensity={30} position={[0, 5, 0]} />
    </>
  );
}

function DiscoBall() {
  const mesh = useRef<THREE.Mesh>(null);
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (mesh.current) mesh.current.rotation.y = clock.getElapsedTime() * 2;
    if (group.current) group.current.rotation.y = clock.getElapsedTime() * 0.4;
  });

  return (
    <group ref={group} position={[0, 5.5, 0]}>
      <mesh ref={mesh}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#ffffff" metalness={1} roughness={0} envMapIntensity={2} />
      </mesh>
      {/* Rayons de la boule disco */}
      {Array.from({ length: 12 }, (_, i) => (
        <pointLight
          key={i}
          color={COLORS[i % COLORS.length]}
          intensity={15}
          distance={12}
          position={[
            Math.sin((i / 12) * Math.PI * 2) * 0.6,
            0,
            Math.cos((i / 12) * Math.PI * 2) * 0.6,
          ]}
        />
      ))}
    </group>
  );
}

function DiscoCharacter() {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF("/perso-idle.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    Object.values(actions).forEach((a) => a?.reset().fadeIn(0.3).play());
    // Matériaux plus réactifs à la lumière
    scene.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh;
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((m: THREE.Material) => {
            if (m instanceof THREE.MeshStandardMaterial) {
              m.roughness = 0.3;
              m.metalness = 0.4;
            }
          });
        } else if (mesh.material instanceof THREE.MeshStandardMaterial) {
          mesh.material.roughness = 0.3;
          mesh.material.metalness = 0.4;
        }
      }
    });
  }, [actions, scene]);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    group.current.position.y = -1.1 + Math.sin(t * 4) * 0.2 + Math.sin(t * 6.5) * 0.08;
    group.current.rotation.y = Math.sin(t * 1.2) * 0.5;
    group.current.rotation.z = Math.sin(t * 3) * 0.1;
  });

  return <primitive ref={group} object={scene} scale={1.8} />;
}

function FloorReflection() {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const mat = mesh.current.material as THREE.MeshStandardMaterial;
    mat.color.setHSL((clock.getElapsedTime() * 0.08) % 1, 0.5, 0.04);
  });
  return (
    <mesh ref={mesh} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.6, 0]} receiveShadow>
      <planeGeometry args={[40, 40]} />
      <meshStandardMaterial metalness={1} roughness={0.05} />
    </mesh>
  );
}

export default function DiscoScene() {
  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      {/* Fond disco CSS */}
      <div className="absolute inset-0 pointer-events-none" style={{ animation: "discoBg 0.25s infinite alternate" }} />

      {/* Texte */}
      <div className="absolute top-12 left-0 right-0 flex flex-col items-center z-10 pointer-events-none select-none">
        <p
          className="text-center font-medium leading-tight px-6"
          style={{
            fontSize: "clamp(1.8rem, 5vw, 4rem)",
            animation: "discoText 0.3s infinite alternate",
            textShadow: "0 0 30px currentColor, 0 0 60px currentColor",
          }}
        >
          Well Done !<br />
          You enter into my head,<br />
          <span style={{ animation: "discoText2 0.2s infinite alternate" }}>ENJOY !</span>
        </p>
      </div>

      <style>{`
        @keyframes discoBg {
          0%   { background: radial-gradient(ellipse at 20% 50%, #ff008033 0%, transparent 55%), radial-gradient(ellipse at 80% 30%, #00ffff22 0%, transparent 55%); }
          20%  { background: radial-gradient(ellipse at 70% 60%, #ffff0033 0%, transparent 55%), radial-gradient(ellipse at 30% 20%, #ff440022 0%, transparent 55%); }
          40%  { background: radial-gradient(ellipse at 50% 80%, #aa00ff33 0%, transparent 55%), radial-gradient(ellipse at 50% 10%, #00ff8822 0%, transparent 55%); }
          60%  { background: radial-gradient(ellipse at 10% 30%, #ff008033 0%, transparent 55%), radial-gradient(ellipse at 90% 70%, #00ffff22 0%, transparent 55%); }
          80%  { background: radial-gradient(ellipse at 40% 40%, #ffff0033 0%, transparent 55%), radial-gradient(ellipse at 60% 80%, #ff440022 0%, transparent 55%); }
          100% { background: radial-gradient(ellipse at 60% 20%, #aa00ff33 0%, transparent 55%), radial-gradient(ellipse at 20% 70%, #00ff8822 0%, transparent 55%); }
        }
        @keyframes discoText {
          0%   { color: #ff0080; }
          20%  { color: #00ffff; }
          40%  { color: #ffff00; }
          60%  { color: #ff4400; }
          80%  { color: #aa00ff; }
          100% { color: #00ff88; }
        }
        @keyframes discoText2 {
          0%   { color: #ffffff; text-shadow: 0 0 40px #ff0080, 0 0 80px #ff0080; }
          50%  { color: #ffffff; text-shadow: 0 0 40px #00ffff, 0 0 80px #00ffff; }
          100% { color: #ffffff; text-shadow: 0 0 40px #ffff00, 0 0 80px #ffff00; }
        }
      `}</style>

      <Canvas shadows camera={{ position: [0, 0.5, 5.5], fov: 50 }}>
        <ambientLight intensity={0.05} />
        <DiscoSpotlights />
        <DiscoBall />
        <Suspense fallback={null}>
          <DiscoCharacter />
        </Suspense>
        <FloorReflection />
      </Canvas>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/20 text-xs uppercase tracking-widest">
        ↑↑↓↓←→←→BA
      </div>
    </div>
  );
}
