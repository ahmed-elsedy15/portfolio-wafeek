import type { Metadata } from "next";
import { Space_Grotesk, Inter, IBM_Plex_Sans_Arabic, Tajawal } from "next/font/google";
import "./globals.css";
import { profile } from "@/data/profile";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";
import CustomCursor from "@/components/cursor/CustomCursor";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const displayAr = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["500", "700"],
  variable: "--font-display-ar",
  display: "swap",
});

const bodyAr = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  variable: "--font-body-ar",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.role.en}`,
  description: profile.tagline.en,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${displayAr.variable} ${bodyAr.variable}`}
    >
      <body className="font-body antialiased" suppressHydrationWarning>
        <ThemeProvider>
          <LanguageProvider>
            <CustomCursor />
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
