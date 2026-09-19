import { ImageResponse } from "next/og";

export const alt = "Abraham Robledo — Desarrollador de Software";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #3730a3 0%, #6d28d9 50%, #9333ea 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          padding: "60px",
          position: "relative",
        }}
      >
        {/* Círculo decorativo */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -120,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.06)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -80,
            left: -80,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.04)",
          }}
        />

        {/* Badge disponible */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "rgba(134,239,172,0.2)",
            border: "1px solid rgba(134,239,172,0.4)",
            borderRadius: 100,
            padding: "8px 24px",
            marginBottom: 36,
          }}
        >
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#4ade80" }} />
          <span style={{ color: "#86efac", fontSize: 22, fontWeight: 600 }}>
            Disponible para proyectos
          </span>
        </div>

        {/* Nombre */}
        <div
          style={{
            fontSize: 86,
            fontWeight: 800,
            color: "white",
            letterSpacing: "-3px",
            lineHeight: 1.05,
            textAlign: "center",
          }}
        >
          Abraham Robledo
        </div>

        {/* Título */}
        <div
          style={{
            fontSize: 34,
            color: "rgba(255,255,255,0.75)",
            marginTop: 20,
            textAlign: "center",
          }}
        >
          Desarrollador de Software · Ing. en Sistemas · UAA
        </div>

        {/* Tags stack */}
        <div style={{ display: "flex", gap: 14, marginTop: 44 }}>
          {["React", "Node.js", "Angular", "AWS", "TypeScript"].map((tag) => (
            <div
              key={tag}
              style={{
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: 8,
                padding: "8px 20px",
                color: "white",
                fontSize: 22,
                fontWeight: 500,
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
