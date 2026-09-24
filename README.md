# Abdallah Wafeeq — Portfolio

A cinematic, 3D-forward Next.js portfolio for a Flutter developer — real Three.js phone showcase, an interactive technology orbit, bilingual (Arabic/English, full RTL), and a custom cursor.

## Stack
Next.js 15 (App Router) · TypeScript · Tailwind CSS · Framer Motion · React Three Fiber / drei / three.js · Lucide React

## Getting started
```bash
npm install
npm run dev
```
Open http://localhost:3000

The first build needs internet access to fetch the Google Fonts (Space Grotesk, Inter, IBM Plex Sans Arabic, Tajawal) — normal on your machine or on any hosting provider (Vercel, etc.), it just isn't available inside the sandbox this was built in.

## What's inside
- **Hero** — cinematic full-bleed background, film grain, ambient light blobs, a 3D pointer-tilt profile photo, CV download.
- **About** — editorial "ABOUT / THE / DEVELOPER" typography with floating metadata tags and the "02+ years" stat.
- **Skills** — a real Three.js "Technology Orbit": FLUTTER at the center, your stack orbiting it, hover for a description. Falls back to a horizontal tap-to-reveal track on mobile (`components/skills/`).
- **Projects** — the flagship section: each project renders as a real, lit, procedurally-modeled 3D smartphone (`components/three/PhoneModel.tsx`) that floats, rotates gently, and auto-cycles through that project's screenshots. Manual arrows + dots included. (`components/projects/ProjectExhibit.tsx`)
- **Journey** — large outlined year numbers instead of a plain timeline.
- **Design** — a small "DESIGN MEETS DEVELOPMENT" section reflecting your graphic-design background.
- **Contact** — huge editorial "LET'S BUILD SOMETHING." closing scene.
- **Navigation** — minimal floating nav, numbered sections, a thin scroll-progress bar, and a fullscreen mobile menu.
- **Custom cursor** — desktop only, shows VIEW / GITHUB / OPEN depending on what's under it (`components/cursor/CustomCursor.tsx`). Automatically off on touch devices.

## Adding your images
Drop screenshots into `public/projects/<slug>/`, named to match the `images` array in `data/projects.ts` — the phone showcase and gallery both render however many you list, in order:
- `public/projects/athar/` (already pointed at `1.jpeg` … `5.jpeg`)
- `public/projects/nourish-parent/`
- `public/projects/lung-guard/`
- `public/projects/movie-app/`
- `public/projects/e-shopping/`

Also:
- Hero background → `public/images/hero/background.webp`
- Profile photo → `public/images/profile/profile.webp`
- CV → already bundled at `public/cv/Abdallah-Wafeeq-CV.pdf` (swap the file to update it; the download button points at `profile.cv` in `data/profile.ts`)

## Editing content
- `data/profile.ts` — identity, tagline, bio, CV path, experience, years of experience
- `data/projects.ts` — all project data, including each project's accent color used on the 3D phone's rim light
- `data/skills.ts` — the technology-orbit nodes and their hover descriptions
- `lib/translations.ts` — every piece of UI copy, in English and Arabic

## Performance note
The 3D phone and the technology orbit are both dynamically imported with `ssr: false` and only mount client-side. On very old/low-power phones you can lower `dpr` in `components/three/PhoneScene.tsx` or skip the orbit's desktop Canvas branch if you want a lighter mobile experience than the current tap-to-reveal fallback.
