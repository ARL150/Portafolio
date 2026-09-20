"use client";

import { motion } from "framer-motion";
import { Globe, Workflow, CreditCard, ShoppingBag } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import SpotlightCard from "@/components/ui/SpotlightCard";

const services = [
  {
    icon: Globe,
    title: "Desarrollo web completo",
    text: "Construyo aplicaciones de principio a fin: requerimientos, interfaz, backend y despliegue a producción.",
    color: "from-indigo-500 to-blue-500",
  },
  {
    icon: Workflow,
    title: "Automatización de procesos",
    text: "Identifico tareas manuales y repetitivas y las convierto en flujos automáticos que ahorran tiempo.",
    color: "from-purple-500 to-fuchsia-500",
  },
  {
    icon: CreditCard,
    title: "Integración de pagos",
    text: "Experiencia integrando Stripe y pasarelas de pago en sistemas reales que ya operan con clientes.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: ShoppingBag,
    title: "E-commerce & SEO",
    text: "Trabajo con Shopify y Odoo, además de SEO técnico y optimización de catálogos.",
    color: "from-orange-500 to-rose-500",
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
          {services.map(({ icon: Icon, title, text, color }) => (
            <SpotlightCard
              key={title}
              variants={card}
              whileHover={{ y: -6 }}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
            >
              <span
                aria-hidden="true"
                className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${color} text-white shadow-lg`}
              >
                <Icon size={22} />
              </span>
              <h3 className="mb-2 text-base font-semibold text-gray-900 dark:text-white">{title}</h3>
              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">{text}</p>
            </SpotlightCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
