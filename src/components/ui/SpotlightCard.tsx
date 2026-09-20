"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

/** Tarjeta con un brillo radial que sigue al cursor. */
export default function SpotlightCard({
  children,
  className,
  ...props
}: Omit<HTMLMotionProps<"article">, "children"> & { children: React.ReactNode }) {
  const x = useMotionValue(-300);
  const y = useMotionValue(-300);
  const px = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const py = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const rotateY = useTransform(px, [-0.5, 0.5], [-6, 6]);
  const rotateX = useTransform(py, [-0.5, 0.5], [6, -6]);
  const background = useMotionTemplate`radial-gradient(320px circle at ${x}px ${y}px, rgba(99,102,241,0.14), transparent 70%)`;

  return (
    <motion.article
      {...props}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left);
        y.set(e.clientY - rect.top);
        px.set((e.clientX - rect.left) / rect.width - 0.5);
        py.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => {
        x.set(-300);
        y.set(-300);
        px.set(0);
        py.set(0);
      }}
      style={{ ...props.style, rotateX, rotateY, transformPerspective: 900 }}
      className={cn("relative", className)}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit]"
        style={{ background }}
      />
      {children}
    </motion.article>
  );
}
