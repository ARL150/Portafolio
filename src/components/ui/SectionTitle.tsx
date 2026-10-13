"use client";

import { motion } from "framer-motion";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

/** "Habilidades" → "habilidades"; "E-commerce & SEO" → "e-commerce-seo" */
function slugify(title: string) {
  return title
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ staggerChildren: 0.12 }}
      className="mb-12 text-center"
    >
      {/* Kicker estilo etiqueta de código */}
      <motion.div
        variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } } }}
        className="mb-3 flex justify-center"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 font-mono text-[11px] tracking-widest text-indigo-600 dark:border-indigo-800/60 dark:bg-indigo-950/40 dark:text-indigo-300">
          <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-indigo-500" />
          </span>
          {"<"}{slugify(title)}{" />"}
        </span>
      </motion.div>

      <motion.h2
        variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }}
        className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }}
          className="mt-3 text-lg text-gray-600 dark:text-gray-400"
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div
        variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.7, ease } } }}
        className="mx-auto mt-5 h-1.5 w-20 rounded-full bg-gradient-to-r from-indigo-600 to-purple-500 shadow-[0_0_14px_rgba(129,140,248,0.6)]"
      />
    </motion.div>
  );
}
