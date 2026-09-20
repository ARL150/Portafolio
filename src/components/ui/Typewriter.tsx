"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/** Escribe y borra una lista de frases en bucle. */
export default function Typewriter({ words }: { words: string[] }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const word = words[index];
    let delay = deleting ? 35 : 75;

    if (!deleting && text === word) delay = 1600;
    else if (deleting && text === "") delay = 350;

    const t = setTimeout(() => {
      if (!deleting && text === word) setDeleting(true);
      else if (deleting && text === "") {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      } else {
        setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
      }
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, index, words, reduce]);

  return (
    <>
      <span className="sr-only">{words.join(", ")}</span>
      <span aria-hidden="true">
        {reduce ? words[0] : text}
        <span className="ml-0.5 inline-block w-[2px] animate-pulse bg-indigo-500 align-middle" style={{ height: "1em" }} />
      </span>
    </>
  );
}
