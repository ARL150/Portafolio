/** Monito con laptop. `running` mueve brazos y piernas. */
export default function Runner({ running = true, scale = 1 }: { running?: boolean; scale?: number }) {
  return (
    <svg viewBox="0 0 32 40" width={32 * scale} height={40 * scale} fill="none" stroke="#e0e7ff" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
      <circle cx="16" cy="7" r="5" fill="#e0e7ff" stroke="none" />
      <path d="M16 12 V25" />
      <g className={running ? "runner-arm-a" : ""}><path d="M16 15 L9 21" /></g>
      <g className={running ? "runner-arm-b" : ""}><path d="M16 15 L23 21" /></g>
      <g className={running ? "runner-leg-a" : ""}><path d="M16 25 L10 37" /></g>
      <g className={running ? "runner-leg-b" : ""}><path d="M16 25 L22 37" /></g>
      <rect x="20" y="17" width="9" height="6" rx="1" fill="#818cf8" stroke="none" />
    </svg>
  );
}
