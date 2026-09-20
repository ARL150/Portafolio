"use client";

import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const links = [
  { label: "Inicio",      href: "#inicio" },
  { label: "Sobre mí",    href: "#sobre-mi" },
  { label: "Habilidades", href: "#habilidades" },
  { label: "Proyectos",   href: "#proyectos" },
  { label: "Experiencia", href: "#experiencia" },
  { label: "Educación",        href: "#educacion" },
  { label: "Certificaciones", href: "#certificaciones" },
  { label: "Contacto",        href: "#contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState("#inicio");

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);

    // Scroll-spy: resalta el link de la sección visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    links.forEach((l) => {
      const el = document.querySelector(l.href);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Skip to content — accesibilidad */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-indigo-600 focus:px-4 focus:py-2 focus:text-white focus:outline-none"
      >
        Ir al contenido principal
      </a>

      <header
        role="banner"
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-gray-200 bg-white/90 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/90"
            : "bg-transparent"
        )}
      >
        <nav
          aria-label="Navegación principal"
          className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
        >
          {/* Logo */}
          <motion.a
            href="#inicio"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-lg font-bold text-indigo-600 dark:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded"
            aria-label="Abraham Robledo — Inicio"
          >
            ARL
          </motion.a>

          {/* Links desktop */}
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hidden items-center gap-6 md:flex"
            role="list"
          >
            {links.map((link, i) => (
              <motion.li
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
              >
                <a
                  href={link.href}
                  aria-current={active === link.href ? "true" : undefined}
                  className={cn(
                    "relative block py-1 text-sm font-medium transition-colors hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded dark:hover:text-indigo-400",
                    active === link.href
                      ? "text-indigo-600 dark:text-indigo-400"
                      : "text-gray-600 dark:text-gray-300"
                  )}
                >
                  {link.label}
                  {active === link.href && (
                    <motion.span
                      layoutId="nav-underline"
                      aria-hidden="true"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-indigo-600 dark:bg-indigo-400"
                    />
                  )}
                </a>
              </motion.li>
            ))}
          </motion.ul>

          {/* Controles derecha */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-3"
          >
            {mounted && (
              <button
                onClick={() => {
                  const root = document.documentElement;
                  root.classList.add("theme-transition");
                  setTheme(theme === "dark" ? "light" : "dark");
                  setTimeout(() => root.classList.remove("theme-transition"), 600);
                }}
                className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                aria-label={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            )}

            <a
              href="/cv.pdf"
              className="hidden rounded-lg border border-indigo-600 px-4 py-1.5 text-sm font-medium text-indigo-600 transition-colors hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-indigo-950 md:inline-flex"
              aria-label="Descargar CV en PDF"
            >
              CV
            </a>

            <button
              onClick={() => setOpen(!open)}
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-400 dark:hover:bg-gray-800 md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </motion.div>
        </nav>

        {/* Menú móvil */}
        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950 md:hidden"
            >
              <ul className="space-y-3 px-6 py-4" role="list">
                {links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block text-sm font-medium text-gray-700 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded dark:text-gray-300 dark:hover:text-indigo-400"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
