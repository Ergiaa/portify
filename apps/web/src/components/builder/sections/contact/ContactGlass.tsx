import { Icons } from "../../shared/Icons";

interface Props {
  config: {
    title: string;
    description?: string;
    availability?: string;
    email: string;
    phone?: string;
    socials: { platform: string; url: string }[];
    variant?: string;
  };
}

const skin = {
  bg: "#eef0f7", panel: "rgba(255,255,255,0.55)", ink: "#241d3a", sub: "#534c70", mute: "#837da0",
  accent: "#6d5cf5", line: "rgba(109,92,245,0.18)", soft: "rgba(255,255,255,0.4)",
  fontBody: "'Plus Jakarta Sans', sans-serif", fontHead: "'Plus Jakarta Sans', sans-serif", fontMono: "'Geist Mono', monospace",
  radius: 20,
  blobA: "rgba(167,139,255,0.45)", blobB: "rgba(120,182,255,0.40)",
};

export function ContactGlass({ config }: Props) {
  return (
    <div style={{
      width: "100%", height: "100%", position: "relative", overflow: "hidden",
      background: skin.bg,
      fontFamily: skin.fontBody, color: skin.ink,
      padding: 36, boxSizing: "border-box",
      display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, alignItems: "center",
    }}>
      <div style={{
        position: "absolute", width: 360, height: 360, borderRadius: "50%",
        background: `radial-gradient(circle, ${skin.blobA} 0%, transparent 70%)`,
        top: -80, left: -60, pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", width: 320, height: 320, borderRadius: "50%",
        background: `radial-gradient(circle, ${skin.blobB} 0%, transparent 70%)`,
        bottom: -80, right: -40, pointerEvents: "none",
      }} />

      <div style={{ position: "relative", zIndex: 2 }}>
        {config.availability && (
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "6px 14px", borderRadius: 999,
            background: "rgba(255,255,255,0.55)", backdropFilter: "blur(14px)",
            border: "1px solid rgba(255,255,255,0.75)", marginBottom: 14,
          }}>
            <span style={{
              width: 8, height: 8, borderRadius: "50%", background: "#4dd884",
              boxShadow: "0 0 0 4px rgba(77,216,132,0.25)",
            }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: skin.ink }}>{config.availability}</span>
          </div>
        )}
        <h2 style={{
          margin: 0, fontSize: 48, fontWeight: 800, letterSpacing: "-0.02em",
          lineHeight: 1.02, color: skin.ink,
        }}>{config.title}.</h2>
        {config.description && (
          <p style={{ marginTop: 14, color: skin.sub, fontSize: 15, lineHeight: 1.55, maxWidth: 360 }}>
            {config.description}
          </p>
        )}
      </div>

      <div style={{
        position: "relative", zIndex: 2,
        background: "rgba(255,255,255,0.55)", backdropFilter: "blur(24px)",
        border: "1px solid rgba(255,255,255,0.75)", borderRadius: 28, padding: 26,
        boxShadow: "0 30px 60px -20px rgba(36,29,58,0.12)",
      }}>
        <a href={`mailto:${config.email}`} style={{
          display: "flex", alignItems: "center", gap: 12, padding: "14px 16px",
          borderRadius: 16, background: skin.accent, color: "#fff", textDecoration: "none",
          fontSize: 14, fontWeight: 600, marginBottom: 10,
        }}>
          <Icons.mail />
          <span style={{ flex: 1 }}>{config.email}</span>
          <Icons.arrowR />
        </a>
        {config.phone && (
          <a href={`tel:${config.phone}`} style={{
            display: "flex", alignItems: "center", gap: 12, padding: "14px 16px",
            borderRadius: 16, background: "rgba(255,255,255,0.55)", color: skin.ink,
            textDecoration: "none", fontSize: 14, fontWeight: 600,
            border: "1px solid rgba(255,255,255,0.75)",
          }}>
            <Icons.phone />
            <span style={{ flex: 1 }}>{config.phone}</span>
            <Icons.arrowR />
          </a>
        )}
        {config.socials.length > 0 && (
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8,
            marginTop: 14, paddingTop: 14, borderTop: `1px solid ${skin.line}`,
          }}>
            {config.socials.map((s, i) => (
              <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" style={{
                padding: "10px 6px", borderRadius: 12,
                background: "rgba(255,255,255,0.55)",
                border: "1px solid rgba(255,255,255,0.75)",
                fontSize: 12, fontWeight: 600, textAlign: "center", color: skin.ink,
                textDecoration: "none",
              }}>{s.platform}</a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
