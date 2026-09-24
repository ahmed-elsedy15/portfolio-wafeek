"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { profile } from "@/data/profile";
import { useLanguage, pick } from "@/context/LanguageContext";
import { ui } from "@/lib/translations";

type Role = (typeof profile.experience)[number];

function Entry({ role }: { role: Role }) {
  const { lang } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const [reached, setReached] = useState(false);

  // الخبرة بتنور لما بداية الصف تعدي نص الشاشة
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end center"] });
  useEffect(() => {
    setReached(scrollYProgress.get() > 0.001);
    return scrollYProgress.on("change", (v) => setReached(v > 0.001));
  }, [scrollYProgress]);

  return (
    <div
      ref={ref}
      className="relative py-10 pl-10 lg:grid lg:grid-cols-[320px_1fr] lg:gap-x-12 lg:py-14 lg:pl-0"
    >
      {/* Year + node على الـ rail */}
      <div className="relative lg:self-start lg:text-right">
        <span
          className={`absolute -left-7 top-1/2 z-10 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-all duration-500 lg:-right-6 lg:left-auto lg:translate-x-1/2 ${
            reached
              ? "border-gold bg-gold shadow-[0_0_18px_rgb(var(--color-gold))]"
              : "border-ink-line bg-ink"
          }`}
        />
        <span
          className="block break-words font-display text-6xl leading-none tracking-tight transition-all duration-500 lg:text-7xl"
          style={
            reached
              ? { color: "rgb(var(--color-gold))", WebkitTextStroke: "1px transparent" }
              : { color: "transparent", WebkitTextStroke: "1px rgb(var(--color-paper) / 0.35)" }
          }
        >
          {role.year}
        </span>
      </div>

      {/* Content */}
      <div className={`mt-5 transition-all duration-500 lg:mt-0 ${reached ? "translate-y-0 opacity-100" : "translate-y-2 opacity-40"}`}>
        <h3 className="font-display text-2xl leading-tight text-paper sm:text-3xl">{pick(role.role, lang)}</h3>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="text-sm text-gold-soft">{role.company}</span>
          <span className="rounded-full border border-ink-line px-3 py-1 text-xs text-mist">
            {pick(role.period, lang)}
          </span>
        </div>
        <p className="mt-5 max-w-prose text-sm leading-relaxed text-mist sm:text-base">{pick(role.description, lang)}</p>
      </div>
    </div>
  );
}

export default function Experience() {
  const { lang } = useLanguage();
  const listRef = useRef<HTMLDivElement>(null);

  // خط التقدم الدهبي بيتملي وانت بتنزل
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 50%", "end 50%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  return (
    <section id="journe" className="mx-auto max-w-6xl px-6 py-28 sm:py-36">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="font-display text-6xl uppercase leading-[0.85] tracking-[-0.04em] text-paper sm:text-8xl"
      >
        {ui.experience[lang]}
        <span className="text-gold-soft">.</span>
      </motion.h2>

      <div ref={listRef} className="relative mt-16 sm:mt-20">
        {/* Rail */}
        <div className="absolute bottom-0 left-3 top-0 w-px bg-ink-line lg:left-[344px]" />
        <motion.div
          aria-hidden
          className="absolute bottom-0 left-3 top-0 w-px origin-top bg-gold shadow-[0_0_10px_rgb(var(--color-gold))] lg:left-[344px]"
          style={{ scaleY: fill }}
        />

        {profile.experience.map((role) => (
          <Entry key={role.company} role={role} />
        ))}
      </div>
    </section>
  );
}
