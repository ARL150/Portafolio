"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Briefcase } from "lucide-react";
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
          subtitle="Sistemas y tiendas en línea en producción para clientes reales, más proyectos académicos"
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
              {project.image ? (
                <div className="relative border-b border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-gray-900">
                  {/* Barra de navegador */}
                  <div className="flex items-center gap-1.5 px-3 py-2" aria-hidden="true">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                    {project.demo && (
                      <span className="ml-2 min-w-0 flex-1 truncate rounded-md bg-white px-2 py-0.5 text-[11px] text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                        {project.demo.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                      </span>
                    )}
                  </div>
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={project.image}
                      alt={`Captura de ${project.title}${project.client ? " para " + project.client : ""}`}
                      fill
                      sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  {project.status && (
                    <span
                      className={`absolute right-3 top-11 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold shadow-sm backdrop-blur ${
                        project.status === "live"
                          ? "bg-emerald-50/95 text-emerald-700 dark:bg-emerald-950/90 dark:text-emerald-300"
                          : "bg-amber-50/95 text-amber-700 dark:bg-amber-950/90 dark:text-amber-300"
                      }`}
                    >
                      <span className="relative flex h-2 w-2" aria-hidden="true">
                        {project.status === "live" && (
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                        )}
                        <span
                          className={`relative inline-flex h-2 w-2 rounded-full ${
                            project.status === "live" ? "bg-emerald-500" : "bg-amber-500"
                          }`}
                        />
                      </span>
                      {project.status === "live" ? "En producción" : "Próximo lanzamiento"}
                    </span>
                  )}
                </div>
              ) : (
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
              )}

              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {project.title}
                </h3>
                {project.client ? (
                  <p className="mb-2 mt-0.5 flex items-center gap-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400">
                    <Briefcase size={12} aria-hidden="true" />
                    {project.client}
                  </p>
                ) : (
                  <div className="mb-2" />
                )}
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
                      aria-label={`${project.image ? "Visitar sitio" : "Ver demo"} de ${project.title}`}
                      whileHover={{ x: 3 }}
                      className="flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded dark:text-gray-400 dark:hover:text-indigo-400"
                    >
                      <ExternalLink size={15} />
                      {project.image ? "Visitar sitio" : "Demo"}
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
