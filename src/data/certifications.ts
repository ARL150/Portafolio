export interface Certification {
  title: string;
  issuer: string;
  program?: string;
  date: string;
  hours?: number;
  credentialUrl?: string;
  color: "orange" | "red" | "blue" | "green";
  description: string;
}

export const certifications: Certification[] = [
  {
    title: "AWS Academy Graduate — Cloud Foundations",
    issuer: "Amazon Web Services (AWS Academy)",
    date: "Junio 2026",
    hours: 20,
    credentialUrl: "https://www.credly.com/go/CkYnn8TN",
    color: "orange",
    description:
      "Formación oficial de AWS en fundamentos de cómputo en la nube: infraestructura global, servicios core (EC2, S3, RDS, IAM), arquitectura, seguridad y modelos de precios.",
  },
  {
    title: "Oracle Cloud Foundations",
    issuer: "Oracle",
    program: "Programa de Mentorías Oracle",
    date: "2025",
    color: "red",
    description:
      "Participación en el programa de mentorías de Oracle con enfoque en fundamentos de Oracle Cloud Infrastructure (OCI): conceptos de nube, servicios de cómputo, almacenamiento y redes.",
  },
];
