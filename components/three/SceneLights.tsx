"use client";

export default function SceneLights({ accent = "#D6A85F" }: { accent?: string }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 4, 5]} intensity={1.1} color="#ffffff" />
      <pointLight position={[-3, -2, -3]} intensity={0.6} color={accent} />
      <pointLight position={[0, 3, -4]} intensity={0.4} color="#6FE0C5" />
    </>
  );
}
