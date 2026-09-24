"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Expand } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { ui } from "@/lib/translations";

type ProjectGalleryProps = {
  images: string[];
  title: string;
};

export default function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const { lang } = useLanguage();
  const [index, setIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const count = images.length;

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % count);
  }, [count]);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + count) % count);
  }, [count]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, next, prev]);

  if (count === 0) {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-lg border border-ink-line bg-ink-raised text-sm text-mist">
        {ui.comingSoon[lang]}
      </div>
    );
  }

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) {
      delta > 0 ? prev() : next();
    }
    touchStartX.current = null;
  };

  return (
    <div className="w-full">
      <div
        className="group relative aspect-[9/16] w-full max-w-sm overflow-hidden rounded-2xl border border-ink-line bg-ink-raised transition-colors duration-300 hover:border-gold/40 sm:aspect-video sm:max-w-none"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={images[index]}
              alt={`${title} screenshot ${index + 1}`}
              fill
                unoptimized
              sizes="(max-width: 640px) 100vw, 60vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {count > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous screenshot"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-ink/60 p-2 text-paper opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              aria-label="Next screenshot"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-ink/60 p-2 text-paper opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}

        <button
          onClick={() => setLightboxOpen(true)}
          aria-label="Open fullscreen"
          className="absolute right-3 top-3 rounded-full bg-ink/60 p-2 text-paper opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
        >
          <Expand size={16} />
        </button>

        {count > 1 && (
          <span className="absolute bottom-3 right-3 rounded-full bg-ink/60 px-2.5 py-1 text-xs tabular-nums text-mist backdrop-blur">
            {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </span>
        )}
      </div>

      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 p-6"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              aria-label="Close fullscreen"
              className="absolute right-6 top-6 text-paper"
            >
              <X size={28} />
            </button>

            <div
              className="relative h-full w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <Image
                src={images[index]}
                alt={`${title} screenshot ${index + 1}, fullscreen`}
                fill
                unoptimized
                sizes="100vw"
                className="object-contain"
              />
            </div>

            {count > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prev();
                  }}
                  aria-label="Previous screenshot"
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-paper"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    next();
                  }}
                  aria-label="Next screenshot"
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-paper"
                >
                  <ChevronRight size={22} />
                </button>
                <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm tabular-nums text-mist">
                  {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
                </span>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
