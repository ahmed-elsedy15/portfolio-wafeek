"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Shape({ color }: { color: string }) {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.getElapsedTime();
    mesh.current.rotation.x = t * 0.15;
    mesh.current.rotation.y = t * 0.22;
  });
  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[1.4, 0]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.35} />
    </mesh>
  );
}

export default function FloatingObject({ color = "#D6A85F" }: { color?: string }) {
  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 40 }} gl={{ alpha: true }}>
      <Shape color={color} />
    </Canvas>
  );
}
