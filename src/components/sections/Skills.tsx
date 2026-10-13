"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2, Monitor, Database, Brain, MessageSquare,
  Globe, Users, ChevronRight, ShoppingBag, Server, Megaphone,
} from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import SpotlightCard from "@/components/ui/SpotlightCard";
import Badge from "@/components/ui/Badge";
import { technicalSkills, softSkills, languages } from "@/data/skills";

const categoryIcons: Record<string, React.ReactNode> = {
  "Lenguajes":                    <Code2 size={20} />,
  "Frontend":                     <Monitor size={20} />,
  "Backend & Bases de datos":     <Database size={20} />,
  "E-commerce & CRM":             <ShoppingBag size={20} />,
  "Cloud & Infraestructura":      <Server size={20} />,
  "Marketing Digital & SEO":      <Megaphone size={20} />,
  "Comunicación & Clientes":      <MessageSquare size={20} />,
  "Trabajo & Gestión":            <Brain size={20} />,
  "Colaboración & Crecimiento":   <Users size={20} />,
};

/** Degradado propio por categoría, a juego con el resto del sitio. */
const categoryGradients: Record<string, string> = {
  "Lenguajes":                    "from-blue-500 to-cyan-500",
  "Frontend":                     "from-violet-500 to-purple-500",
  "Backend & Bases de datos":     "from-emerald-500 to-teal-500",
  "E-commerce & CRM":             "from-green-500 to-emerald-500",
  "Cloud & Infraestructura":      "from-orange-500 to-amber-500",
  "Marketing Digital & SEO":      "from-rose-500 to-pink-500",
  "Comunicación & Clientes":      "from-pink-500 to-fuchsia-500",
  "Trabajo & Gestión":            "from-indigo-500 to-blue-500",
  "Colaboración & Crecimiento":   "from-amber-500 to-orange-500",
};

const tabs = [
  { id: "tecnicas", label: "Técnicas", icon: <Code2 size={15} /> },
  { id: "blandas",  label: "Blandas",  icon: <Brain size={15} /> },
  { id: "idiomas",  label: "Idiomas",  icon: <Globe size={15} /> },
] as const;

type TabId = typeof tabs[number]["id"];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

