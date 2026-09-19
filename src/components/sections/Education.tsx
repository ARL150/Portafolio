"use client";

import { motion } from "framer-motion";
import { GraduationCap, MapPin, ChevronRight, Star, ExternalLink } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import { education } from "@/data/experience";

const itemVariant = {
  hidden: { opacity: 0, x: -24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

const institutionMeta: Record<string, { url?: string; badge?: string; badgeColor?: string }> = {
  "Universidad Autónoma de Aguascalientes": {
    url: "https://www.uaa.mx/portal/",
    badge: "Promedio: 9.65 / 10",
  },
  "Universidad de Granada — E.T.S. de Ingenierías Informática y de Telecomunicación": {
    url: "https://etsiit.ugr.es/",
    badge: "Top 300 mundial — QS Rankings",
    badgeColor: "emerald",
  },
};

export default function Education() {
  return (
    <section
      id="educacion"
      aria-label="Formación académica"
      className="bg-gray-50 px-6 py-24 dark:bg-gray-900/50"
    >
      <div className="mx-auto max-w-3xl">
        <SectionTitle
          title="Educación"
          subtitle="Mi formación académica"
        />

        <div className="relative" role="list" aria-label="Historial académico">
          {/* Línea animada */}
          <motion.div
            aria-hidden="true"
            initial={{ scaleY: 0, originY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute left-5 top-0 h-full w-px bg-gradient-to-b from-violet-400 via-violet-300 to-transparent dark:from-violet-600 dark:via-violet-700"
          />

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            transition={{ staggerChildren: 0.15 }}
            className="space-y-8"
          >
            {education.map((item, i) => {
              const meta = institutionMeta[item.organization];
              const isEmerald = meta?.badgeColor === "emerald";

              return (
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
                    className="absolute left-0 flex h-10 w-10 items-center justify-center rounded-full border-2 border-violet-200 bg-white dark:border-violet-700 dark:bg-gray-900"
                  >
                    <GraduationCap size={16} className="text-violet-600 dark:text-violet-400" />
                  </motion.div>

                  {/* Card */}
                  <motion.div
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 280 }}
                    className="flex-1 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800"
                  >
                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {item.title}
                        </h3>

                        {/* Nombre institución + link opcional */}
                        {meta?.url ? (
                          <a
                            href={meta.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sm font-medium text-violet-600 hover:text-violet-800 hover:underline focus:outline-none focus:ring-2 focus:ring-violet-500 rounded dark:text-violet-400 dark:hover:text-violet-200"
                            aria-label={`Visitar sitio de ${item.organization}`}
                          >
                            {item.organization}
                            <ExternalLink size={12} aria-hidden="true" />
                          </a>
                        ) : (
                          <p className="text-sm font-medium text-violet-600 dark:text-violet-400">
                            {item.organization}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">
                          <time>{item.period}</time>
                        </span>
                        <span className="flex items-center gap-1 text-xs text-gray-400">
                          <MapPin size={11} aria-hidden="true" />
                          {item.location}
                        </span>
                      </div>
                    </div>

                    {/* Badge especial por institución */}
                    {meta?.badge && (
                      <div
                        className={`mt-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                          isEmerald
                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                            : "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
                        }`}
                      >
                        <Star size={12} aria-hidden="true" />
                        {meta.badge}
                      </div>
                    )}

                    {/* Bullets */}
                    {item.bullets && item.bullets.filter((b) => !b.includes("9.65")).length > 0 && (
                      <ul className="mt-3 space-y-1.5">
                        {item.bullets
                          .filter((b) => !b.includes("9.65"))
                          .map((b, j) => (
                            <li
                              key={j}
                              className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"
                            >
                              <ChevronRight
                                size={13}
                                className="mt-0.5 shrink-0 text-violet-400"
                                aria-hidden="true"
                              />
                              {b}
                            </li>
                          ))}
                      </ul>
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
