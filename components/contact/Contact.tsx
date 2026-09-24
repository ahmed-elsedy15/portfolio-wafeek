"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { useLanguage } from "@/context/LanguageContext";
import { ui } from "@/lib/translations";

export default function Contact() {
  const { lang } = useLanguage();
  const words = ui.contactWords[lang];

  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-32 sm:py-48">
      <div className="flex flex-col leading-[0.9]">
        {words.map((word, i) => (
          <motion.span
            key={word}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            className={`font-display text-6xl uppercase text-paper sm:text-8xl ${
              i === words.length - 1 ? "text-gold-soft" : ""
            }`}
          >
            {word}
          </motion.span>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-8 max-w-md text-sm text-mist sm:text-base"
      >
        {ui.contactSub[lang]}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-10 flex flex-wrap items-center gap-8"
      >
        <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 text-sm text-paper transition-colors hover:text-gold-soft">
          <Mail size={16} />
          {profile.email}
        </a>
        <a href={profile.social.github} target="_blank" rel="noreferrer" data-cursor="github" className="text-mist transition-colors hover:text-gold-soft">
          <Github size={20} />
        </a>
        <a href={profile.social.linkedin} target="_blank" rel="noreferrer" className="text-mist transition-colors hover:text-gold-soft">
          <Linkedin size={20} />
        </a>
      </motion.div>
    </section>
  );
}
