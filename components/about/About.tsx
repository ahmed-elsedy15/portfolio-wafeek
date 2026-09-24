"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import { useLanguage, pick } from "@/context/LanguageContext";
import { ui } from "@/lib/translations";

export default function About() {
  const { lang } = useLanguage();
  const words = ui.aboutWords[lang];
  const tags = ui.floatingTags[lang];

  return (
    <section id="about" className="relative mx-auto max-w-6xl overflow-hidden px-6 py-28 sm:py-40">
      {/* floating metadata */}
      <div className="pointer-events-none absolute inset-0 hidden sm:block">
        {tags.map((tag, i) => (
          <motion.span
            key={tag}
            className="absolute text-[11px] uppercase tracking-[0.2em] text-mist/60"
            style={{
              top: `${12 + i * 20}%`,
              [lang === "ar" ? "left" : "right"]: `${4 + (i % 2) * 6}%`,
            }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
          >
            {tag}
          </motion.span>
        ))}
      </div>

      <div className="grid gap-16 sm:grid-cols-12">
        <div className="sm:col-span-5">
          <div className="flex flex-col leading-[0.9]">
            {words.map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, x: lang === "ar" ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className={`font-display text-5xl uppercase text-paper sm:text-7xl ${
                  i === words.length - 1 ? "text-gold-soft" : ""
                }`}
              >
                {word}
              </motion.span>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12"
          >
            <span className="font-display text-6xl text-teal-soft">{profile.yearsOfExperience}</span>
            <p className="mt-1 max-w-[16rem] text-xs uppercase tracking-[0.15em] text-mist">
              {ui.statLabel[lang]}
            </p>
          </motion.div>
        </div>

        <div className="flex flex-col justify-center gap-5 sm:col-span-6 sm:col-start-7">
          {profile.about.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="max-w-prose text-base leading-relaxed text-mist sm:text-lg"
            >
              {pick(p, lang)}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
