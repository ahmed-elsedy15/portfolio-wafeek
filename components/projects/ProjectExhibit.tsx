"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Github, ArrowRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { useLanguage, pick } from "@/context/LanguageContext";
import { ui } from "@/lib/translations";

const pad = (n: number) => String(n).padStart(2, "0");

// نسبة (٪) الفريم الجاهز اللي بيتقص من كل جنب في الصورة (مقاسة على لقطات الـ emulator)
const DEFAULT_INSET = { x: 6.3, y: 2.3 };

export default function ProjectExhibit({ project, index }: { project: Project; index: number }) {
  const { lang } = useLanguage();
  const [current, setCurrent] = useState(0);
  const count = project.images.length;

  const next = useCallback(() => setCurrent((i) => (i + 1) % Math.max(count, 1)), [count]);
  const prev = useCallback(() => setCurrent((i) => (i - 1 + count) % Math.max(count, 1)), [count]);

  useEffect(() => {
    if (count <= 1) return;
    const id = setInterval(next, 4200);
    return () => clearInterval(id);
  }, [count, next]);

  // لو الصورة فيها فريم جاهز: بنكبّرها ونزحزحها عشان الشاشة بس هي اللي تملا فريمنا
  const framed = !!project.framed;
  const inset = project.frameInset ?? DEFAULT_INSET;
  const scaleX = 1 / (1 - (2 * inset.x) / 100);
  const scaleY = 1 / (1 - (2 * inset.y) / 100);
  const cropStyle = framed
    ? {
        width: `${scaleX * 100}%`,
        height: `${scaleY * 100}%`,
        left: `${-inset.x * scaleX}%`,
        top: `${-inset.y * scaleY}%`,
      }
    : undefined;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="grid items-center gap-10 border-t border-ink-line py-20 sm:grid-cols-12 sm:gap-12 sm:py-28"
    >
      {/* ───────── Text side ───────── */}
      <div className="order-2 sm:order-1 sm:col-span-5">
        <span className="font-display text-sm" style={{ color: project.accent }}>
          {pad(index + 1)}
        </span>
        <h3 className="mt-2 font-display text-4xl uppercase tracking-tight text-paper sm:text-5xl">
          {project.title}
          {project.arabicTitle && <span className="ml-3 text-mist">{project.arabicTitle}</span>}
        </h3>
        <p className="mt-2 text-xs uppercase tracking-[0.15em] text-mist">{pick(project.category, lang)}</p>

        <p className="mt-6 max-w-sm text-sm leading-relaxed text-mist sm:text-base">
          {pick(project.description, lang)}
        </p>

        <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-1.5">
          {project.technologies.map((tech) => (
            <li key={tech} className="text-xs uppercase tracking-[0.1em] text-mist">
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex items-center gap-6">
          <Link
            href={`/projects/${project.slug}`}
            data-cursor="view"
            className="inline-flex items-center gap-1.5 text-sm text-paper transition-colors"
          >
            <span className="border-b border-transparent pb-0.5 transition-colors hover:border-current">
              {ui.explore[lang]}
            </span>
            <ArrowRight size={15} className={lang === "ar" ? "rotate-180" : ""} />
          </Link>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              data-cursor="github"
              className="text-mist transition-colors hover:text-paper"
            >
              <Github size={17} />
            </a>
          )}
        </div>
      </div>

      {/* ───────── Phone side ───────── */}
      <div className="order-1 flex flex-col items-center sm:order-2 sm:col-span-7">
        <div className="relative w-[250px] sm:w-[280px]">
          {/* Side buttons */}
          <span className="absolute -left-[3px] top-24 h-8 w-[3px] rounded-l bg-ink-line" />
          <span className="absolute -left-[3px] top-36 h-14 w-[3px] rounded-l bg-ink-line" />
          <span className="absolute -left-[3px] top-52 h-14 w-[3px] rounded-l bg-ink-line" />
          <span className="absolute -right-[3px] top-40 h-20 w-[3px] rounded-r bg-ink-line" />

          {/* Body */}
          <div className="relative aspect-[9/19.5] w-full rounded-[2.6rem] border border-ink-line bg-ink-raised p-[10px] shadow-2xl">
            {/* Screen */}
            <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-black">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="absolute inset-0"
                >
                  <div className={framed ? "absolute" : "absolute inset-0"} style={cropStyle}>
                    <Image
                      src={project.images[current] ?? ""}
                      alt={`${project.title} screenshot ${current + 1}`}
                      fill
                      unoptimized
                      sizes="330px"
                      className={framed ? "object-cover" : "object-cover object-top"}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* الصور الجاهزة فيها dynamic island وهوم خاصين بيها، فبنضيفهم بس للقطات العادية */}
              {!framed && (
                <>
                  <span className="absolute left-1/2 top-2 z-20 h-[18px] w-[72px] -translate-x-1/2 rounded-full bg-black" />
                  <span className="absolute bottom-1.5 left-1/2 z-20 h-1 w-24 -translate-x-1/2 rounded-full bg-white/60" />
                </>
              )}
            </div>
          </div>

          {count > 1 && (
            <>
              <button
                onClick={prev}
                aria-label="Previous screen"
                className="absolute -left-10 top-1/2 -translate-y-1/2 rounded-full bg-ink-raised/70 p-2 text-paper backdrop-blur transition-colors hover:bg-ink-raised sm:-left-14"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={next}
                aria-label="Next screen"
                className="absolute -right-10 top-1/2 -translate-y-1/2 rounded-full bg-ink-raised/70 p-2 text-paper backdrop-blur transition-colors hover:bg-ink-raised sm:-right-14"
              >
                <ChevronRight size={16} />
              </button>
            </>
          )}
        </div>

        {/* Dots */}
        {count > 1 && (
          <div className="mt-6 flex gap-1.5">
            {project.images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to screen ${i + 1}`}
                className="h-1.5 rounded-full transition-all"
                style={{
                  width: i === current ? 18 : 6,
                  backgroundColor: i === current ? project.accent : "rgba(255,255,255,0.15)",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
}
