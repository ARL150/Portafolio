import { technicalSkills } from "@/data/skills";

const tools = Array.from(new Set(technicalSkills.flatMap((c) => c.skills))).filter(
  (s) => s.length <= 22
);
const mid = Math.ceil(tools.length / 2);
const rows = [tools.slice(0, mid), tools.slice(mid)];

/** Paleta: cada tecnología se queda fija en un solo color propio. */
const palette = [
  { bg: "#6366f1", glow: "rgba(99,102,241,0.55)" },  // índigo
  { bg: "#ec4899", glow: "rgba(236,72,153,0.55)" },  // rosa
  { bg: "#f59e0b", glow: "rgba(245,158,11,0.55)" },  // ámbar
  { bg: "#10b981", glow: "rgba(16,185,129,0.55)" },  // esmeralda
  { bg: "#3b82f6", glow: "rgba(59,130,246,0.55)" },  // azul
  { bg: "#ef4444", glow: "rgba(239,68,68,0.55)" },   // rojo
  { bg: "#8b5cf6", glow: "rgba(139,92,246,0.55)" },  // violeta
  { bg: "#14b8a6", glow: "rgba(20,184,166,0.55)" },  // verde azulado
];

function colorFor(name: string) {
  const hash = Array.from(name).reduce((h, c) => h + c.charCodeAt(0), 0);
  return palette[hash % palette.length];
}

function Row({ items, reverse }: { items: string[]; reverse?: boolean }) {
  return (
    <div className="marquee-mask group flex overflow-hidden">
      {[0, 1].map((n) => (
        <ul
          key={n}
          aria-hidden={n === 1 || undefined}
          className={`marquee-track flex shrink-0 items-center gap-3 pr-3 ${reverse ? "marquee-reverse" : ""}`}
        >
          {items.map((t) => {
            const c = colorFor(t);
            return (
              <li
                key={t}
                tabIndex={0}
                style={{ "--pill-bg": c.bg, "--pill-glow": c.glow } as React.CSSProperties}
                className="tech-pill whitespace-nowrap rounded-full border border-gray-200 bg-white px-5 py-2 text-sm font-medium text-gray-600 shadow-sm outline-none transition-all duration-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
              >
                {t}
              </li>
            );
          })}
        </ul>
      ))}
    </div>
  );
}

export default function TechMarquee() {
  return (
    <section aria-label="Tecnologías con las que trabajo" className="space-y-3 py-10">
      <Row items={rows[0]} />
      <Row items={rows[1]} reverse />
    </section>
  );
}
