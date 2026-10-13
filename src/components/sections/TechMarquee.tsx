"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { technicalSkills } from "@/data/skills";

const tools = Array.from(new Set(technicalSkills.flatMap((c) => c.skills))).filter(
  (s) => s.length <= 22
);
const mid = Math.ceil(tools.length / 2);
const rows = [tools.slice(0, mid), tools.slice(mid)];

function Pill({ label, id, lit, onTouch }: { label: string; id: string; lit: boolean; onTouch: (id: string) => void }) {
  return (
    <motion.li
      role="listitem"
      tabIndex={0}
      onClick={() => onTouch(id)}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onTouch(id)}
      whileHover={{ scale: 1.08, y: -2 }}
      whileTap={{ scale: 0.95 }}
      animate={lit ? { scale: [1, 1.12, 1] } : { scale: 1 }}
      transition={{ duration: 0.35 }}
      className={`cursor-pointer whitespace-nowrap rounded-full border px-5 py-2 text-sm font-medium shadow-sm outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-indigo-500 ${
        lit
          ? "border-indigo-400 bg-indigo-600 text-white shadow-[0_0_18px_rgba(129,140,248,0.75)] dark:border-indigo-300"
          : "border-gray-200 bg-white text-gray-600 hover:border-indigo-300 hover:text-indigo-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-indigo-500 dark:hover:text-indigo-300"
      }`}
    >
      {label}
    </motion.li>
  );
}

function Row({ items, reverse, lit, onTouch }: { items: string[]; reverse?: boolean; lit: Set<string>; onTouch: (id: string) => void }) {
  return (
    <div className="marquee-mask group flex overflow-hidden">
      {[0, 1].map((n) => (
        <ul
          key={n}
          aria-hidden={n === 1 || undefined}
          className={`marquee-track flex shrink-0 items-center gap-3 pr-3 ${reverse ? "marquee-reverse" : ""}`}
        >
          {items.map((t) => {
            const id = `${n}-${t}`;
            return <Pill key={id} id={id} label={t} lit={lit.has(id)} onTouch={onTouch} />;
          })}
        </ul>
      ))}
    </div>
  );
}

export default function TechMarquee() {
  const [lit, setLit] = useState<Set<string>>(new Set());
  const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const onTouch = (id: string) => {
    setLit((prev) => new Set(prev).add(id));
    clearTimeout(timers.current.get(id));
    timers.current.set(
      id,
      setTimeout(() => {
        setLit((prev) => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
      }, 1400)
    );
  };

  return (
    <section aria-label="Tecnologías con las que trabajo" className="space-y-3 py-10">
      <p className="mb-1 text-center text-xs text-gray-400 dark:text-gray-500">Toca una tecnología ✨</p>
      <Row items={rows[0]} lit={lit} onTouch={onTouch} />
      <Row items={rows[1]} reverse lit={lit} onTouch={onTouch} />
    </section>
  );
}
