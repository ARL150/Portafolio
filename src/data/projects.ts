export interface Project {
  title: string;
  description: string;
  stack: string[];
  github?: string;
  demo?: string;
  featured?: boolean;
  /** Cliente o negocio para el que se hizo (proyectos reales). */
  client?: string;
  /** Captura del sitio en /public. */
  image?: string;
  /** "live": sitio publicado. "soon": publicado en modo pre-lanzamiento. */
  status?: "live" | "soon";
}

export const projects: Project[] = [
  {
    title: "Sistema de control de escrituras",
    client: "Notaría Pública No. 32 · Aguascalientes",
    description:
      "Sistema interno a la medida para el control de escrituras, trámites y registro de la notaría. Acceso exclusivo para el personal con usuarios administrados, conexión cifrada y modo claro/oscuro. Sustituyó el control en papel por un flujo digital con historial de cambios.",
    stack: ["Astro", "TypeScript", "Supabase", "PostgreSQL"],
    demo: "https://sistema.notaria32ags.com.mx/",
    image: "/images/projects/notaria32-sistema.webp",
    status: "live",
    featured: true,
  },
  {
    title: "Sitio web institucional",
    client: "Notaría Pública No. 32 · Aguascalientes",
    description:
      "Sitio oficial de una notaría con más de 20 años en Aguascalientes: catálogo de servicios notariales, sección de nosotros, blog, contacto directo por WhatsApp y diseño responsivo.",
    stack: ["Angular", "TypeScript", "CSS"],
    demo: "https://notaria32ags.com.mx/home",
    github: "https://github.com/ARL150/Notaria-32",
    image: "/images/projects/notaria32-sitio.webp",
    status: "live",
    featured: true,
  },
  {
    title: "New Project Store",
    client: "Tienda de moda urbana · Aguascalientes",
    description:
      "Tienda en línea de gorras, ropa, skin care y suplementos con envíos a todo México. Tema personalizado, catálogo por colecciones, pagos con tarjeta y Apple Pay, popup de suscripción con cupón de bienvenida y atención por WhatsApp.",
    stack: ["Shopify", "Liquid", "JavaScript", "CSS"],
    demo: "https://newprojectstore.com.mx/",
    image: "/images/projects/newprojectstore.webp",
    status: "live",
    featured: true,
  },
  {
    title: "Valenne Jewelry",
    client: "Joyería · Xalapa, Veracruz",
    description:
      "Tienda en línea de joyería femenina con envíos a todo México. Identidad visual elegante en tonos dorados y página de pre-lanzamiento con registro de correos e integración con Instagram, lista para abrir su catálogo de anillos, collares, aretes y pulseras.",
    stack: ["Shopify", "Liquid", "JavaScript", "CSS"],
    demo: "https://valenne.com.mx/",
    image: "/images/projects/valenne.webp",
    status: "soon",
    featured: true,
  },
  {
    title: "Softnext",
    description:
      "Mi propio estudio de desarrollo: sistemas web, paneles administrativos, automatización de procesos e integraciones a la medida para negocios. Desde aquí desarrollé los proyectos para Notaría 32, New Project Store y Valenne.",
    stack: ["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "AWS"],
    demo: "https://www.softnext.tech/",
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
