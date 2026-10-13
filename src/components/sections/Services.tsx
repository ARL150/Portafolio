"use client";

import { motion } from "framer-motion";
import { Globe, Workflow, CreditCard, ShoppingBag } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import SpotlightCard from "@/components/ui/SpotlightCard";

const services = [
  {
    n: "01",
    icon: Globe,
    title: "Desarrollo web completo",
    text: "Construyo aplicaciones de principio a fin: requerimientos, interfaz, backend y despliegue a producción.",
    tags: ["React", "Next.js", "Node.js", "PostgreSQL"],
    color: "from-indigo-500 to-blue-500",
    titleGlow: "group-hover:from-indigo-500 group-hover:to-blue-500",
    glow: "group-hover:shadow-indigo-500/25",
  },
  {
    n: "02",
    icon: Workflow,
    title: "Automatización de procesos",
    text: "Identifico tareas manuales y repetitivas y las convierto en flujos automáticos que ahorran tiempo.",
    tags: ["APIs", "Integraciones", "Flujos internos"],
    color: "from-purple-500 to-fuchsia-500",
    titleGlow: "group-hover:from-purple-500 group-hover:to-fuchsia-500",
    glow: "group-hover:shadow-purple-500/25",
  },
  {
    n: "03",
    icon: CreditCard,
    title: "Integración de pagos",
    text: "Experiencia integrando Stripe y pasarelas de pago en sistemas reales que ya operan con clientes.",
    tags: ["Stripe", "Checkout seguro", "Suscripciones"],
    color: "from-emerald-500 to-teal-500",
    titleGlow: "group-hover:from-emerald-500 group-hover:to-teal-500",
    glow: "group-hover:shadow-emerald-500/25",
  },
  {
    n: "04",
    icon: ShoppingBag,
    title: "E-commerce & SEO",
    text: "Trabajo con Shopify y Odoo, además de SEO técnico y optimización de catálogos.",
    tags: ["Shopify", "Odoo", "Search Console"],
    color: "from-orange-500 to-rose-500",
    titleGlow: "group-hover:from-orange-500 group-hover:to-rose-500",
    glow: "group-hover:shadow-orange-500/25",
  },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const card = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export default function Services() {
  return (
    <section id="servicios" aria-label="Servicios" className="bg-gray-50 px-6 py-24 dark:bg-gray-900/50">
      <div className="mx-auto max-w-6xl">
        <SectionTitle title="Qué puedo aportar" subtitle="Lo que sumo a un equipo desde el primer día" />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {services.map(({ n, icon: Icon, title, text, tags, color, titleGlow, glow }) => (
            <SpotlightCard
              key={title}
              variants={card}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 260 }}
              className={`group relative flex flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white p-7 shadow-sm transition-shadow duration-300 hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800 ${glow}`}
            >
              {/* Número de fondo */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-2 -top-5 select-none text-8xl font-black text-gray-100 transition-colors duration-300 group-hover:text-gray-200 dark:text-gray-700/50 dark:group-hover:text-gray-700"
              >
                {n}
              </span>

              {/* Ícono con halo */}
              <div className="relative mb-6 inline-flex h-14 w-14 items-center justify-center">
                <motion.span
                  aria-hidden="true"
                  animate={{ opacity: [0.35, 0.7, 0.35], scale: [1, 1.15, 1] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${color} blur-md`}
                />
                <span
                  aria-hidden="true"
                  className={`relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${color} text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6`}
                >
                  <Icon size={24} />
                </span>
              </div>

              <h3
                className={`relative mb-2.5 text-xl font-extrabold tracking-tight text-gray-900 transition-all duration-300 group-hover:bg-gradient-to-r ${titleGlow} group-hover:bg-clip-text group-hover:text-transparent dark:text-white`}
              >
                {title}
              </h3>

              <p className="relative mb-5 flex-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                {text}
              </p>

              {/* Tags */}
              <div className="relative flex flex-wrap gap-1.5" role="list" aria-label={`Herramientas de ${title}`}>
                {tags.map((tag) => (
                  <span
                    key={tag}
                    role="listitem"
                    className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-[11px] font-medium text-gray-500 transition-colors duration-300 group-hover:border-transparent group-hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900/60 dark:text-gray-400 dark:group-hover:bg-gray-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
