"use client";

import { motion } from "framer-motion";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ staggerChildren: 0.12 }}
      className="mb-12 text-center"
    >
      <motion.h2
        variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }}
        className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }}
          className="mt-3 text-lg text-gray-600 dark:text-gray-400"
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div
        variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.7, ease } } }}
        className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-indigo-600 to-purple-500"
      />
    </motion.div>
  );
}
