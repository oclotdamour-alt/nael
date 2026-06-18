"use client";

import { useRef, useEffect, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

const PARTICLE_COUNT = 120;

function WindParticles() {
  const mesh = useRef<THREE.Points>(null);

  const { positions, speeds, offsets } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const speeds = new Float32Array(PARTICLE_COUNT);
    const offsets = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 3;
      speeds[i] = 0.4 + Math.random() * 0.8;
      offsets[i] = Math.random() * Math.PI * 2;
    }
    return { positions, speeds, offsets };
  }, []);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const pos = mesh.current.geometry.attributes.position.array as Float32Array;
    const t = clock.getElapsedTime();

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3 + 0] += speeds[i] * 0.012;
      pos[i * 3 + 1] += Math.sin(t * 0.8 + offsets[i]) * 0.002;

      if (pos[i * 3 + 0] > 5.5) {
        pos[i * 3 + 0] = -5.5;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 6;
      }
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.038}
        color="#ffffff"
        transparent
        opacity={0.6}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

const BASE_Y = -1.1;

function Character({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  const group = useRef<THREE.Group>(null);
  const headBone = useRef<THREE.Object3D | null>(null);
  const windVelocity = useRef({ z: 0, x: 0 });
  const { scene, animations } = useGLTF("/perso-idle.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    Object.values(actions).forEach((action) => {
      if (action) action.reset().fadeIn(0.3).play();
    });

    // Trouve l'os de la tête dans le skeleton
    scene.traverse((obj) => {
      const name = obj.name.toLowerCase();
      if (name.includes("head") && !name.includes("headtop") && !name.includes("headend")) {
        headBone.current = obj;
      }
    });
  }, [actions, scene]);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();

    // Flottaison corps entier
    group.current.position.y = BASE_Y + Math.sin(t * 0.45) * 0.09 + Math.sin(t * 1.1) * 0.02;

    // Brise — cible qui oscille lentement
    const windTargetZ = Math.sin(t * 0.35) * 0.08 + Math.sin(t * 0.9) * 0.03;
    const windTargetX = Math.sin(t * 0.25) * 0.04;

    // Inertie : le corps résiste et suit avec retard
    windVelocity.current.z += (windTargetZ - windVelocity.current.z) * 0.04;
    windVelocity.current.x += (windTargetX - windVelocity.current.x) * 0.03;

    group.current.rotation.z = windVelocity.current.z;
    group.current.rotation.x = windVelocity.current.x;

    // Tête suit la souris doucement
    if (headBone.current) {
      const targetY = mouse.current[0] * 1.1;
      const targetX = -mouse.current[1] * 0.55;
      headBone.current.rotation.y += (targetY - headBone.current.rotation.y) * 0.06;
      headBone.current.rotation.x += (targetX - headBone.current.rotation.x) * 0.06;
    }
  });

  return (
    <primitive
      ref={group}
      object={scene}
      scale={1.8}
    />
  );
}

export default function HeroCharacter() {
  const mouse = useRef<[number, number]>([0, 0]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = [
        (e.clientX / window.innerWidth - 0.5) * 2,
        -(e.clientY / window.innerHeight - 0.5) * 2,
      ];
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      <Canvas
        camera={{ position: [0, 0.3, 5.5], fov: 48 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 6, 4]} intensity={1.2} />
        <directionalLight position={[-3, 2, -2]} intensity={0.3} />
        <WindParticles />
        <Suspense fallback={null}>
          <Character mouse={mouse} />
        </Suspense>
      </Canvas>
    </div>
  );
}
