"use client";

import { useRef, useEffect, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

function DiscoAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio("/disco-music.m4a");
    audio.loop = true;
    audio.volume = 0.7;
    audioRef.current = audio;

    const start = () => {
      audio.play().catch(() => {});
      window.removeEventListener("click", start);
      window.removeEventListener("keydown", start);
    };

    // Try autoplay immediately, fall back to first interaction
    audio.play().catch(() => {
      window.addEventListener("click", start);
      window.addEventListener("keydown", start);
    });

    return () => {
      audio.pause();
      audio.src = "";
      window.removeEventListener("click", start);
      window.removeEventListener("keydown", start);
    };
  }, []);

  return null;
}

const COLORS = ["#ff0080", "#00ffff", "#ffff00", "#ff4400", "#aa00ff", "#00ff88"];

function DiscoSpotlights() {
  const refs = useRef<(THREE.SpotLight | null)[]>([]);

  const spots = useMemo(() =>
    Array.from({ length: 8 }, (_, i) => ({
      color: COLORS[i % COLORS.length],
      speed: 0.4 + i * 0.28,
      radius: 4 + (i % 3),
      phase: (i / 8) * Math.PI * 2,
    })), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    spots.forEach((s, i) => {
      const light = refs.current[i];
      if (!light) return;
      light.position.x = Math.sin(t * s.speed + s.phase) * s.radius;
      light.position.z = Math.cos(t * s.speed * 0.7 + s.phase) * s.radius;
      light.position.y = 8;
      light.intensity = 250 + Math.sin(t * 7 + s.phase) * 100;
    });
  });

  return (
    <>
      {spots.map((s, i) => (
        <spotLight
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          color={s.color}
          intensity={250}
          angle={0.22}
          penumbra={0.5}
          distance={25}
          castShadow
          position={[0, 8, 0]}
          target-position={[0, 0, 0]}
        />
      ))}
      {/* Lumières latérales qui balayent */}
      {COLORS.map((c, i) => (
        <pointLight key={`side-${i}`} color={c} intensity={80} distance={15}
          position={[
            Math.cos((i / COLORS.length) * Math.PI * 2) * 6,
            1,
            Math.sin((i / COLORS.length) * Math.PI * 2) * 6,
          ]}
        />
      ))}
    </>
  );
}

function DiscoBall() {
  const group = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (mesh.current) mesh.current.rotation.y = t * 2.5;
    if (group.current) group.current.rotation.y = t * 0.5;
  });

  return (
    <group ref={group} position={[0, 6, 0]}>
      <mesh ref={mesh}>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshStandardMaterial color="#ffffff" metalness={1} roughness={0} />
      </mesh>
      {Array.from({ length: 16 }, (_, i) => (
        <pointLight
          key={i}
          color={COLORS[i % COLORS.length]}
          intensity={20}
          distance={14}
          position={[
            Math.sin((i / 16) * Math.PI * 2) * 0.7,
            Math.sin(i) * 0.3,
            Math.cos((i / 16) * Math.PI * 2) * 0.7,
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
  const jumpRef = useRef({ y: 0, vy: 0, onGround: true });

  useEffect(() => {
    Object.values(actions).forEach((a) => a?.reset().fadeIn(0.3).play());
    scene.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh;
        const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        mats.forEach((m) => {
          if (m instanceof THREE.MeshStandardMaterial) {
            m.roughness = 0.2;
            m.metalness = 0.5;
          }
        });
      }
    });
  }, [actions, scene]);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    const j = jumpRef.current;

    // Sauts automatiques
    if (j.onGround && Math.sin(t * 2.5) > 0.95) {
      j.vy = 0.12;
      j.onGround = false;
    }
    j.vy -= 0.008;
    j.y += j.vy;
    if (j.y <= 0) { j.y = 0; j.vy = 0; j.onGround = true; }

    group.current.position.y = -1.1 + j.y;
    group.current.rotation.y = Math.sin(t * 1.2) * 0.6;
    group.current.rotation.z = Math.sin(t * 3.5) * 0.09;

    // Squash & stretch au saut
    const stretch = 1 + j.vy * 2;
    group.current.scale.set(1.8 / stretch, 1.8 * stretch, 1.8 / stretch);
  });

  return <primitive ref={group} object={scene} scale={1.8} />;
}

function FloorReflection() {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!mesh.current) return;
    (mesh.current.material as THREE.MeshStandardMaterial)
      .color.setHSL((clock.getElapsedTime() * 0.06) % 1, 0.7, 0.06);
  });
  return (
    <mesh ref={mesh} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.6, 0]} receiveShadow>
      <planeGeometry args={[40, 40]} />
      <meshStandardMaterial metalness={1} roughness={0.03} />
    </mesh>
  );
}

export default function DiscoScene() {
  return (
    <div className="fixed inset-0 overflow-hidden" style={{ background: "#000" }}>
      <DiscoAudio />
      <style>{`
        @keyframes discoText {
          0%   { color: #ff0080; text-shadow: 0 0 20px #ff0080, 0 0 50px #ff0080; }
          17%  { color: #00ffff; text-shadow: 0 0 20px #00ffff, 0 0 50px #00ffff; }
          33%  { color: #ffff00; text-shadow: 0 0 20px #ffff00, 0 0 50px #ffff00; }
          50%  { color: #ff4400; text-shadow: 0 0 20px #ff4400, 0 0 50px #ff4400; }
          67%  { color: #aa00ff; text-shadow: 0 0 20px #aa00ff, 0 0 50px #aa00ff; }
          83%  { color: #00ff88; text-shadow: 0 0 20px #00ff88, 0 0 50px #00ff88; }
          100% { color: #ff0080; text-shadow: 0 0 20px #ff0080, 0 0 50px #ff0080; }
        }
        @keyframes enjoy {
          0%,100% { transform: scale(1); }
          50%      { transform: scale(1.12); }
        }
      `}</style>

      <Canvas shadows camera={{ position: [0, 0.5, 5.5], fov: 50 }}>
        <ambientLight intensity={0.04} />
        <DiscoSpotlights />
        <DiscoBall />
        <Suspense fallback={null}>
          <DiscoCharacter />
        </Suspense>
        <FloorReflection />
      </Canvas>

      {/* Texte en bas, pas sur le perso */}
      <div className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-1 pointer-events-none select-none">
        <p
          className="font-medium text-center tracking-wide"
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.6rem)",
            animation: "discoText 0.35s infinite linear",
          }}
        >
          Well Done ! You enter into my head,
        </p>
        <p
          className="font-medium text-white"
          style={{
            fontSize: "clamp(1.8rem, 5vw, 3.5rem)",
            animation: "discoText 0.35s infinite linear, enjoy 0.5s infinite ease-in-out",
          }}
        >
          ENJOY !
        </p>
      </div>

      <div className="absolute top-8 left-1/2 -translate-x-1/2 text-white/15 text-xs uppercase tracking-widest pointer-events-none">
        ↑↑↓↓←→←→BA
      </div>
    </div>
  );
}
