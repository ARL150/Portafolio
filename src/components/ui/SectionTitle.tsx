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

// Un solo degradado para todos los títulos del sitio.
const C1 = "#4f46e5"; // índigo
const C2 = "#06b6d4"; // cian
const GRADIENT = `linear-gradient(90deg, ${C1}, ${C2})`;
const RGB1 = "79, 70, 229";

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
        <span
          style={{ borderColor: `rgba(${RGB1},0.35)`, backgroundColor: `rgba(${RGB1},0.1)`, color: C1 }}
          className="inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[11px] tracking-widest"
        >
          <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
            <span style={{ backgroundColor: C1 }} className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
            <span style={{ backgroundColor: C1 }} className="relative inline-flex h-1.5 w-1.5 rounded-full" />
          </span>
          {"<"}{slugify(title)}{" />"}
        </span>
      </motion.div>

      <motion.h2
        variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }}
        style={{ backgroundImage: GRADIENT }}
        className="bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl"
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
        style={{ backgroundImage: GRADIENT, boxShadow: `0 0 14px rgba(${RGB1},0.6)` }}
        className="mx-auto mt-5 h-1.5 w-20 rounded-full"
      />
    </motion.div>
  );
}
