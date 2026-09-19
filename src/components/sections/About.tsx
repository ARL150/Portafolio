"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import Image from "next/image";
import SectionTitle from "@/components/ui/SectionTitle";

const stats = [
  { end: 2,    suffix: "+", label: "Proyectos",    decimals: 0 },
  { end: 2,    suffix: "+", label: "Años exp.",    decimals: 0 },
  { end: 9.65, suffix: "",  label: "Promedio UAA", decimals: 2 },
];

function CountUp({ end, suffix, decimals }: { end: number; suffix: string; decimals: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, end, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(decimals > 0 ? v.toFixed(decimals) : Math.round(v).toString()),
    });
    return controls.stop;
  }, [inView, end, decimals]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}{suffix}
    </span>
  );
}

export default function About() {
  return (
    <section id="sobre-mi" aria-label="Sobre mí" className="px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <SectionTitle
          title="Sobre mí"
          subtitle="Un poco de contexto sobre quién soy y qué me mueve"
        />

        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="flex justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.04, rotate: 1 }}
              transition={{ type: "spring", stiffness: 280 }}
              className="relative h-64 w-64 overflow-hidden rounded-2xl shadow-2xl ring-4 ring-indigo-100 dark:ring-indigo-900/40 sm:h-72 sm:w-72"
            >
              <Image
                src="/images/profile.jpg"
                alt="Abraham Robledo — Foto de perfil"
                fill
                className="object-cover object-top"
                priority
                sizes="(max-width: 640px) 256px, 288px"
              />
              {/* Degradado sutil en la base */}
              <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/20 to-transparent" />
            </motion.div>
          </motion.div>

          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="space-y-5"
          >
            <p className="text-base leading-relaxed text-gray-600 dark:text-gray-400 sm:text-lg">
              Soy estudiante de 9.º semestre de Ingeniería en Sistemas Computacionales en la
              Universidad Autónoma de Aguascalientes, con promedio de 9.65. Cuento con dos años
              desarrollando software a medida para clientes del sector comercial en México,
              cubriendo el ciclo completo: requerimientos, desarrollo, despliegue y mantenimiento.
            </p>
            <p className="text-base leading-relaxed text-gray-600 dark:text-gray-400 sm:text-lg">
              En 2025 realicé un intercambio académico en la Universidad de Granada, España.
              Me apasiona automatizar procesos, construir sistemas útiles y traducir necesidades
              reales en soluciones digitales concretas.
            </p>

            {/* Stats con count-up */}
            <div className="grid grid-cols-3 gap-3 pt-4 sm:gap-4" role="list" aria-label="Estadísticas">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  role="listitem"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                  whileHover={{ scale: 1.06 }}
                  className="text-center rounded-xl bg-gray-50 p-3 dark:bg-gray-800/60 sm:p-4"
                >
                  <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400 sm:text-2xl">
                    <CountUp end={stat.end} suffix={stat.suffix} decimals={stat.decimals} />
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 sm:text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
