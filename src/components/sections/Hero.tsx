"use client";

import { motion, useMotionTemplate, useMotionValue, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Mail, ArrowRight, Download } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/Icons";
import Button from "@/components/ui/Button";
import Typewriter from "@/components/ui/Typewriter";
import Magnetic from "@/components/ui/Magnetic";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.13, delayChildren: 0.3 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const socialLinks = [
  { href: "https://github.com/ARL150",                        label: "GitHub",             icon: <GitHubIcon size={20} /> },
  { href: "https://linkedin.com/in/abraham-robledo-82a750271", label: "LinkedIn",           icon: <LinkedInIcon size={20} /> },
  { href: "mailto:abrahamrobledo0402@gmail.com",              label: "Correo electrónico",  icon: <Mail size={20} /> },
];

/* Partículas con posiciones fijas (sin Math.random para evitar mismatch SSR) */
const particles = [
  { top: "18%",  left: "8%",   size: 5,  dur: 6,  delay: 0   },
  { top: "72%",  left: "85%",  size: 8,  dur: 8,  delay: 1   },
  { top: "35%",  left: "92%",  size: 4,  dur: 5,  delay: 2   },
  { top: "80%",  left: "12%",  size: 6,  dur: 7,  delay: 0.5 },
  { top: "55%",  left: "50%",  size: 3,  dur: 9,  delay: 3   },
  { top: "10%",  left: "65%",  size: 5,  dur: 6,  delay: 1.5 },
  { top: "90%",  left: "40%",  size: 4,  dur: 8,  delay: 2.5 },
  { top: "25%",  left: "30%",  size: 3,  dur: 5,  delay: 4   },
];

export default function Hero() {
  const mx = useMotionValue(-500);
  const my = useMotionValue(-500);
  const glow = useMotionTemplate`radial-gradient(420px circle at ${mx}px ${my}px, rgba(129,140,248,0.16), transparent 70%)`;

  // Parallax: el contenido sube más lento que el scroll y se desvanece
  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 500], [0, 80]);
  const contentOpacity = useTransform(scrollY, [0, 450], [1, 0.2]);

  return (
    <section
      id="inicio"
      aria-label="Presentación"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
      }}
      className="relative flex min-h-screen flex-col items-center px-4 pt-20 text-center sm:px-6"
    >
      {/* Fondo: manchas + partículas */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div className="absolute inset-0 hidden md:block" style={{ background: glow }} />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.65, 0.4] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-indigo-200/60 blur-3xl dark:bg-indigo-900/30 sm:h-[700px] sm:w-[700px]"
        />
        <motion.div
          animate={{ scale: [1, 1.07, 1], opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-10 right-1/4 h-[350px] w-[350px] rounded-full bg-purple-200/50 blur-3xl dark:bg-purple-900/20 sm:h-[450px] sm:w-[450px]"
        />

        {/* Partículas flotantes */}
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-indigo-400/20 dark:bg-indigo-400/10"
            style={{ top: p.top, left: p.left, width: p.size, height: p.size }}
            animate={{ y: [0, -18, 0], opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: p.dur, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
          />
        ))}
      </div>

      {/* Contenido */}
      <motion.div className="flex flex-1 items-center justify-center pb-16" style={{ y: contentY, opacity: contentOpacity }}>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-3xl w-full"
        >
          {/* Badge disponibilidad */}
          <motion.div variants={item} className="mb-6 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-1.5 text-sm font-medium text-green-700 dark:border-green-800 dark:bg-green-900/30 dark:text-green-400">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              Disponible para proyectos y oportunidades
            </span>
          </motion.div>

          <motion.p variants={item} className="mb-3 text-sm font-medium tracking-widest text-indigo-500 uppercase dark:text-indigo-400">
            Hola, soy
          </motion.p>

          {/* Nombre con gradiente animado */}
          <motion.h1
            variants={item}
            className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-6xl lg:text-7xl"
          >
            Abraham{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent bg-[length:200%] animate-gradient">
                Robledo
              </span>
            </span>
          </motion.h1>

          <motion.h2
            variants={item}
            className="mb-5 text-base font-semibold text-gray-500 dark:text-gray-400 sm:text-lg"
          >
            Desarrollador de Software · Ingeniería en Sistemas Computacionales
          </motion.h2>

          <motion.p variants={item} className="mb-5 min-h-8 text-lg font-semibold text-indigo-600 dark:text-indigo-400 sm:text-xl">
            Construyo{" "}
            <Typewriter words={["sistemas web", "automatización de procesos", "integraciones de pago", "software a medida"]} />
          </motion.p>

          <motion.p
            variants={item}
            className="mb-10 text-base leading-relaxed text-gray-600 dark:text-gray-400 sm:text-lg"
          >
            Estudiante de 9.º semestre en la UAA con dos años desarrollando software a medida
            para clientes en México. Sistemas web, automatización de procesos e integración de pagos.{" "}
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">Promedio: 9.65.</span>
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-col items-center gap-3">
            {/* Fila principal */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Magnetic>
                <Button href="#proyectos" size="lg">
                  Ver proyectos
                </Button>
              </Magnetic>

              {/* CV — botón outline con ícono */}
              <Magnetic>
              <a
                href="/cv.pdf"
                download
                aria-label="Descargar CV en PDF"
                className="group inline-flex items-center gap-2 rounded-lg border-2 border-indigo-600 px-5 py-2.5 text-sm font-semibold text-indigo-600 transition-all hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-indigo-500 dark:hover:text-white"
              >
                <Download size={15} className="transition-transform group-hover:-translate-y-0.5" aria-hidden="true" />
                Descargar CV
              </a>
              </Magnetic>
            </div>

            {/* Contacto sutil debajo */}
            <a
              href="#contacto"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-gray-400 transition-colors hover:text-indigo-600 dark:text-gray-500 dark:hover:text-indigo-400"
            >
              o escríbeme directamente
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>
          </motion.div>

          {/* Redes sociales */}
          <motion.div
            variants={item}
            className="mt-10 flex items-center justify-center gap-6"
            role="list"
            aria-label="Redes sociales"
          >
            {socialLinks.map(({ href, label, icon }) => (
              <motion.a
                key={href}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
                role="listitem"
                whileHover={{ scale: 1.25, y: -3 }}
                whileTap={{ scale: 0.9 }}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 shadow-sm transition-colors hover:border-indigo-500 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-indigo-400 dark:hover:bg-indigo-500"
              >
                {icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Flecha */}
      <motion.div
        aria-hidden="true"
        className="hidden pb-8 pt-2 [@media(min-height:800px)]:block"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <ArrowDown className="text-indigo-500 dark:text-indigo-400" size={24} />
      </motion.div>
    </section>
  );
}
