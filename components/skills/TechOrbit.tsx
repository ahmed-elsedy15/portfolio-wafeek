"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ChevronDown, Palette, Server, Smartphone, type LucideIcon } from "lucide-react";
import { centerSkill, skillNodes } from "@/data/skills";
import { useLanguage, pick } from "@/context/LanguageContext";
import { ui } from "@/lib/translations";

const AUTOPLAY_MS = 4500;

type CatId = "flutter" | "design" | "backend";

const categories: { id: CatId; title: { en: string; ar: string }; Icon: LucideIcon }[] = [
  { id: "flutter", title: { en: "Flutter", ar: "فلاتر" }, Icon: Smartphone },
  { id: "design", title: { en: "Design", ar: "التصميم" }, Icon: Palette },
  { id: "backend", title: { en: "Backend & tools", ar: "الباك إند والأدوات" }, Icon: Server },
];

// لو مهارة اتصنفت غلط، اكتب اسمها بالظبط هنا وحدد القسم بتاعها. مثال: { Firebase: "backend" }
const OVERRIDES: Record<string, CatId> = {};

const DESIGN_RE = /figma|\bui\b|\bux\b|ui\/ux|design|adobe|photoshop|illustrator|prototyp|wireframe|animation|motion/i;
const FLUTTER_RE = /flutter|dart|cubit|bloc|provider|riverpod|getx|mvvm|mvc|clean|architecture|state|widget|mobile|android|ios/i;

function categoryOf(label: string): CatId {
  const key = Object.keys(OVERRIDES).find((k) => k.toLowerCase() === label.toLowerCase());
  if (key) return OVERRIDES[key];
  if (DESIGN_RE.test(label)) return "design";
  if (FLUTTER_RE.test(label)) return "flutter";
  return "backend";
}

