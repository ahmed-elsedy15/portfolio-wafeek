export type Lang = "en" | "ar";
export type Localized = { en: string; ar: string };

export const ui = {
  nav: {
    about: { en: "About", ar: "نبذة" },
    skills: { en: "Skills", ar: "المهارات" },
    projects: { en: "Projects", ar: "الأعمال" },
    contact: { en: "Contact", ar: "تواصل" },
  },
  scrollToWork: { en: "Scroll", ar: "انزل تحت" },
  aboutWords: {
    en: ["ABOUT", "THE", "DEVELOPER"],
    ar: ["نبذة", "عن", "المطوّر"],
  },
  statLabel: { en: "Years of Flutter Development", ar: "سنين خبرة في تطوير فلاتر" },
  floatingTags: {
    en: ["FLUTTER", "DART", "MOBILE", "UI/UX"],
    ar: ["فلاتر", "دارت", "موبايل", "UI/UX"],
  },
  selectedWork: { en: "Selected work", ar: "أعمال مختارة" },
  selectedWorkSub: {
    en: "Five Flutter apps, five different problems — history, education, health, and retail.",
    ar: "خمس تطبيقات فلاتر، خمس مشكلات مختلفة — تاريخ، تعليم، صحة، وتجارة.",
  },
  explore: { en: "Explore project", ar: "استعرض المشروع" },
  backToWork: { en: "Back to work", ar: "الرجوع للأعمال" },
  viewCode: { en: "View code", ar: "الكود على جيت هب" },
  liveApp: { en: "Live app", ar: "التطبيق مباشرة" },
  comingSoon: { en: "Screenshots coming soon", ar: "لقطات الشاشة قريبًا" },
  downloadCV: { en: "Download CV", ar: "تحميل السيرة الذاتية" },
  langToggle: { en: "AR", ar: "EN" },
  experience: { en: "Journey", ar: "المشوار" },
  designHeading: { en: ["DESIGN", "MEETS", "DEVELOPMENT"], ar: ["التصميم", "يلتقي", "بالتطوير"] },
  designBody: {
    en: "Before the code, there's usually a screen sketched in Photoshop. That graphic-design background shapes every layout decision I make in Flutter.",
    ar: "قبل الكود، غالبًا بيكون فيه شاشة اترسمت في فوتوشوب. خلفيتي في التصميم الجرافيكي بتأثر في كل قرار تخطيط بعمله في فلاتر.",
  },
  contactWords: { en: ["LET'S", "BUILD", "SOMETHING."], ar: ["يلا", "نبني", "حاجة."] },
  contactSub: {
    en: "Available for opportunities, collaboration, and interesting mobile products.",
    ar: "متاح لفرص، تعاون، ومنتجات موبايل مثيرة للاهتمام.",
  },
  techOrbitHint: { en: "Hover a node", ar: "حرّك الماوس على أي عنصر" },
} as const;

export const cursorLabels = {
  view: "VIEW",
  github: "GITHUB",
  open: "OPEN",
};
