"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";
import { technicalSkills, softSkills, languages } from "@/data/skills";
import { projects } from "@/data/projects";
import { workExperience, education } from "@/data/experience";
import { certifications } from "@/data/certifications";

type Tone = "plain" | "title" | "muted" | "ok" | "err" | "accent";
type Line = { text: string; tone?: Tone };
type Entry = { id: number; cmd: string; lines: Line[] };

const toneClass: Record<Tone, string> = {
  plain:  "text-gray-200",
  title:  "font-bold text-indigo-300",
  muted:  "text-gray-500",
  ok:     "text-green-400",
  err:    "text-red-400",
  accent: "text-pink-300",
};

const email = "abrahamrobledo0402@gmail.com";

const commands: Record<string, () => Line[]> = {
  help: () => [
    { text: "Comandos disponibles:", tone: "title" },
    { text: "  about        quién soy" },
    { text: "  skills       habilidades técnicas" },
    { text: "  soft         habilidades blandas e idiomas" },
    { text: "  projects     proyectos" },
    { text: "  experience   experiencia laboral" },
    { text: "  education    formación académica" },
    { text: "  certs        certificaciones" },
    { text: "  contact      cómo contactarme" },
    { text: "  cv           descargar mi CV en PDF" },
    { text: "  clear        limpiar la terminal" },
    { text: "  (hay un comando secreto... pista: sudo)", tone: "muted" },
  ],
  about: () => [
    { text: "Abraham Robledo", tone: "title" },
    { text: "Estudiante de 9.º semestre de Ingeniería en Sistemas Computacionales (UAA)." },
    { text: "Dos años desarrollando software a medida para clientes en México:" },
    { text: "sistemas web, automatización de procesos e integración de pagos." },
    { text: "Promedio: 9.65", tone: "ok" },
  ],
  skills: () =>
    technicalSkills.flatMap((c) => [
      { text: c.category, tone: "title" as const },
      { text: "  " + c.skills.join(" · ") },
    ]),
  soft: () => [
    ...softSkills.flatMap((c) => [
      { text: c.category, tone: "title" as const },
      ...c.skills.map((s) => ({ text: "  ▸ " + s })),
    ]),
    { text: "Idiomas", tone: "title" },
    ...languages.map((l) => ({ text: `  ▸ ${l.lang}: ${l.level}` })),
  ],
  projects: () =>
    projects.flatMap((p) => [
      { text: p.title, tone: "title" as const },
      { text: "  " + p.description },
      { text: "  stack: " + p.stack.join(", "), tone: "accent" as const },
    ]),
  experience: () =>
    workExperience.flatMap((e) => [
      { text: `${e.title} @ ${e.organization}`, tone: "title" as const },
      { text: `  ${e.period} · ${e.location}`, tone: "muted" as const },
      ...(e.bullets ?? [e.description]).map((b) => ({ text: "  ▸ " + b })),
    ]),
  education: () =>
    education.flatMap((e) => [
      { text: `${e.title} — ${e.organization}`, tone: "title" as const },
      { text: `  ${e.period}`, tone: "muted" as const },
    ]),
  certs: () => certifications.map((c) => ({ text: "✔ " + c.title, tone: "ok" as const })),
  contact: () => [
    { text: "Hablemos:", tone: "title" },
    { text: "  correo    " + email },
    { text: "  github    github.com/ARL150" },
    { text: "  linkedin  linkedin.com/in/abraham-robledo-82a750271" },
  ],
};

const chips = ["help", "about", "skills", "projects", "experience", "certs", "contact", "cv"];

const welcome: Entry = {
  id: 0,
  cmd: "",
  lines: [
    { text: "Bienvenido a mi CV interactivo 👋", tone: "title" },
    { text: "Escribe un comando (prueba 'help') o toca uno de los botones de abajo.", tone: "muted" },
  ],
};

