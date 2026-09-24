import type { Localized } from "@/lib/translations";

export type SkillNode = {
  label: string;
  description: Localized;
};

export const centerSkill = "FLUTTER";

export const skillNodes: SkillNode[] = [
  { label: "DART", description: { en: "Language used to build Flutter applications.", ar: "اللغة اللي بابني بيها تطبيقات فلاتر." } },
  { label: "FIREBASE", description: { en: "Authentication and cloud data.", ar: "التوثيق والبيانات السحابية." } },
  { label: "NODE.JS", description: { en: "Backend for Nourish Parent's real-time features.", ar: "الباكند بتاع الفيتشرز اللحظية في Nourish Parent." } },
  { label: "SOCKET.IO", description: { en: "Real-time bus tracking and live updates.", ar: "تتبع الباص والتحديثات اللحظية." } },
  { label: "STRIPE", description: { en: "Payments for school fees in Nourish Parent.", ar: "مدفوعات المصاريف المدرسية في Nourish Parent." } },
  { label: "REST API", description: { en: "Connecting Flutter apps to live data.", ar: "ربط تطبيقات فلاتر بالبيانات الحية." } },
  { label: "MVVM", description: { en: "Architecture behind Nourish Parent's codebase.", ar: "المعمارية اللي بُني بيها Nourish Parent." } },
  { label: "CUBIT", description: { en: "State management across most projects.", ar: "إدارة الحالة في معظم مشاريعي." } },
  { label: "GIT", description: { en: "Version control for every project.", ar: "التحكم في نسخ الكود لكل مشروع." } },
  { label: "GITHUB", description: { en: "Where the code lives and ships from.", ar: "مكان الكود ومنه بينزل." } },
  { label: "CLEAN ARCHITECTURE", description: { en: "The basis for scalable, testable Flutter apps.", ar: "الأساس اللي بابني بيه تطبيقات قابلة للتوسع والاختبار." } },
];
