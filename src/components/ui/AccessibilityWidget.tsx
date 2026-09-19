"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sun, Zap, RotateCcw, SlidersHorizontal, AlignJustify, Link, Space } from "lucide-react";

type FontSize = "normal" | "large" | "larger";

interface A11ySettings {
  fontSize: FontSize;
  highContrast: boolean;
  reduceMotion: boolean;
  lineHeight: boolean;
  letterSpacing: boolean;
  underlineLinks: boolean;
}

const DEFAULTS: A11ySettings = {
  fontSize: "normal",
  highContrast: false,
  reduceMotion: false,
  lineHeight: false,
  letterSpacing: false,
  underlineLinks: false,
};

function applyToDOM(s: A11ySettings) {
  const root = document.documentElement;
  root.classList.remove("a11y-font-large", "a11y-font-larger");
  if (s.fontSize === "large")  root.classList.add("a11y-font-large");
  if (s.fontSize === "larger") root.classList.add("a11y-font-larger");
  root.classList.toggle("a11y-high-contrast",   s.highContrast);
  root.classList.toggle("a11y-reduce-motion",   s.reduceMotion);
  root.classList.toggle("a11y-line-height",     s.lineHeight);
  root.classList.toggle("a11y-letter-spacing",  s.letterSpacing);
  root.classList.toggle("a11y-underline-links", s.underlineLinks);
}

/* Toggle con tamaños en px para que no se mueva al cambiar font-size */
function Toggle({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      style={{ width: 44, height: 24, flexShrink: 0 }}
      className={`relative rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
        checked ? "bg-indigo-600" : "bg-gray-200 dark:bg-gray-600"
      }`}
    >
      <span
        style={{
          position: "absolute",
          top: 4,
          left: checked ? 24 : 4,
          width: 16,
          height: 16,
          borderRadius: "50%",
          background: "white",
          boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
          transition: "left 0.2s",
        }}
      />
    </button>
  );
}

function Row({ icon, label, checked, onChange }: { icon: React.ReactNode; label: string; checked: boolean; onChange: () => void }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0, overflow: "hidden" }}>
        <span style={{ flexShrink: 0, color: "#9ca3af" }} aria-hidden="true">{icon}</span>
        <span style={{ fontSize: 13, color: "inherit", lineHeight: 1.3 }}>{label}</span>
      </div>
      <Toggle checked={checked} onChange={onChange} label={label} />
    </div>
  );
}

export default function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<A11ySettings>(DEFAULTS);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("a11y");
      if (saved) {
        const parsed = JSON.parse(saved) as A11ySettings;
        setSettings(parsed);
        applyToDOM(parsed);
      }
    } catch {}
  }, []);

  const update = (patch: Partial<A11ySettings>) => {
    const next = { ...settings, ...patch };
    setSettings(next);
    applyToDOM(next);
    localStorage.setItem("a11y", JSON.stringify(next));
  };

  const reset = () => {
    setSettings(DEFAULTS);
    applyToDOM(DEFAULTS);
    localStorage.removeItem("a11y");
  };

  if (!mounted) return null;

  const fontSizes: { id: FontSize; label: string }[] = [
    { id: "normal", label: "A" },
    { id: "large",  label: "A+" },
    { id: "larger", label: "A++" },
  ];

  const activeCount = [
    settings.fontSize !== "normal",
    settings.highContrast,
    settings.reduceMotion,
    settings.lineHeight,
    settings.letterSpacing,
    settings.underlineLinks,
  ].filter(Boolean).length;

  return (
    <div className="fixed bottom-6 right-4 z-50 flex flex-col items-end gap-3 sm:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            role="dialog"
            aria-modal="true"
            aria-label="Panel de accesibilidad"
            /* font-size fijo en px para que NO escale con las opciones de a11y */
            style={{ fontSize: 14, width: "min(272px, calc(100vw - 2rem))" }}
            className="rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-900"
          >
            <div className="p-4">
              {/* Header */}
              <div className="mb-3 flex items-center justify-between">
                <span className="font-semibold text-gray-900 dark:text-white" style={{ fontSize: 14 }}>
                  Accesibilidad
                </span>
                <button
                  onClick={reset}
                  aria-label="Restablecer configuración"
                  className="flex items-center gap-1 rounded-md px-2 py-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                  style={{ fontSize: 12 }}
                >
                  <RotateCcw size={11} aria-hidden="true" />
                  Restablecer
                </button>
              </div>

              <div className="mb-3 h-px bg-gray-100 dark:bg-gray-700" />

              {/* Tamaño de texto */}
              <div className="mb-4">
                <p className="mb-2 font-semibold uppercase tracking-wide text-gray-400" style={{ fontSize: 11 }}>
                  Tamaño de texto
                </p>
                <div
                  role="group"
                  aria-label="Tamaño de texto"
                  style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}
                >
                  {fontSizes.map(({ id, label }) => (
                    <button
                      key={id}
                      onClick={() => update({ fontSize: id })}
                      aria-pressed={settings.fontSize === id}
                      style={{ fontSize: 13, padding: "6px 0", fontWeight: 600 }}
                      className={`rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        settings.fontSize === id
                          ? "bg-indigo-600 text-white shadow-sm"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-3 h-px bg-gray-100 dark:bg-gray-700" />

              {/* Toggles */}
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <p className="font-semibold uppercase tracking-wide text-gray-400" style={{ fontSize: 11 }}>
                  Opciones visuales
                </p>
                <Row icon={<Sun size={15} />}          label="Alto contraste"               checked={settings.highContrast}   onChange={() => update({ highContrast: !settings.highContrast })} />
                <Row icon={<AlignJustify size={15} />} label="Mayor interlineado"           checked={settings.lineHeight}     onChange={() => update({ lineHeight: !settings.lineHeight })} />
                <Row icon={<Space size={15} />}        label="Mayor espaciado entre letras" checked={settings.letterSpacing}  onChange={() => update({ letterSpacing: !settings.letterSpacing })} />
                <Row icon={<Link size={15} />}         label="Subrayar enlaces"             checked={settings.underlineLinks} onChange={() => update({ underlineLinks: !settings.underlineLinks })} />
                <Row icon={<Zap size={15} />}          label="Reducir animaciones"          checked={settings.reduceMotion}   onChange={() => update({ reduceMotion: !settings.reduceMotion })} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón flotante */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        className="relative flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={open ? "Cerrar panel de accesibilidad" : "Abrir panel de accesibilidad"}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X size={20} aria-hidden="true" />
            </motion.span>
          ) : (
            <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <SlidersHorizontal size={20} aria-hidden="true" />
            </motion.span>
          )}
        </AnimatePresence>

        {/* Contador de opciones activas */}
        {activeCount > 0 && !open && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 font-bold text-white"
            style={{ fontSize: 10 }}
            aria-label={`${activeCount} opción${activeCount !== 1 ? "es" : ""} activa${activeCount !== 1 ? "s" : ""}`}
          >
            {activeCount}
          </motion.span>
        )}
      </motion.button>
    </div>
  );
}
