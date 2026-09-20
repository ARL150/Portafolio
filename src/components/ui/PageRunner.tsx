"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Runner from "@/components/ui/Runner";

const phrases = ["¡Contrátame! 😄", "npm run hire-me", "Sin bugs... casi 🐛", "¡Espérame!", "Café + código ☕"];
const SIZE = 30;

/**
 * Mascota que vive en la página: se pasea en diagonales y zigzag por la pantalla
 * y te sigue cuando haces scroll.
 */
export default function PageRunner() {
  const reduce = useReducedMotion();
  const boxRef = useRef<HTMLDivElement>(null);
  const [running, setRunning] = useState(false);
  const [facing, setFacing] = useState<1 | -1>(1);
  const [say, setSay] = useState<string | null>(null);
  const [hop, setHop] = useState(0);
  const sayTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const phraseIdx = useRef(0);

  useEffect(() => {
    const box = boxRef.current;
    if (!box || reduce) return;

    const vw = () => document.documentElement.clientWidth;
    const pickRy = () => 90 + Math.random() * Math.max(60, window.innerHeight - 96 - 90);
    const maxY = () => document.documentElement.scrollHeight - SIZE - 8;

    let x = 20;
    let ry = window.innerHeight - 96; // altura objetivo relativa a la pantalla
    let y = Math.min(window.scrollY + ry, maxY());
    let targetX = x;
    let nextWander = 0;
    let isRunning = false;
    let dir: 1 | -1 = 1;
    let last = performance.now();
    let lastScroll = window.scrollY;
    let raf = 0;

    box.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    box.style.opacity = "1";

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      const sy = window.scrollY;
      const scrolling = Math.abs(sy - lastScroll) > 0.5;
      lastScroll = sy;
      const targetY = Math.max(0, Math.min(sy + ry, maxY()));
      const dx = targetX - x;
      const dy = targetY - y;
      const dist = Math.hypot(dx, dy);

      if (dist > 3 || scrolling) {
        // más rápido mientras más lejos esté de ti
        const speed = Math.min(1600, Math.max(170, dist * 2.4));
        if (dist > 0) {
          const step = Math.min(dist, speed * dt);
          x += (dx / dist) * step;
          y += (dy / dist) * step;
        }
        if (Math.abs(dx) > 2) {
          const d = dx > 0 ? 1 : -1;
          if (d !== dir) {
            dir = d;
            setFacing(d);
          }
        }
        if (!isRunning) {
          isRunning = true;
          setRunning(true);
        }
        nextWander = 0;
      } else {
        if (isRunning) {
          isRunning = false;
          setRunning(false);
        }
        // parado: espera un rato y elige otro lugar para pasear
        if (!nextWander) nextWander = now + 500 + Math.random() * 1400;
        if (now > nextWander) {
          targetX = 16 + Math.random() * Math.max(40, vw() - SIZE - 32);
          ry = pickRy();
          nextWander = 0;
        }
      }

      // nunca sale de la pantalla: sube y baja junto con el scroll
      const top = sy + 64;
      const bottom = Math.min(sy + window.innerHeight - SIZE - 16, maxY());
      y = Math.max(top, Math.min(y, Math.max(top, bottom)));

      // balanceo perpendicular al avanzar para que el recorrido no sea una recta
      const wob = isRunning ? Math.sin(now / 130) * 5 : 0;
      box.style.transform = `translate3d(${x + wob}px, ${y - Math.abs(wob) * 0.6}px, 0)`;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const onResize = () => {
      targetX = Math.min(targetX, vw() - SIZE - 16);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      clearTimeout(sayTimer.current);
    };
  }, [reduce]);

  if (reduce) return null;

  const onClick = () => {
    setHop((h) => h + 1);
    setSay(phrases[phraseIdx.current++ % phrases.length]);
    clearTimeout(sayTimer.current);
    sayTimer.current = setTimeout(() => setSay(null), 2200);
  };

  return (
    <div
      ref={boxRef}
      style={{ width: SIZE, height: SIZE + 8, opacity: 0 }}
      className="pointer-events-none absolute left-0 top-0 z-[45] will-change-transform"
    >
      <AnimatePresence>
        {say && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.9 }}
            role="status"
            className="absolute bottom-full left-1/2 mb-1 -translate-x-1/2 whitespace-nowrap rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white shadow-lg"
          >
            {say}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        key={hop}
        type="button"
        tabIndex={-1}
        aria-label="Mascota: haz clic para que salte"
        onClick={onClick}
        animate={hop ? { y: [0, -20, 0] } : undefined}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="pointer-events-auto absolute bottom-0 left-0.5 cursor-pointer rounded-lg bg-gray-900 px-0.5 pt-0.5 shadow-lg shadow-black/30 ring-1 ring-indigo-400/60"
        style={{ scaleX: facing }}
      >
        <Runner running={running} scale={0.6} />
      </motion.button>
    </div>
  );
}
