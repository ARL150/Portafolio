"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2, Monitor, Database, Brain, MessageSquare,
  Globe, Users, ChevronRight, ShoppingBag, Server, Megaphone,
} from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import Badge from "@/components/ui/Badge";
import { technicalSkills, softSkills, languages } from "@/data/skills";

const categoryIcons: Record<string, React.ReactNode> = {
  "Lenguajes":                    <Code2 size={18} />,
  "Frontend":                     <Monitor size={18} />,
  "Backend & Bases de datos":     <Database size={18} />,
  "E-commerce & CRM":             <ShoppingBag size={18} />,
  "Cloud & Infraestructura":      <Server size={18} />,
  "Marketing Digital & SEO":      <Megaphone size={18} />,
  "Comunicación & Clientes":      <MessageSquare size={18} />,
  "Trabajo & Gestión":            <Brain size={18} />,
  "Colaboración & Crecimiento":   <Users size={18} />,
};

const categoryColors: Record<string, string> = {
  "Lenguajes":                    "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  "Frontend":                     "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
  "Backend & Bases de datos":     "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  "E-commerce & CRM":             "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  "Cloud & Infraestructura":      "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
  "Marketing Digital & SEO":      "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
  "Comunicación & Clientes":      "bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300",
  "Trabajo & Gestión":            "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300",
  "Colaboración & Crecimiento":   "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
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
                  <motion.div
                    key={cat.category}
                    variants={cardVariant}
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 260 }}
                    className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800"
                  >
                    {/* Header con ícono */}
                    <div className="mb-4 flex items-center gap-2.5">
                      <span
                        className={`inline-flex items-center justify-center rounded-lg p-2 ${
                          categoryColors[cat.category] ?? "bg-gray-100 text-gray-600"
                        }`}
                        aria-hidden="true"
                      >
                        {categoryIcons[cat.category] ?? <ChevronRight size={18} />}
                      </span>
                      <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
                        {cat.category}
                      </h3>
                    </div>

                    {/* Badges */}
                    <div
                      className="flex flex-wrap gap-2"
                      role="list"
                      aria-label={`Tecnologías de ${cat.category}`}
                    >
                      {cat.skills.map((skill) => (
                        <motion.span key={skill} whileHover={{ scale: 1.07 }} role="listitem">
                          <Badge>{skill}</Badge>
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
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
                  <motion.div
                    key={cat.category}
                    variants={cardVariant}
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 260 }}
                    className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800"
                  >
                    <div className="mb-4 flex items-center gap-2.5">
                      <span
                        className={`inline-flex items-center justify-center rounded-lg p-2 ${
                          categoryColors[cat.category] ?? "bg-gray-100 text-gray-600"
                        }`}
                        aria-hidden="true"
                      >
                        {categoryIcons[cat.category] ?? <Brain size={18} />}
                      </span>
                      <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
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
                  </motion.div>
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
                {languages.map((l) => (
                  <motion.div
                    key={l.lang}
                    variants={cardVariant}
                    whileHover={{ y: -3 }}
                    transition={{ type: "spring", stiffness: 260 }}
                    className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-6 py-4 shadow-sm dark:border-gray-700 dark:bg-gray-800"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="inline-flex items-center justify-center rounded-lg bg-indigo-100 p-2 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300"
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
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
