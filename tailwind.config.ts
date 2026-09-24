import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        "ink-raised": "rgb(var(--color-ink-raised) / <alpha-value>)",
        "ink-line": "rgb(var(--color-ink-line) / <alpha-value>)",
        paper: "rgb(var(--color-paper) / <alpha-value>)",
        mist: "rgb(var(--color-mist) / <alpha-value>)",
        gold: "rgb(var(--color-gold) / <alpha-value>)",
        "gold-soft": "rgb(var(--color-gold-soft) / <alpha-value>)",
        teal: "rgb(var(--color-teal) / <alpha-value>)",
        "teal-soft": "rgb(var(--color-teal-soft) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      maxWidth: {
        prose: "68ch",
      },
    },
  },
  plugins: [],
};

export default config;
