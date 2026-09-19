"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, CheckCircle } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/Icons";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";

const socialLinks = [
  {
    href: "mailto:abrahamrobledo0402@gmail.com",
    label: "Enviar correo",
    display: "abrahamrobledo0402@gmail.com",
    icon: <Mail size={18} aria-hidden="true" />,
  },
  {
    href: "https://github.com/ARL150",
    label: "Perfil de GitHub",
    display: "github.com/ARL150",
    icon: <GitHubIcon size={18} />,
  },
  {
    href: "https://linkedin.com/in/abraham-robledo-82a750271",
    label: "Perfil de LinkedIn",
    display: "linkedin.com/in/abraham-robledo",
    icon: <LinkedInIcon size={18} />,
  },
];

const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("https://formspree.io/f/xwlpvvgl", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(e.currentTarget))),
      });

      if (res.ok) {
        setStatus("sent");
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section id="contacto" aria-label="Contacto" className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <SectionTitle
          title="Contacto"
          subtitle="¿Tienes un proyecto en mente o quieres conversar? Escríbeme."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="grid gap-8 md:grid-cols-2"
        >
          {/* Info */}
          <div className="space-y-6">
            <p className="text-gray-600 dark:text-gray-400">
              Estoy disponible para oportunidades freelance, posiciones full-time o simplemente
              para charlar sobre tecnología. No dudes en escribirme.
            </p>

            <nav aria-label="Links de contacto">
              <ul className="space-y-4">
                {socialLinks.map(({ href, label, display, icon }) => (
                  <li key={href}>
                    <motion.a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      aria-label={label}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="flex items-center gap-3 text-gray-600 transition-colors hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded dark:text-gray-400 dark:hover:text-indigo-400"
                    >
                      {icon}
                      <span className="text-sm">{display}</span>
                    </motion.a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Formulario */}
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
            aria-label="Formulario de contacto"
          >
            <div>
              <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Nombre <span aria-hidden="true" className="text-red-500">*</span>
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="Tu nombre"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email <span aria-hidden="true" className="text-red-500">*</span>
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="tu@email.com"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Mensaje <span aria-hidden="true" className="text-red-500">*</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={4}
                placeholder="Cuéntame sobre tu proyecto..."
                className={inputClass}
              />
            </div>

            <motion.div whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={status === "sending"}
                aria-label="Enviar mensaje de contacto"
              >
                {status === "sending" && (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                      className="inline-block h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                      aria-hidden="true"
                    />
                    Enviando…
                  </>
                )}
                {status === "sent" && (
                  <>
                    <CheckCircle size={16} aria-hidden="true" />
                    ¡Mensaje enviado!
                  </>
                )}
                {status === "error" && (
                  <>
                    <Send size={16} aria-hidden="true" />
                    Error — intenta de nuevo
                  </>
                )}
                {status === "idle" && (
                  <>
                    <Send size={16} aria-hidden="true" />
                    Enviar mensaje
                  </>
                )}
              </Button>
            </motion.div>
            {status === "sent" && (
              <p role="status" className="text-center text-sm text-green-600 dark:text-green-400">
                Gracias por escribirme, te respondo pronto.
              </p>
            )}
            {status === "error" && (
              <p role="alert" className="text-center text-sm text-red-600 dark:text-red-400">
                Algo salió mal. Puedes escribirme directo a abrahamrobledo0402@gmail.com
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
