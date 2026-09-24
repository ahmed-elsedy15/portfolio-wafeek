"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Languages, Menu, Moon, Sun, X } from "lucide-react";
import { profile } from "@/data/profile";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { ui } from "@/lib/translations";

const sectionIds = ["about", "skills", "projects", "contact"] as const;

export default function Navbar() {
  const { lang, toggle } = useLanguage();
  const { theme, toggle: toggleTheme } = useTheme();
  const [active, setActive] = useState<string>("about");
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const observers = sectionIds.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-45% 0px -45% 0px" }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  const links = [
    { id: "about", num: "01", label: ui.nav.about[lang] },
    { id: "skills", num: "02", label: ui.nav.skills[lang] },
    { id: "projects", num: "03", label: ui.nav.projects[lang] },
    { id: "contact", num: "04", label: ui.nav.contact[lang] },
  ];

  return (
    <>
      <motion.div className="fixed left-0 top-0 z-50 h-[2px] w-full origin-left bg-gold" style={{ scaleX: progress }} />

      <header className="fixed inset-x-0 top-0 z-40">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <a href="#top" className="font-display text-sm uppercase tracking-[0.15em] text-paper">
            {lang === "ar" ? profile.nameAr.split(" ")[0] : profile.name.split(" ")[0]}
          </a>

          <ul className="hidden items-center gap-8 sm:flex">
            {links.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  className={`text-xs uppercase tracking-[0.15em] transition-colors ${
                    active === l.id ? "text-gold-soft" : "text-mist hover:text-paper"
                  }`}
                >
                  {l.num} {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className="text-mist transition-colors hover:text-gold-soft"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              onClick={toggle}
              aria-label="Toggle language"
              className="hidden items-center gap-1.5 rounded-full border border-ink-line px-3 py-1.5 text-xs text-mist transition-colors hover:border-gold/50 hover:text-gold-soft sm:flex"
            >
              <Languages size={13} />
              {ui.langToggle[lang]}
            </button>
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="text-paper sm:hidden"
            >
              <Menu size={22} />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex flex-col bg-ink/98 px-6 py-8 backdrop-blur sm:hidden"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={toggleTheme}
                  aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                  className="text-mist"
                >
                  {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                </button>
                <button onClick={toggle} className="flex items-center gap-1.5 rounded-full border border-ink-line px-3 py-1.5 text-xs text-mist">
                  <Languages size={13} />
                  {ui.langToggle[lang]}
                </button>
              </div>
              <button onClick={() => setMenuOpen(false)} aria-label="Close menu" className="text-paper">
                <X size={24} />
              </button>
            </div>

            <div className="mt-16 flex flex-1 flex-col justify-center gap-6">
              {links.map((l, i) => (
                <motion.a
                  key={l.id}
                  href={`#${l.id}`}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="font-display text-4xl uppercase text-paper"
                >
                  <span className="mr-3 text-base text-gold-soft">{l.num}</span>
                  {l.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
