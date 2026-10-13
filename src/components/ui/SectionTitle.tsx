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

/** Cada título se queda con un color propio, fijo según su texto. */
const palette: [string, string][] = [
  ["#6366f1", "#ec4899"], // índigo → rosa
  ["#3b82f6", "#06b6d4"], // azul → cian
  ["#10b981", "#14b8a6"], // esmeralda → verde azulado
  ["#f59e0b", "#ef4444"], // ámbar → rojo
  ["#8b5cf6", "#ec4899"], // violeta → rosa
  ["#06b6d4", "#3b82f6"], // cian → azul
  ["#f97316", "#ec4899"], // naranja → rosa
  ["#14b8a6", "#6366f1"], // verde azulado → índigo
];

function hexToRgb(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
}

function themeFor(title: string) {
  const hash = Array.from(title).reduce((h, c) => h + c.charCodeAt(0), 0);
  const [c1, c2] = palette[hash % palette.length];
  return { c1, c2, rgb1: hexToRgb(c1) };
}

export default function SectionTitle({ title, subtitle }: SectionTitleProps) {
  const { c1, c2, rgb1 } = themeFor(title);

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
          style={{ borderColor: `rgba(${rgb1},0.35)`, backgroundColor: `rgba(${rgb1},0.1)`, color: c1 }}
          className="inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[11px] tracking-widest"
        >
          <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
            <span style={{ backgroundColor: c1 }} className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
            <span style={{ backgroundColor: c1 }} className="relative inline-flex h-1.5 w-1.5 rounded-full" />
          </span>
          {"<"}{slugify(title)}{" />"}
        </span>
      </motion.div>

      <motion.h2
        variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }}
        style={{ backgroundImage: `linear-gradient(90deg, ${c1}, ${c2})` }}
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
        style={{ backgroundImage: `linear-gradient(90deg, ${c1}, ${c2})`, boxShadow: `0 0 14px rgba(${rgb1},0.6)` }}
        className="mx-auto mt-5 h-1.5 w-20 rounded-full"
      />
    </motion.div>
  );
}
