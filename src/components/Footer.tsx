"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/Icons";

const socialLinks = [
  {
    href: "https://github.com/ARL150",
    label: "GitHub",
    icon: <GitHubIcon size={18} />,
  },
  {
    href: "https://linkedin.com/in/abraham-robledo-82a750271",
    label: "LinkedIn",
    icon: <LinkedInIcon size={18} />,
  },
  {
    href: "mailto:abrahamrobledo0402@gmail.com",
    label: "Correo electrónico",
    icon: <Mail size={18} aria-hidden="true" />,
  },
];

export default function Footer() {
  return (
    <footer
      role="contentinfo"
      className="border-t border-gray-200 bg-white px-6 py-8 dark:border-gray-800 dark:bg-gray-950"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Abraham Robledo. Todos los derechos reservados.
        </p>

        <nav aria-label="Redes sociales">
          <ul className="flex items-center gap-4" role="list">
            {socialLinks.map(({ href, label, icon }) => (
              <li key={href}>
                <motion.a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-400 transition-colors hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded dark:hover:text-indigo-400"
                >
                  {icon}
                </motion.a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
