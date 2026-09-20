import { technicalSkills } from "@/data/skills";

const tools = Array.from(new Set(technicalSkills.flatMap((c) => c.skills))).filter(
  (s) => s.length <= 22
);
const mid = Math.ceil(tools.length / 2);
const rows = [tools.slice(0, mid), tools.slice(mid)];

function Row({ items, reverse }: { items: string[]; reverse?: boolean }) {
  return (
    <div className="marquee-mask group flex overflow-hidden">
      {[0, 1].map((n) => (
        <ul
          key={n}
          aria-hidden={n === 1 || undefined}
          className={`marquee-track flex shrink-0 items-center gap-3 pr-3 ${reverse ? "marquee-reverse" : ""}`}
        >
          {items.map((t) => (
            <li
              key={t}
              className="whitespace-nowrap rounded-full border border-gray-200 bg-white px-5 py-2 text-sm font-medium text-gray-600 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
            >
              {t}
            </li>
          ))}
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