export default function InteractiveCV() {
  const [entries, setEntries] = useState<Entry[]>([welcome]);
  const [value, setValue] = useState("");
  const [past, setPast] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextId = useRef(1);

  const scrollDown = () =>
    requestAnimationFrame(() => {
      const el = bodyRef.current;
      if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    });

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    setPast((p) => [...p, cmd]);
    setCursor(-1);

    if (cmd === "clear") {
      setEntries([]);
      return;
    }

    let lines: Line[];
    if (cmd === "cv") {
      const a = document.createElement("a");
      a.href = "/cv.pdf";
      a.download = "CV-Abraham-Robledo.pdf";
      a.click();
      lines = [{ text: "Descargando cv.pdf ...  ✔", tone: "ok" }];
    } else if (cmd === "sudo hire-me" || cmd === "sudo hire me") {
      lines = [
        { text: "[sudo] verificando credenciales de reclutador...", tone: "muted" },
        { text: "✔ Permiso concedido", tone: "ok" },
        { text: "Abraham Robledo fue añadido a tu equipo con éxito 🚀", tone: "accent" },
        { text: "Siguiente paso: escribe 'contact' y hablemos." },
      ];
    } else if (cmd.startsWith("sudo")) {
      lines = [{ text: "Casi... prueba con: sudo hire-me", tone: "accent" }];
    } else if (cmd === "ls") {
      lines = [{ text: Object.keys(commands).concat("cv").join("   ") }];
    } else if (cmd === "whoami") {
      lines = [{ text: "un futuro ingeniero que quiere trabajar contigo 😎", tone: "accent" }];
    } else if (commands[cmd]) {
      lines = commands[cmd]();
    } else {
      lines = [{ text: `comando no encontrado: ${cmd}. Escribe 'help'.`, tone: "err" }];
    }

    setEntries((e) => [...e, { id: nextId.current++, cmd: raw.trim(), lines }]);
    scrollDown();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp" && past.length) {
      e.preventDefault();
      const i = cursor === -1 ? past.length - 1 : Math.max(0, cursor - 1);
      setCursor(i);
      setValue(past[i]);
    } else if (e.key === "ArrowDown" && cursor !== -1) {
      e.preventDefault();
      const i = cursor + 1;
      if (i >= past.length) {
        setCursor(-1);
        setValue("");
      } else {
        setCursor(i);
        setValue(past[i]);
      }
    }
  };

  return (
    <section id="cv-interactivo" aria-label="CV interactivo" className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <SectionTitle
          title="Explora mi CV"
          subtitle="Escríbele a la terminal como si fuera mi currículum"
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-xl border border-gray-800 bg-gray-950 shadow-2xl shadow-indigo-500/10"
          onClick={() => inputRef.current?.focus({ preventScroll: true })}
        >
          {/* Barra superior */}
          <div className="flex items-center gap-2 border-b border-white/10 bg-gray-900 px-4 py-2.5">
            <span className="h-3 w-3 rounded-full bg-red-500/80" aria-hidden="true" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/80" aria-hidden="true" />
            <span className="h-3 w-3 rounded-full bg-green-500/80" aria-hidden="true" />
            <span className="ml-3 font-mono text-xs text-gray-500">abraham@cv: ~</span>
          </div>

          {/* Salida */}
          <div
            ref={bodyRef}
            role="log"
            aria-live="polite"
            className="h-[360px] space-y-4 overflow-y-auto p-5 font-mono text-[13px] leading-relaxed sm:text-sm"
          >
            {entries.map((en) => (
              <motion.div key={en.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
                {en.cmd && (
                  <p>
                    <span className="text-green-400">$</span> <span className="text-white">{en.cmd}</span>
                  </p>
                )}
                {en.lines.map((l, i) => (
                  <p key={i} className={`whitespace-pre-wrap break-words ${toneClass[l.tone ?? "plain"]}`}>
                    {l.text}
                  </p>
                ))}
              </motion.div>
            ))}
          </div>

          {/* Entrada */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              run(value);
              setValue("");
            }}
            className="flex items-center gap-2 border-t border-white/10 px-5 py-3 font-mono text-sm"
          >
            <label htmlFor="cv-input" className="sr-only">Escribe un comando</label>
            <span className="text-green-400" aria-hidden="true">$</span>
            <input
              id="cv-input"
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={onKeyDown}
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              placeholder="escribe 'help'..."
              className="min-w-0 flex-1 bg-transparent text-white placeholder-gray-600 caret-green-400 outline-none"
            />
          </form>

          {/* Atajos */}
          <div className="flex flex-wrap gap-2 border-t border-white/10 bg-gray-900/60 px-5 py-3">
            {chips.map((c) => (
              <motion.button
                key={c}
                type="button"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                onClick={(e) => {
                  e.stopPropagation();
                  run(c);
                }}
                className="rounded-md border border-indigo-500/40 bg-indigo-500/10 px-3 py-1 font-mono text-xs text-indigo-200 transition-colors hover:bg-indigo-500/30 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                {c}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
