"use client";

import { profile } from "@/data/profile";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { lang } = useLanguage();
  return (
    <footer className="mx-auto max-w-6xl px-6 pb-10">
      <div className="flex flex-col gap-2 border-t border-ink-line pt-6 text-xs text-mist sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} {lang === "ar" ? profile.nameAr : profile.name}</span>
        <span className="uppercase tracking-[0.15em]">Flutter Developer</span>
      </div>
    </footer>
  );
}
