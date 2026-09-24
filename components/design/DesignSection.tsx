"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { ui } from "@/lib/translations";

export default function DesignSection() {
  const { lang } = useLanguage();
  const words = ui.designHeading[lang];

  return (
    <section className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <div className="grid gap-10 sm:grid-cols-12 sm:items-center">
        <div className="sm:col-span-7">
          <div className="flex flex-wrap items-baseline gap-x-4 leading-none">
            {words.map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`font-display text-4xl uppercase sm:text-5xl ${
                  i === 1 ? "text-teal-soft" : "text-paper"
                }`}
              >
                {word}
              </motion.span>
            ))}
          </div>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-sm text-sm leading-relaxed text-mist sm:col-span-5 sm:text-base"
        >
          {ui.designBody[lang]}
        </motion.p>
      </div>
    </section>
  );
}
