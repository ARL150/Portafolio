"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink, Clock, Calendar } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import { certifications } from "@/data/certifications";

const colorMap = {
  orange: {
    card:   "border-orange-200 dark:border-orange-800/50",
    icon:   "bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-400",
    badge:  "bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
    accent: "from-orange-500 to-amber-500",
    bar:    "bg-orange-200 dark:bg-orange-800/40",
    link:   "text-orange-600 hover:text-orange-800 dark:text-orange-400 dark:hover:text-orange-200",
  },
  red: {
    card:   "border-red-200 dark:border-red-800/50",
    icon:   "bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400",
    badge:  "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300",
    accent: "from-red-500 to-rose-500",
    bar:    "bg-red-200 dark:bg-red-800/40",
    link:   "text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200",
  },
  blue: {
    card:   "border-blue-200 dark:border-blue-800/50",
    icon:   "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400",
    badge:  "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    accent: "from-blue-500 to-cyan-500",
    bar:    "bg-blue-200 dark:bg-blue-800/40",
    link:   "text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200",
  },
  green: {
    card:   "border-green-200 dark:border-green-800/50",
    icon:   "bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400",
    badge:  "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    accent: "from-green-500 to-emerald-500",
    bar:    "bg-green-200 dark:bg-green-800/40",
    link:   "text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200",
  },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

export default function Certifications() {
  return (
    <section id="certificaciones" aria-label="Certificaciones" className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <SectionTitle
          title="Certificaciones"
          subtitle="Formación oficial y programas de mentoría en tecnología"
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-6 sm:grid-cols-2"
        >
          {certifications.map((cert) => {
            const c = colorMap[cert.color];
            return (
              <motion.article
                key={cert.title}
                variants={cardVariant}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 260 }}
                className={`flex flex-col rounded-2xl border bg-white shadow-sm dark:bg-gray-800 overflow-hidden ${c.card}`}
                aria-label={`Certificación: ${cert.title}`}
              >
                {/* Barra de color superior */}
                <div className={`h-1.5 w-full bg-gradient-to-r ${c.accent}`} aria-hidden="true" />

                <div className="flex flex-1 flex-col p-6">
                  {/* Header */}
                  <div className="mb-4 flex items-start gap-3">
                    <span className={`mt-0.5 shrink-0 rounded-xl p-2.5 ${c.icon}`} aria-hidden="true">
                      <Award size={20} />
                    </span>
                    <div>
                      <h3 className="font-semibold leading-snug text-gray-900 dark:text-white">
                        {cert.title}
                      </h3>
                      <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                        {cert.issuer}
                      </p>
                      {cert.program && (
                        <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500 italic">
                          {cert.program}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Descripción */}
                  <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    {cert.description}
                  </p>

                  {/* Meta info */}
                  <div className="flex flex-wrap items-center gap-3">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${c.badge}`}>
                      <Calendar size={11} aria-hidden="true" />
                      {cert.date}
                    </span>

                    {cert.hours && (
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${c.badge}`}>
                        <Clock size={11} aria-hidden="true" />
                        {cert.hours} horas
                      </span>
                    )}

                    {cert.credentialUrl && (
                      <motion.a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Ver credencial verificada de ${cert.title}`}
                        whileHover={{ x: 3 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className={`ml-auto inline-flex items-center gap-1.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 rounded ${c.link}`}
                      >
                        <ExternalLink size={12} aria-hidden="true" />
                        Ver credencial
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
