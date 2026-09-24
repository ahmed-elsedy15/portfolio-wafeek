"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { useLanguage } from "@/context/LanguageContext";
import { ui } from "@/lib/translations";
import ProjectExhibit from "@/components/projects/ProjectExhibit";

export default function ProjectsSection() {
  const { lang } = useLanguage();

  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-xs uppercase tracking-[0.2em] text-mist">{ui.nav.projects[lang]}</span>
        <h2 className="mt-2 font-display text-3xl text-paper sm:text-4xl">{ui.selectedWork[lang]}</h2>
        <p className="mt-3 max-w-md text-sm text-mist sm:text-base">{ui.selectedWorkSub[lang]}</p>
      </motion.div>

      <div>
        {projects.map((project, i) => (
          <ProjectExhibit key={project.slug} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
