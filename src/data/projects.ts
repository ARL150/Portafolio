export interface Project {
  title: string;
  description: string;
  stack: string[];
  github?: string;
  demo?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    title: "Sistema de gestión de expedientes",
    description:
      "Plataforma web para registro, búsqueda y seguimiento de expedientes digitales con control de usuarios y estados por documento. Sustituyó el control en papel por un flujo digital con historial de cambios y respaldo automático.",
    stack: ["Angular", "Node.js", "Supabase", "PostgreSQL"],
    github: "https://github.com/ARL150",
    featured: true,
  },
  {
    title: "Plataforma de gestión para tienda en línea",
    description:
      "Catálogo de productos, control de inventario y panel de administración de pedidos para un negocio del sector comercial. Integración de pagos con Stripe y optimización SEO con Google Search Console.",
    stack: ["React", "Node.js", "Firebase", "Stripe"],
    github: "https://github.com/ARL150",
    featured: true,
  },
];
