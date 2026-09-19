export interface ExperienceItem {
  type: "work" | "education";
  title: string;
  organization: string;
  location: string;
  period: string;
  description: string;
  bullets?: string[];
}

export const workExperience: ExperienceItem[] = [
  {
    type: "work",
    title: "Desarrollador Freelance",
    organization: "Clientes del sector comercial",
    location: "Aguascalientes, México",
    period: "2024 – Actualidad",
    description: "Desarrollo de sistemas web a medida cubriendo el ciclo completo.",
    bullets: [
      "Sistemas web desde levantamiento de requerimientos hasta despliegue en producción.",
      "Interfaces en React y Angular sobre servicios Node.js con Supabase y Firebase.",
      "Configuración de servidores, dominios y hosting para cada proyecto.",
      "Traducción de necesidades de clientes sin perfil técnico en entregas por etapas.",
    ],
  },
  {
    type: "work",
    title: "Apoyo en Área Tecnológica",
    organization: "Notaría 32",
    location: "Aguascalientes, México",
    period: "2021 – Actualidad",
    description: "Automatización y mejoras tecnológicas en procesos administrativos.",
    bullets: [
      "Automatizó tareas repetitivas del proceso documental, reduciendo tiempos operativos.",
      "Implementó flujos digitales sustituyendo controles manuales en papel.",
      "Soporte y mantenimiento de sistemas internos y equipo de cómputo.",
    ],
  },
  {
    type: "work",
    title: "Asistente de Oficina",
    organization: "Despacho Lic. José de Jesús Robledo Muñoz",
    location: "Aguascalientes, México",
    period: "2019 – 2021",
    description: "Atención al público y apoyo operativo.",
    bullets: [
      "Atención al público y gestión de trámites ante instancias gubernamentales.",
      "Soporte en paquetería Office para la operación diaria del despacho.",
    ],
  },
];

export const education: ExperienceItem[] = [
  {
    type: "education",
    title: "Ingeniería en Sistemas Computacionales",
    organization: "Universidad Autónoma de Aguascalientes",
    location: "Aguascalientes, México",
    period: "2022 – 2026",
    description: "9.º semestre en curso. Promedio general: 9.65 / 10.",
    bullets: [
      "Promedio general: 9.65 / 10.",
      "Enfoque en desarrollo de software, bases de datos y redes.",
    ],
  },
  {
    type: "education",
    title: "Intercambio Académico",
    organization: "Universidad de Granada — E.T.S. de Ingenierías Informática y de Telecomunicación",
    location: "Granada, España",
    period: "2025",
    description: "Intercambio académico internacional.",
    bullets: [
      "Intercambio en la E.T.S. de Ingenierías Informática y de Telecomunicación.",
    ],
  },
  {
    type: "education",
    title: "Educación Media Superior",
    organization: "Colegio Cristóbal Colón",
    location: "Aguascalientes, México",
    period: "2019 – 2022",
    description: "",
    bullets: [],
  },
];
