"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { Lang } from "@/lib/translations";

type LanguageContextValue = {
  lang: Lang;
  dir: "ltr" | "rtl";
  toggle: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem("portfolio-lang");
    if (saved === "en" || saved === "ar") setLang(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    window.localStorage.setItem("portfolio-lang", lang);
  }, [lang]);

  const toggle = () => setLang((l) => (l === "ar" ? "en" : "ar"));

  return (
    <LanguageContext.Provider value={{ lang, dir: lang === "ar" ? "rtl" : "ltr", toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}

/** Pick the string for the current language out of a { en, ar } field. */
export function pick(field: { en: string; ar: string }, lang: Lang) {
  return field[lang];
}
