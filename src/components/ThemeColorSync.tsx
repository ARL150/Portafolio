"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

const COLORS = { light: "#ffffff", dark: "#030712" } as const;

export default function ThemeColorSync() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (resolvedTheme !== "light" && resolvedTheme !== "dark") return;
    document
      .querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')
      .forEach((meta) => {
        meta.removeAttribute("media");
        meta.content = COLORS[resolvedTheme];
      });
  }, [resolvedTheme]);

  return null;
}