/** Nivel aproximado para la barra de idiomas. */
function levelPercent(level: string, native?: boolean) {
  if (native) return 100;
  if (/C1|C2|avanzado/i.test(level)) return 85;
  if (/B1|B2|intermedio/i.test(level)) return 62;
  if (/A1|A2|básico/i.test(level)) return 35;
  return 50;
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState<TabId>("tecnicas");

  return (
    <section id="habilidades" aria-label="Habilidades" className="bg-gray-50 px-6 py-24 dark:bg-gray-900/50">
      <div className="mx-auto max-w-5xl">
        <SectionTitle
          title="Habilidades"
          subtitle="Tecnologías, herramientas y competencias con las que trabajo"
        />

        {/* Tabs */}
        <div
          role="tablist"
          aria-label="Categorías de habilidades"
          className="mb-10 flex justify-center gap-2"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`tabpanel-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                activeTab === tab.id
                  ? "text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              {activeTab === tab.id && (
                <motion.span
                  layoutId="skills-tab-pill"
                  aria-hidden="true"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  className="absolute inset-0 rounded-full bg-indigo-600 shadow-md shadow-indigo-200 dark:shadow-indigo-900/30"
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {tab.icon}
                {tab.label}
              </span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Tab: Técnicas */}
          {activeTab === "tecnicas" && (
            <motion.div
              key="tecnicas"
              id="tabpanel-tecnicas"
              role="tabpanel"
              aria-label="Habilidades técnicas"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid gap-5 sm:grid-cols-2"
              >
                {technicalSkills.map((cat) => (
                  <SpotlightCard
                    key={cat.category}
                    variants={cardVariant}
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 260 }}
                    className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800"
                  >
                    {/* Header con ícono en degradado */}
                    <div className="mb-4 flex items-center justify-between gap-2.5">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`inline-flex items-center justify-center rounded-xl bg-gradient-to-br p-2.5 text-white shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 ${
                            categoryGradients[cat.category] ?? "from-gray-500 to-gray-600"
                          }`}
                          aria-hidden="true"
                        >
                          {categoryIcons[cat.category] ?? <ChevronRight size={18} />}
                        </span>
                        <h3 className="font-semibold text-gray-800 dark:text-white">
                          {cat.category}
                        </h3>
                      </div>
                      <span className="shrink-0 rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] font-medium text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                        {cat.skills.length}
                      </span>
                    </div>

                    {/* Badges */}
                    <div
                      className="flex flex-wrap gap-2"
                      role="list"
                      aria-label={`Tecnologías de ${cat.category}`}
                    >
                      {cat.skills.map((skill) => (
                        <motion.span key={skill} whileHover={{ scale: 1.08, y: -1 }} role="listitem">
                          <Badge>{skill}</Badge>
                        </motion.span>
                      ))}
                    </div>
                  </SpotlightCard>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* Tab: Blandas */}
          {activeTab === "blandas" && (
            <motion.div
              key="blandas"
              id="tabpanel-blandas"
              role="tabpanel"
              aria-label="Habilidades blandas"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid gap-5 sm:grid-cols-2"
              >
                {softSkills.map((cat) => (
                  <SpotlightCard
                    key={cat.category}
                    variants={cardVariant}
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 260 }}
                    className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800"
                  >
                    <div className="mb-4 flex items-center gap-2.5">
                      <span
                        className={`inline-flex items-center justify-center rounded-xl bg-gradient-to-br p-2.5 text-white shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 ${
                          categoryGradients[cat.category] ?? "from-gray-500 to-gray-600"
                        }`}
                        aria-hidden="true"
                      >
                        {categoryIcons[cat.category] ?? <Brain size={20} />}
                      </span>
                      <h3 className="font-semibold text-gray-800 dark:text-white">
                        {cat.category}
                      </h3>
                    </div>

                    <ul className="space-y-2">
                      {cat.skills.map((skill) => (
                        <motion.li
                          key={skill}
                          whileHover={{ x: 4 }}
                          transition={{ type: "spring", stiffness: 300 }}
                          className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"
                        >
                          <ChevronRight
                            size={14}
                            className="mt-0.5 shrink-0 text-indigo-500"
                            aria-hidden="true"
                          />
                          {skill}
                        </motion.li>
                      ))}
                    </ul>
                  </SpotlightCard>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* Tab: Idiomas */}
          {activeTab === "idiomas" && (
            <motion.div
              key="idiomas"
              id="tabpanel-idiomas"
              role="tabpanel"
              aria-label="Idiomas"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="mx-auto max-w-md"
            >
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="space-y-4"
              >
                {languages.map((l) => {
                  const pct = levelPercent(l.level, l.native);
                  return (
                    <SpotlightCard
                      key={l.lang}
                      variants={cardVariant}
                      whileHover={{ y: -3 }}
                      transition={{ type: "spring", stiffness: 260 }}
                      className="rounded-2xl border border-gray-200 bg-white px-6 py-4 shadow-sm transition-shadow duration-300 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800"
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span
                            className="inline-flex items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-blue-500 p-2 text-white shadow-md"
                            aria-hidden="true"
                          >
                            <Globe size={18} />
                          </span>
                          <span className="font-semibold text-gray-800 dark:text-white">{l.lang}</span>
                        </div>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            l.native
                              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                              : "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                          }`}
                        >
                          {l.level}
                        </span>
                      </div>

                      {/* Barra de nivel */}
                      <div
                        className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700"
                        role="progressbar"
                        aria-label={`Nivel de ${l.lang}`}
                        aria-valuenow={pct}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      >
                        <motion.div
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
                          style={{ width: `${pct}%`, originX: 0 }}
                          className={`h-full rounded-full bg-gradient-to-r ${
                            l.native ? "from-emerald-500 to-teal-400" : "from-indigo-500 to-blue-400"
                          }`}
                        />
                      </div>

                      <p className="mt-3 text-xs italic text-gray-400 dark:text-gray-500">{l.fact}</p>
                    </SpotlightCard>
                  );
                })}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
