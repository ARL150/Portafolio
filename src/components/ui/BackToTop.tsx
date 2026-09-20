"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { ArrowUp } from "lucide-react";

/** Botón de volver arriba con anillo de progreso de lectura. */
export default function BackToTop() {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="#inicio"
          aria-label="Volver arriba"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          className="fixed bottom-6 left-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-white text-indigo-600 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-indigo-400"
        >
          <svg aria-hidden="true" viewBox="0 0 48 48" className="absolute inset-0 -rotate-90">
            <circle cx="24" cy="24" r="21" fill="none" strokeWidth="3" className="stroke-gray-200 dark:stroke-gray-700" />
            <motion.circle
              cx="24" cy="24" r="21" fill="none" strokeWidth="3" strokeLinecap="round"
              className="stroke-indigo-500"
              style={{ pathLength: scrollYProgress }}
            />
          </svg>
          <ArrowUp size={18} aria-hidden="true" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
