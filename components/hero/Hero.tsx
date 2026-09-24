"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Download, ArrowDown } from "lucide-react";
import { profile } from "@/data/profile";
import { useLanguage, pick } from "@/context/LanguageContext";
import { ui } from "@/lib/translations";
import Tilt from "@/components/effects/Tilt";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero() {
  const { lang } = useLanguage();
  const name = lang === "ar" ? profile.nameAr : profile.name;

  return (
    <section id="top" className="relative flex h-[100svh] w-full items-center justify-center overflow-hidden">
      <Image src="/images/profile/bg.jpeg" alt="" fill priority unoptimized sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/75 via-ink/70 to-ink" />

      {/* slow animated light */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-1/4 top-0 h-[60vh] w-[60vh] rounded-full bg-gold/10 blur-[120px]"
        animate={{ x: ["0%", "20%", "0%"], y: ["0%", "10%", "0%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-1/4 bottom-0 h-[50vh] w-[50vh] rounded-full bg-teal/10 blur-[120px]"
        animate={{ x: ["0%", "-15%", "0%"], y: ["0%", "-10%", "0%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* film grain */}
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.06]" />

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <motion.div initial="hidden" animate="show" custom={0} variants={fadeUp} className="mb-8">
          <Tilt strength={14} className="rounded-full">
            <div
              className="relative h-32 w-32 overflow-hidden rounded-full border border-gold/30 sm:h-44 sm:w-44"
              style={{ boxShadow: "0 0 60px rgba(214,168,95,0.18), 0 25px 50px rgba(0,0,0,0.5)" }}
            >
              <Image src="/images/profile/pro.jpeg" alt={name} fill priority unoptimized sizes="176px" className="object-cover" />
            </div>
          </Tilt>
        </motion.div>

        <motion.h1
          initial="hidden"
          animate="show"
          custom={0.15}
          variants={fadeUp}
          className="font-display text-4xl uppercase tracking-tight text-paper sm:text-6xl"
        >
          {name}
        </motion.h1>

        <motion.p initial="hidden" animate="show" custom={0.3} variants={fadeUp} className="mt-3 text-lg text-gold-soft sm:text-xl">
          {pick(profile.role, lang)}
        </motion.p>

        <motion.p
          initial="hidden"
          animate="show"
          custom={0.45}
          variants={fadeUp}
          className="mt-6 max-w-md text-balance text-sm leading-relaxed text-mist sm:text-base"
        >
          {pick(profile.tagline, lang)}
        </motion.p>

        <motion.div
          initial="hidden"
          animate="show"
          custom={0.6}
          variants={fadeUp}
          className="mt-8 flex flex-col items-center gap-6 sm:flex-row"
        >
          <a
            href={profile.cv}
            download
            data-cursor="open"
            className="inline-flex items-center gap-2 rounded-full border border-gold/50 px-5 py-2.5 text-sm text-gold-soft transition-colors hover:bg-gold/10"
          >
            <Download size={16} />
            {ui.downloadCV[lang]}
          </a>
          <div className="flex items-center gap-6">
            <a href={profile.social.github} target="_blank" rel="noreferrer" aria-label="GitHub" data-cursor="github" className="text-mist transition-colors hover:text-gold-soft">
              <Github size={20} />
            </a>
            <a href={profile.social.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-mist transition-colors hover:text-gold-soft">
              <Linkedin size={20} />
            </a>
            <a href={`mailto:${profile.email}`} aria-label="Email" className="text-mist transition-colors hover:text-gold-soft">
              <Mail size={20} />
            </a>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#skills"
        aria-label={ui.scrollToWork[lang]}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-mist transition-colors hover:text-gold-soft"
      >
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1"
        >
          <span className="text-[10px] uppercase tracking-[0.2em]">{ui.scrollToWork[lang]}</span>
          <ArrowDown size={16} />
        </motion.span>
      </motion.a>
    </section>
  );
}
