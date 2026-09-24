export type Localized = { en: string; ar: string };

export type Project = {
  slug: string;
  number: string;
  title: string;
  arabicTitle?: string;
  category: Localized;
  description: Localized;
  longDescription?: Localized;
  technologies: string[];
  accent: string;
  github?: string;
  live?: string;
  images: string[];
  framed?: boolean; // الصور فيها فريم موبايل جاهز (بيتقص ويتحط في فريمنا)
  frameInset?: { x: number; y: number }; // نسبة ٪ الفريم الجاهز اللي بيتقص (افتراضي x:6.3 / y:2.3)
};

export const projects: Project[] = [
  {
    slug: "athar",
    number: "01",
    title: "Athar",
    arabicTitle: "أثر",
    category: { en: "Historical Mobile Application", ar: "تطبيق تاريخي" },
    description: {
      en: "A historical exploration app covering figures, countries, battles and maps, in Arabic and English.",
      ar: "تطبيق لاستكشاف التاريخ — شخصيات، دول، معارك وخرائط — بالعربي والإنجليزي.",
    },
    longDescription: {
      en: "Athar is a cross-platform historical app with Firebase Authentication and Firestore for user data. Full bilingual support (Arabic & English) lets people explore historical figures, countries, battles, and maps through a clean, intuitive UI.",
      ar: "أثر تطبيق تاريخي كروس-بلاتفورم بيستخدم Firebase Authentication و Firestore لبيانات المستخدم. بيدعم العربي والإنجليزي بالكامل، وبيخلي الناس يستكشفوا شخصيات تاريخية، دول، معارك، وخرائط من خلال واجهة نظيفة.",
    },
    technologies: ["Flutter", "Firebase Authentication", "Firestore", "Arabic / English"],
    accent: "#D6A85F",
    github: "https://github.com/abdallah-wafeeq/athar",
    images: [
      "/projects/athar/1.jpeg",
      "/projects/athar/2.jpeg",
      "/projects/athar/3.jpeg",
      "/projects/athar/4.jpeg",
      "/projects/athar/5.jpeg",
    ],
    framed: true,
  },
  {
    slug: "nourish-parent",
    number: "02",
    title: "Nourish Parent",
    category: { en: "Student Management Application", ar: "تطبيق إدارة شؤون الطلاب" },
    description: {
      en: "A school management app for parents — attendance, grades, payments and live bus tracking.",
      ar: "تطبيق لإدارة شؤون الطلاب للأهل — حضور، درجات، مدفوعات، وتتبع الباص لحظيًا.",
    },
    longDescription: {
      en: "An educational and student-management app built with Flutter, Node.js, Socket.IO, Stripe, and Flutter Map. Parents can monitor attendance, grades, exams, schedules, meals, payments, notifications, and real-time bus tracking — built with MVVM and Cubit.",
      ar: "تطبيق لإدارة شؤون الطلاب مبني بـ Flutter و Node.js و Socket.IO و Stripe و Flutter Map. بيخلي الأهل يتابعوا الحضور، الدرجات، الامتحانات، الجدول، المدفوعات، والإشعارات، وتتبع الباص لحظيًا — بمعمارية MVVM و Cubit.",
    },
    technologies: ["Flutter", "Node.js", "Socket.IO", "Stripe", "Flutter Map", "MVVM", "Cubit"],
    accent: "#6FE0C5",
    github: "https://github.com/abdallah-wafeeq/Nourish-Parent",
    images: [
      "/projects/nourish-parent/1.jpeg", // كانت 1.jpag (غلط إملائي)
      "/projects/nourish-parent/2.jpeg",
      "/projects/nourish-parent/3.jpeg",
      "/projects/nourish-parent/4.jpeg",
      "/projects/nourish-parent/5.jpeg",
      "/projects/nourish-parent/6.jpeg",
      "/projects/nourish-parent/7.jpeg",
    ],
    framed: true,
  },
  {
    slug: "lungguard",
    number: "03",
    title: "LungGuard",
    category: { en: "Medical Screening Application", ar: "تطبيق كشف طبي" },
    description: {
      en: "An app where users upload CT scans and receive analysis from a backend deep-learning model.",
      ar: "تطبيق بيرفع المستخدم عليه صور أشعة مقطعية وياخد تحليل من موديل ذكاء اصطناعي في الباكند.",
    },
    longDescription: {
      en: "LungGuard lets users upload CT-scan images, analyzed by a backend server running a PyTorch deep-learning model, served through FastAPI. It grew out of a graduation project on lung cancer prediction.",
      ar: "لانج جارد بيخلي المستخدم يرفع صور أشعة مقطعية، وسيرفر خلفي بيشغّل موديل تعلّم عميق بـ PyTorch عن طريق FastAPI بيحللها. المشروع امتداد لمشروع تخرج في التنبؤ بسرطان الرئة.",
    },
    technologies: ["Flutter", "FastAPI", "PyTorch"],
    accent: "#3B6EA8",
    github: "https://github.com/abdallah-wafeeq/Lung_Guard",
    images: [
      "/projects/lung-guard/11.jpeg",
      "/projects/lung-guard/12.jpeg",
      "/projects/lung-guard/13.jpeg",
      "/projects/lung-guard/14.jpeg",
      "/projects/lung-guard/15.jpeg",
      "/projects/lung-guard/16.jpeg",
    ],
    framed: true,
  },
  {
    slug: "movie-app",
    number: "04",
    title: "Movie App",
    category: { en: "Movie Discovery Application", ar: "تطبيق اكتشاف أفلام" },
    description: {
      en: "A movie discovery app showcasing the latest and most popular titles.",
      ar: "تطبيق لاكتشاف الأفلام بيعرض أحدث وأشهر الأفلام.",
    },
    longDescription: {
      en: "A cross-platform app built with Flutter that showcases the latest and most popular movies by integrating with The Movie Database (TMDB) API.",
      ar: "تطبيق كروس-بلاتفورم مبني بفلاتر بيعرض أحدث وأشهر الأفلام عن طريق ربطه بـ The Movie Database (TMDB) API.",
    },
    technologies: ["Flutter", "TMDB API"],
    accent: "#C4453B",
    github: "https://github.com/abdallah-wafeeq/movie_app",
    images: [
      "/projects/movie-app/11.jpeg",
      "/projects/movie-app/12.jpeg",
      "/projects/movie-app/13.jpeg",
      "/projects/movie-app/14.jpeg",
      "/projects/movie-app/15.jpeg",
    ],
    framed: true,
  },
  {
    slug: "e-shopping",
    number: "05",
    title: "E-Shopping",
    category: { en: "Retail Simulation Application", ar: "تطبيق محاكاة تسوق" },
    description: {
      en: "A shopping simulation with products, categories, product details and a dynamic cart.",
      ar: "محاكاة تسوق فيها منتجات، فئات، تفاصيل منتج، وسلة ديناميكية.",
    },
    longDescription: {
      en: "E-Shopping simulates a modern online shopping experience: product browsing, category filtering, detailed product pages, and a dynamic cart. Built with clean architecture principles and proper state management.",
      ar: "إي-شوبينج بيحاكي تجربة تسوق أونلاين حديثة: تصفح منتجات، فلترة بالفئة، صفحات منتج تفصيلية، وسلة ديناميكية. اتبنى بمبادئ معمارية نظيفة وإدارة حالة صح.",
    },
    technologies: ["Flutter", "Clean Architecture", "State Management"],
    accent: "#D97F3D",
    github: "https://github.com/abdallah-wafeeq/E_shopping_app",
    images: [
      "/projects/e-shopping/11.jpeg",
      "/projects/e-shopping/22.jpeg",
      "/projects/e-shopping/33.jpeg",
      "/projects/e-shopping/44.jpeg",
      "/projects/e-shopping/55.jpeg",
    ],
    framed: true,
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}