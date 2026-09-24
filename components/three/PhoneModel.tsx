"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox, useTexture } from "@react-three/drei";
import * as THREE from "three";

type PhoneModelProps = {
  image: string;
  accent?: string;
  autoRotate?: boolean;
};

const pixelFallback =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=";

export default function PhoneModel({ image, accent = "#D6A85F", autoRotate = true }: PhoneModelProps) {
  const group = useRef<THREE.Group>(null);
  const texture = useTexture(image.endsWith(".svg") ? pixelFallback : image);
  texture.colorSpace = THREE.SRGBColorSpace;

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = Math.sin(t * 0.25) * 0.35 + (autoRotate ? 0 : 0);
    group.current.position.y = Math.sin(t * 0.6) * 0.06;
  });

  return (
    <group ref={group} rotation={[0, -0.25, 0]}>
      {/* device body */}
      <RoundedBox args={[1.72, 3.5, 0.16]} radius={0.16} smoothness={6}>
        <meshStandardMaterial color="#15181d" metalness={0.85} roughness={0.28} />
      </RoundedBox>

      {/* screen bezel */}
      <mesh position={[0, 0, 0.081]}>
        <planeGeometry args={[1.56, 3.3]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* screen (screenshot texture) */}
      <mesh position={[0, 0, 0.083]}>
        <planeGeometry args={[1.48, 3.18]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>

      {/* camera dot */}
      <mesh position={[0, 1.55, 0.09]}>
        <circleGeometry args={[0.045, 24]} />
        <meshStandardMaterial color="#050607" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* side buttons */}
      <mesh position={[0.865, 0.5, 0]}>
        <boxGeometry args={[0.03, 0.4, 0.06]} />
        <meshStandardMaterial color="#2a2e35" metalness={0.9} roughness={0.3} />
      </mesh>
      <mesh position={[0.865, -0.1, 0]}>
        <boxGeometry args={[0.03, 0.25, 0.06]} />
        <meshStandardMaterial color="#2a2e35" metalness={0.9} roughness={0.3} />
      </mesh>

      {/* faint accent rim light */}
      <pointLight position={[0, 0, 1.2]} intensity={0.35} color={accent} distance={3} />
    </group>
  );
}