export default function TechOrbit() {
  const { lang } = useLanguage();
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { margin: "-20% 0px" });

  const byCat = useMemo(() => {
    const map: Record<CatId, number[]> = { flutter: [], design: [], backend: [] };
    skillNodes.forEach((node, i) => map[categoryOf(node.label)].push(i));
    return map;
  }, []);
  const visibleCats = categories.filter((c) => byCat[c.id].length > 0);

  const [tab, setTab] = useState<CatId>(visibleCats[0]?.id ?? "flutter");
  const [paused, setPaused] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const skillsWord = lang === "ar" ? "مهارات" : "skills";

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // الأقسام بتتبدل لوحدها على الديسكتوب، وبتقف لما تحوم عليها
  const autoplay = isDesktop && inView && !paused && !reduceMotion && visibleCats.length > 1;

  useEffect(() => {
    if (!autoplay) return;
    const id = setTimeout(() => {
      const idx = visibleCats.findIndex((c) => c.id === tab);
      setTab(visibleCats[(idx + 1) % visibleCats.length].id);
    }, AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [autoplay, tab, visibleCats]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative overflow-clip border-y border-ink-line bg-ink-raised/20 px-6 py-28 sm:py-36"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgb(var(--color-paper))_1px,transparent_1px),linear-gradient(90deg,rgb(var(--color-paper))_1px,transparent_1px)] [background-size:64px_64px]" />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-14 grid gap-8 sm:grid-cols-12 sm:items-end"
        >
          <div className="sm:col-span-7">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.24em] text-gold-soft">
              <span className="h-px w-8 bg-gold" />
              {ui.nav.skills[lang]}
            </div>
            <h2 className="mt-5 font-display text-6xl uppercase leading-[0.82] tracking-[-0.04em] text-paper sm:text-8xl">
              {centerSkill}
              <span className="text-gold-soft">.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-mist sm:col-span-4 sm:col-start-9 sm:text-right">
            {lang === "ar"
              ? "أدوات وتقنيات لبناء تطبيقات موبايل سريعة، واضحة، وقابلة للتوسع."
              : "A focused toolkit for building mobile products that feel fast, clear, and ready to scale."}
          </p>
        </motion.div>

        {/* ───────── Desktop: expanding panels ───────── */}
        <div
          role="tablist"
          className="hidden gap-3 lg:flex lg:h-[560px]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {visibleCats.map((c) => {
            const on = c.id === tab;
            const list = byCat[c.id];
            const Icon = c.Icon;
            return (
              <motion.div
                key={c.id}
                role="tab"
                tabIndex={0}
                aria-selected={on}
                onMouseEnter={() => setTab(c.id)}
                onFocus={() => setTab(c.id)}
                onClick={() => setTab(c.id)}
                initial={false}
                animate={{ flexGrow: on ? 4 : 1 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                style={{ flexBasis: 0 }}
                className={`relative min-w-0 cursor-pointer overflow-hidden rounded-3xl border outline-none transition-colors duration-500 focus-visible:ring-1 focus-visible:ring-gold ${
                  on
                    ? "border-gold/50 bg-gradient-to-b from-gold/15 via-ink-raised/40 to-transparent"
                    : "border-ink-line bg-ink-raised/30 hover:border-gold/30"
                }`}
              >
                {/* الشكل المقفول: عنوان رأسي */}
                <motion.div
                  aria-hidden={on}
                  className="absolute inset-0 flex flex-col items-center justify-between p-6"
                  animate={{ opacity: on ? 0 : 1 }}
                  transition={{ duration: 0.25, delay: on ? 0 : 0.35 }}
                >
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-ink-line text-gold-soft">
                    <Icon size={18} />
                  </span>
                  <span
                    className="rotate-180 font-display text-4xl uppercase leading-none tracking-tight [writing-mode:vertical-rl]"
                    style={{ color: "transparent", WebkitTextStroke: "1px rgb(var(--color-paper) / 0.4)" }}
                  >
                    {pick(c.title, lang)}
                  </span>
                  <span className="text-xs text-mist">{list.length}</span>
                </motion.div>

                {/* الشكل المفتوح: المهارات */}
                <motion.div
                  aria-hidden={!on}
                  className="absolute inset-0 flex w-[560px] flex-col p-8"
                  style={{ pointerEvents: on ? "auto" : "none" }}
                  animate={{ opacity: on ? 1 : 0 }}
                  transition={{ duration: 0.3, delay: on ? 0.25 : 0 }}
                >
                  <div className="flex items-start justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-gold text-ink">
                      <Icon size={18} />
                    </span>
                    <span className="text-xs text-mist">
                      {list.length} {skillsWord}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-4xl uppercase leading-none text-paper xl:text-5xl">
                    {pick(c.title, lang)}
                    <span className="text-gold-soft">.</span>
                  </h3>

                  <ul className="mt-6 grid flex-1 grid-cols-2 content-start gap-x-8">
                    {list.map((i, k) => (
                      <motion.li
                        key={skillNodes[i].label}
                        className="border-t border-ink-line py-3"
                        animate={{ opacity: on ? 1 : 0, y: on ? 0 : 14 }}
                        transition={{ duration: 0.4, delay: on ? 0.35 + k * 0.07 : 0 }}
                      >
                        <p className="font-display text-base uppercase tracking-wide text-paper">{skillNodes[i].label}</p>
                        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-mist">
                          {pick(skillNodes[i].description, lang)}
                        </p>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* ───────── Mobile: accordion ───────── */}
        <div className="space-y-3 lg:hidden">
          {visibleCats.map((c) => {
            const on = c.id === tab;
            const list = byCat[c.id];
            const Icon = c.Icon;
            return (
              <div
                key={c.id}
                className={`overflow-hidden rounded-2xl border transition-colors ${
                  on ? "border-gold/50 bg-gold/5" : "border-ink-line bg-ink-raised/30"
                }`}
              >
                <button
                  onClick={() => setTab(c.id)}
                  aria-expanded={on}
                  className="flex w-full items-center gap-4 p-5 text-left"
                >
                  <span
                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-full transition-colors ${
                      on ? "bg-gold text-ink" : "border border-ink-line text-gold-soft"
                    }`}
                  >
                    <Icon size={17} />
                  </span>
                  <span className="flex-1 font-display text-2xl uppercase leading-none text-paper">
                    {pick(c.title, lang)}
                  </span>
                  <span className="text-xs text-mist">{list.length}</span>
                  <ChevronDown size={18} className={`text-mist transition-transform ${on ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div
                      key="list"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="overflow-hidden"
                    >
                      <ul className="divide-y divide-ink-line px-5 pb-3">
                        {list.map((i) => (
                          <li key={skillNodes[i].label} className="py-3">
                            <p className="font-display text-base uppercase tracking-wide text-paper">
                              {skillNodes[i].label}
                            </p>
                            <p className="mt-1 text-xs leading-relaxed text-mist">{pick(skillNodes[i].description, lang)}</p>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
