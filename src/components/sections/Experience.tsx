"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, ChevronRight } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import { workExperience } from "@/data/experience";

const itemVariant = {
  hidden: { opacity: 0, x: -24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

export default function Experience() {
  return (
    <section id="experiencia" aria-label="Experiencia profesional" className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <SectionTitle
          title="Experiencia"
          subtitle="Mi trayectoria profesional"
        />

        <div className="relative" role="list" aria-label="Historial de trabajo">
          {/* Línea animada */}
          <motion.div
            aria-hidden="true"
            initial={{ scaleY: 0, originY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute left-5 top-0 h-full w-px bg-gradient-to-b from-indigo-400 via-indigo-300 to-transparent dark:from-indigo-600 dark:via-indigo-700"
          />

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            transition={{ staggerChildren: 0.15 }}
            className="space-y-8"
          >
            {workExperience.map((item, i) => (
              <motion.div
                key={i}
                variants={itemVariant}
                role="listitem"
                className="relative flex gap-5 pl-14"
              >
                {/* Ícono */}
                <motion.div
                  aria-hidden="true"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.1, type: "spring", stiffness: 280 }}
                  className="absolute left-0 flex h-10 w-10 items-center justify-center rounded-full border-2 border-indigo-200 bg-white dark:border-indigo-700 dark:bg-gray-900"
                >
                  <Briefcase size={16} className="text-indigo-600 dark:text-indigo-400" />
                </motion.div>

                {/* Card */}
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 280 }}
                  className="flex-1 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800"
                >
                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                      <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                        {item.organization}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
                        <time>{item.period}</time>
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <MapPin size={11} aria-hidden="true" />
                        {item.location}
                      </span>
                    </div>
                  </div>

                  {/* Bullets */}
                  {item.bullets && item.bullets.length > 0 && (
                    <ul className="mt-3 space-y-1.5">
                      {item.bullets.map((b, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <ChevronRight size={13} className="mt-0.5 shrink-0 text-indigo-400" aria-hidden="true" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
