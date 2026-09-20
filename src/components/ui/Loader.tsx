"use client";

import { useEffect, useState } from "react";
import Runner from "@/components/ui/Runner";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const lines = [
  { at: 4,  cmd: "whoami",                 out: "abraham_robledo" },
  { at: 22, cmd: "cat rol.txt",            out: "Ingeniería en Sistemas Computacionales" },
  { at: 42, cmd: "load --stack",           out: "react · next.js · typescript · node · sql" },
  { at: 66, cmd: "check --cloud",          out: "aws · oracle cloud · vercel  [OK]" },
  { at: 86, cmd: "run portfolio.exe",      out: "compilando experiencias..." },
];

/** Pantalla de entrada estilo terminal; se retira sola (o con clic). */
export default function Loader() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(true);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const total = reduce ? 500 : 5200;
    const start = performance.now();
    let closer: ReturnType<typeof setTimeout>;
    const tick = setInterval(() => {
      const p = Math.min(100, ((performance.now() - start) / total) * 100);
      // curva ease-out para que arranque rápido y "sufra" al final
      setPct(Math.round(100 * (1 - Math.pow(1 - p / 100, 1.8))));
      if (p >= 100) {
        clearInterval(tick);
        closer = setTimeout(() => setShow(false), 550);
      }
    }, 30);
    return () => {
      clearInterval(tick);
      clearTimeout(closer);
      document.body.style.overflow = "";
    };
  }, [reduce]);

  useEffect(() => {
    if (!show) document.body.style.overflow = "";
  }, [show]);

  const done = pct >= 100;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="status"
          aria-label="Cargando portafolio"
          onClick={() => setShow(false)}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[200] flex cursor-pointer items-center justify-center overflow-hidden bg-gray-950 px-4"
        >
          {/* Fondo: rejilla + resplandor */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(#818cf8 1px, transparent 1px), linear-gradient(90deg, #818cf8 1px, transparent 1px)",
              backgroundSize: "44px 44px",
              maskImage: "radial-gradient(circle at center, #000 20%, transparent 70%)",
            }}
          />
          <motion.div
            aria-hidden="true"
            animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute h-[420px] w-[420px] rounded-full bg-indigo-600/25 blur-3xl"
          />

          <div className="relative w-full max-w-xl">
            {/* Ventana de terminal */}
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="overflow-hidden rounded-xl border border-white/10 bg-gray-900/80 shadow-2xl shadow-indigo-900/30 backdrop-blur"
            >
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
                <span className="h-3 w-3 rounded-full bg-red-500/80" />
                <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <span className="h-3 w-3 rounded-full bg-green-500/80" />
                <span className="ml-3 font-mono text-xs text-gray-500">abraham@portfolio: ~</span>
              </div>

              <div className="min-h-[220px] space-y-2 p-5 font-mono text-[13px] leading-relaxed sm:text-sm">
                {lines.map((l) =>
                  pct >= l.at ? (
                    <motion.div
                      key={l.cmd}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <p>
                        <span className="text-green-400">$</span>{" "}
                        <span className="text-gray-200">{l.cmd}</span>
                      </p>
                      <p className="pl-4 text-indigo-300">{l.out}</p>
                    </motion.div>
                  ) : null
                )}
                {!done && (
                  <span className="inline-block h-4 w-2 animate-pulse bg-green-400 align-middle" />
                )}
                {done && (
                  <motion.p
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text pt-1 font-bold text-transparent"
                  >
                    ✔ Acceso concedido — Bienvenido
                  </motion.p>
                )}
              </div>
            </motion.div>

            {/* Barra de carga con brillo */}
            <div className="mt-6">
              <div className="mb-10 flex items-center justify-between font-mono text-xs text-gray-400">
                <span className="tracking-widest text-indigo-300">ARL_OS v2.0</span>
                <span className="tabular-nums text-white">{pct}%</span>
              </div>
              <div className="relative">
                {/* Monito corriendo sobre la barra */}
                <div
                  aria-hidden="true"
                  className={`absolute bottom-full -mb-0.5 ${done ? "runner-done" : ""}`}
                  style={{ left: `calc(${pct}% - 16px)`, transition: "left 100ms linear" }}
                >
                  <Runner running={!done} />
                </div>
              <div className="relative h-2.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="relative h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-[0_0_18px_rgba(168,85,247,0.8)] transition-[width] duration-100 ease-linear"
                  style={{ width: `${pct}%` }}
                >
                  <span className="loader-shine absolute inset-0" />
                </div>
              </div>
              </div>
              <p className="mt-3 text-center font-mono text-[11px] text-gray-500">clic para saltar</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
