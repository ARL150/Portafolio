"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { GitHubIcon } from "@/components/ui/Icons";
import SectionTitle from "@/components/ui/SectionTitle";
import Badge from "@/components/ui/Badge";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { projects } from "@/data/projects";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export default function Projects() {
  return (
    <section id="proyectos" aria-label="Proyectos" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          title="Proyectos"
          subtitle="Algunos de los proyectos en los que he trabajado"
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project) => (
            <SpotlightCard
              key={project.title}
              variants={cardVariant}
              whileHover={{ y: -6, scale: 1.015 }}
              transition={{ type: "spring", stiffness: 280 }}
              className="group flex flex-col rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 overflow-hidden"
              aria-label={`Proyecto: ${project.title}`}
            >
              {/* Preview */}
              <div className="h-44 overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 relative">
                <motion.div
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.4 }}
                  className="h-full w-full flex items-center justify-center text-5xl font-bold text-white/25 select-none"
                  aria-hidden="true"
                >
                  {project.title.charAt(0)}
                </motion.div>
                {/* Overlay en hover */}
                <div className="absolute inset-0 bg-indigo-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                  {project.title}
                </h3>
                <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {project.description}
                </p>

                {/* Stack */}
                <div
                  className="mb-4 flex flex-wrap gap-1.5"
                  role="list"
                  aria-label={`Tecnologías usadas en ${project.title}`}
                >
                  {project.stack.map((tech) => (
                    <span key={tech} role="listitem">
                      <Badge>{tech}</Badge>
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4" role="list" aria-label="Links del proyecto">
                  {project.github && (
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      role="listitem"
                      aria-label={`Ver código de ${project.title} en GitHub`}
                      whileHover={{ x: 3 }}
                      className="flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded dark:text-gray-400 dark:hover:text-indigo-400"
                    >
                      <GitHubIcon size={15} />
                      Código
                    </motion.a>
                  )}
                  {project.demo && (
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      role="listitem"
                      aria-label={`Ver demo de ${project.title}`}
                      whileHover={{ x: 3 }}
                      className="flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded dark:text-gray-400 dark:hover:text-indigo-400"
                    >
                      <ExternalLink size={15} />
                      Demo
                    </motion.a>
                  )}
                </div>
              </div>
            </SpotlightCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
