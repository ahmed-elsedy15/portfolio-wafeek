"use client";

import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { skillNodes } from "@/data/skills";

function Center() {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.getElapsedTime();
    mesh.current.rotation.y = t * 0.2;
    mesh.current.rotation.x = t * 0.08;
  });
  return (
    <group>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[0.62, 1]} />
        <meshStandardMaterial color="#111419" metalness={0.6} roughness={0.35} emissive="#D6A85F" emissiveIntensity={0.12} />
      </mesh>
    </group>
  );
}

function OrbitNode({ index, total }: { index: number; total: number }) {
  const ref = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const baseAngle = (index / total) * Math.PI * 2;
  const radius = 2.5;
  const yTilt = ((index % 3) - 1) * 0.35;
  const speed = 0.18;

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    const angle = baseAngle + t * speed;
    ref.current.position.x = Math.cos(angle) * radius;
    ref.current.position.z = Math.sin(angle) * radius;
    ref.current.position.y = yTilt + Math.sin(t * 0.6 + index) * 0.15;
    const s = hovered ? 1.6 : 1;
    ref.current.scale.lerp(new THREE.Vector3(s, s, s), 0.15);
  });

  return (
    <group
      ref={ref}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      <mesh>
        <sphereGeometry args={[0.14, 20, 20]} />
        <meshStandardMaterial
          color={hovered ? "#D6A85F" : "#1c2028"}
          emissive={hovered ? "#D6A85F" : "#000000"}
          emissiveIntensity={hovered ? 0.5 : 0}
          metalness={0.5}
          roughness={0.4}
        />
      </mesh>
    </group>
  );
}

export default function OrbitScene() {
  const nodes = useMemo(() => skillNodes, []);
  return (
    <Canvas camera={{ position: [0, 1.4, 6.5], fov: 42 }} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 4, 4]} intensity={1} />
      <pointLight position={[-4, -2, -3]} intensity={0.5} color="#6FE0C5" />
      <Center />
      {nodes.map((node, i) => (
        <OrbitNode key={node.label} index={i} total={nodes.length} />
      ))}
    </Canvas>
  );
}
