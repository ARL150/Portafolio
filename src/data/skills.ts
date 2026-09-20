export interface SkillCategory {
  category: string;
  skills: string[];
}

export const technicalSkills: SkillCategory[] = [
  {
    category: "Lenguajes",
    skills: ["JavaScript", "TypeScript", "Python", "C++", "HTML5", "CSS3"],
  },
  {
    category: "Frontend",
    skills: ["React", "Angular", "React Native", "Next.js", "Tailwind CSS"],
  },
  {
    category: "Backend & Bases de datos",
    skills: ["Node.js", "Express", "SQL", "Supabase", "Firebase", "PostgreSQL", "REST APIs"],
  },
  {
    category: "E-commerce & CRM",
    skills: ["Shopify", "Odoo", "Stripe", "Integración de pagos en línea"],
  },
  {
    category: "Cloud & Infraestructura",
    skills: ["AWS (Cloud Foundations)", "Oracle Cloud Infrastructure", "Vercel", "Servidores VPS", "cPanel", "Dominios y hosting", "Linux", "Git", "GitHub"],
  },
  {
    category: "Marketing Digital & SEO",
    skills: ["Meta Ads", "Google Search Console", "SEO técnico", "Optimización de catálogos"],
  },
];

export const softSkills: SkillCategory[] = [
  {
    category: "Comunicación & Clientes",
    skills: [
      "Comunicación con clientes sin perfil técnico",
      "Traducción de requerimientos a especificaciones funcionales",
      "Gestión de expectativas y entregas por etapas",
      "Escucha activa",
      "Empatía con el cliente",
      "Comunicación asertiva",
      "Documentación clara de lo que construyo",
    ],
  },
  {
    category: "Trabajo & Gestión",
    skills: [
      "Trabajo autónomo y gestión del ciclo completo de proyectos",
      "Resolución de problemas técnicos complejos",
      "Aprendizaje autodidacta continuo",
      "Iniciativa propia",
      "Atención al detalle",
      "Orientado a resultados",
      "Trabajo bajo presión",
      "Adaptabilidad",
      "Pensamiento crítico",
      "Gestión del tiempo y priorización",
      "Organización",
    ],
  },
  {
    category: "Colaboración & Crecimiento",
    skills: [
      "Trabajo en equipo",
      "Colaboración con equipos multidisciplinarios",
      "Apertura a la retroalimentación",
      "Creatividad para resolver problemas",
      "Responsabilidad y compromiso",
      "Curiosidad por nuevas tecnologías",
    ],
  },
];

export const languages: { lang: string; level: string; native?: boolean }[] = [
  { lang: "Español", level: "Nativo", native: true },
  { lang: "Inglés",  level: "Intermedio (B1 / B2)" },
];
