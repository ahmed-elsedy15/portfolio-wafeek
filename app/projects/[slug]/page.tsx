"use client";

import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Github, ExternalLink } from "lucide-react";
import { getProjectBySlug } from "@/data/projects";
import ProjectGallery from "@/components/gallery/ProjectGallery";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/footer/Footer";
import { useLanguage, pick } from "@/context/LanguageContext";
import { ui } from "@/lib/translations";

export default function ProjectPage() {
  const params = useParams<{ slug: string }>();
  const { lang, dir } = useLanguage();
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const Back = dir === "rtl" ? ArrowRight : ArrowLeft;

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 pb-28 pt-32 sm:pt-40">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-1.5 text-sm text-mist transition-colors hover:text-gold-soft"
        >
          <Back size={16} />
          {ui.backToWork[lang]}
        </Link>

        <div className="mt-8 flex flex-col gap-10 sm:flex-row sm:gap-16">
          <div className="sm:w-1/2">
            <ProjectGallery images={project.images} title={project.title} />
          </div>

          <div className="sm:w-1/2">
            <span className="font-display text-sm text-gold-soft">{project.number}</span>
            <h1 className="mt-2 font-display text-4xl uppercase tracking-tight text-paper sm:text-5xl">
              {project.title}
              {project.arabicTitle && <span className="ml-3 text-mist">{project.arabicTitle}</span>}
            </h1>
            <p className="mt-2 text-xs uppercase tracking-[0.15em] text-mist">{pick(project.category, lang)}</p>
            <p className="mt-6 max-w-prose text-sm leading-relaxed text-mist sm:text-base">
              {pick(project.longDescription ?? project.description, lang)}
            </p>

            <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-1.5">
              {project.technologies.map((tech) => (
                <li key={tech} className="text-xs uppercase tracking-[0.1em] text-mist">
                  {tech}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex items-center gap-6">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-paper transition-colors hover:text-teal-soft"
                >
                  <Github size={16} />
                  {ui.viewCode[lang]}
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-paper transition-colors hover:text-teal-soft"
                >
                  <ExternalLink size={16} />
                  {ui.liveApp[lang]}
                </a>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
