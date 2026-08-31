// app/opengraph-image.tsx
// Next.js App Router special file — auto-served at /opengraph-image
// Generates a 1200x630 OG image for social sharing
import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "Nabil Lambattan — Full-Stack Developer Portfolio"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a0a14 0%, #11111f 50%, #0a0a14 100%)",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(120,119,198,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(120,119,198,0.07) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Purple glow top-right */}
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)",
          }}
        />

        {/* Cyan glow bottom-left */}
        <div
          style={{
            position: "absolute",
            bottom: -100,
            left: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(34,211,238,0.15) 0%, transparent 70%)",
          }}
        />

        {/* Status badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "rgba(139,92,246,0.15)",
            border: "1px solid rgba(139,92,246,0.4)",
            borderRadius: 999,
            padding: "8px 20px",
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#22d3ee",
            }}
          />
          <span style={{ color: "#22d3ee", fontSize: 16, fontWeight: 600, letterSpacing: 1 }}>
            Full-Stack Developer
          </span>
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: 80,
            fontWeight: 800,
            background: "linear-gradient(90deg, #a78bfa 0%, #60a5fa 50%, #22d3ee 100%)",
            backgroundClip: "text",
            color: "transparent",
            letterSpacing: -2,
            marginBottom: 16,
            lineHeight: 1.1,
          }}
        >
          Nabil Lambattan
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 26,
            color: "rgba(255,255,255,0.65)",
            fontWeight: 400,
            textAlign: "center",
            maxWidth: 800,
            marginBottom: 48,
            lineHeight: 1.5,
          }}
        >
          React · Next.js · TypeScript · C# · ASP.NET Core
        </div>

        {/* Tech pills */}
        <div style={{ display: "flex", gap: 12 }}>
          {["React", "Next.js", "C#/.NET", "Node.js", "TypeScript"].map((tech) => (
            <div
              key={tech}
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 8,
                padding: "6px 16px",
                color: "rgba(255,255,255,0.75)",
                fontSize: 16,
                fontWeight: 500,
              }}
            >
              {tech}
            </div>
          ))}
        </div>

        {/* Bottom URL */}
        <div
          style={{
            position: "absolute",
            bottom: 32,
            color: "rgba(255,255,255,0.3)",
            fontSize: 16,
            letterSpacing: 1,
          }}
        >
          nabil-lambattan.vercel.app
        </div>
      </div>
    ),
    { ...size }
  )
}
