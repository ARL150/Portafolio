import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://portafolio-sable-beta-42.vercel.app"),
  title: "Abraham Robledo — Desarrollador de Software",
  description:
    "Portafolio de Abraham Robledo, estudiante de Ingeniería en Sistemas (UAA, promedio 9.65) y desarrollador freelance con 2 años construyendo sistemas web a medida para clientes en México.",
  keywords: [
    "Abraham Robledo",
    "desarrollador",
    "software",
    "portafolio",
    "React",
    "Angular",
    "Node.js",
    "Aguascalientes",
    "freelance",
  ],
  openGraph: {
    title: "Abraham Robledo — Desarrollador de Software",
    description:
      "Estudiante de Ingeniería en Sistemas (UAA) y desarrollador freelance especializado en sistemas web y automatización de procesos.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
