"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import PhoneModel from "@/components/three/PhoneModel";
import SceneLights from "@/components/three/SceneLights";

type PhoneSceneProps = {
  image: string;
  accent?: string;
};

export default function PhoneScene({ image, accent }: PhoneSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.4], fov: 32 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
    >
      <SceneLights accent={accent} />
      <Suspense fallback={null}>
        <PhoneModel image={image} accent={accent} />
        <ContactShadows position={[0, -1.85, 0]} opacity={0.45} scale={6} blur={2.4} far={3} color="#000000" />
      </Suspense>
    </Canvas>
  );
}
