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
    title: "Softnext",
    description:
      "Mi propio estudio de desarrollo: sistemas web, paneles administrativos, automatización de procesos e integraciones a la medida para negocios. Incluye el sistema de gestión documental construido para Notaría 32.",
    stack: ["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "AWS"],
    demo: "https://www.softnext.tech/",
    featured: true,
  },
  {
    title: "Sistema de gestión de expedientes",
    description:
      "Plataforma web para registro, búsqueda y seguimiento de expedientes digitales con control de usuarios y estados por documento. Sustituyó el control en papel por un flujo digital con historial de cambios y respaldo automático.",
    stack: ["Angular", "Node.js", "Supabase", "PostgreSQL"],
    github: "https://github.com/ARL150/Notaria-32",
    featured: true,
  },
  {
    title: "NovaPOS",
    description:
      "Proyecto de bases de datos distribuidas: simula una cadena de tiendas con 10 sucursales en 3 nodos primarios más un nodo de recuperación global, replicación automática y control de acceso por roles.",
    stack: ["FastAPI", "Python", "React", "TypeScript", "MongoDB", "Docker"],
    github: "https://github.com/ARL150/NovaPOS",
    featured: true,
  },
  {
    title: "Plataforma de gestión para tienda en línea",
    description:
      "Catálogo de productos, control de inventario y panel de administración de pedidos para un negocio del sector comercial. Integración de pagos con Stripe y optimización SEO con Google Search Console.",
    stack: ["React", "Node.js", "Firebase", "Stripe"],
  },
];
