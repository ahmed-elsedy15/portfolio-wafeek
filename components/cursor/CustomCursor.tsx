"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    const isFine = window.matchMedia("(pointer: fine)").matches;
    if (!isFine) return;
    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = (e.target as HTMLElement)?.closest("[data-cursor]");
      setLabel(target ? target.getAttribute("data-cursor") : null);
    };
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-[200] -translate-x-1/2 -translate-y-1/2"
    >
      <motion.div
        animate={{
          width: label ? 64 : 10,
          height: label ? 64 : 10,
          backgroundColor: label ? "rgba(214,168,95,0.12)" : "rgba(244,241,234,0.9)",
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="flex items-center justify-center rounded-full border border-gold/60 text-[9px] uppercase tracking-[0.15em] text-gold-soft"
      >
        {label}
      </motion.div>
    </motion.div>
  );
}
