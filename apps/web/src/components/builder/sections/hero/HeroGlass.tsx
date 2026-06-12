import { Icons } from "../../shared/Icons";

interface Props {
  config: {
    heading: string;
    subheading: string;
    tagline?: string;
    avatarUrl?: string;
    ctaLabel: string;
    ctaHref: string;
    cta2Label?: string;
    cta2Href?: string;
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

export function HeroGlass({ config }: Props) {
  return (
    <div style={{
      width: "100%", height: "100%", position: "relative", overflow: "hidden",
      background: skin.bg,
      fontFamily: skin.fontBody, color: skin.ink,
      padding: 48, boxSizing: "border-box", display: "flex", alignItems: "center", gap: 40,
    }}>
      {/* Blob decorations */}
      <div style={{
        position: "absolute", width: 420, height: 420, borderRadius: "50%",
        background: `radial-gradient(circle, ${skin.blobA} 0%, transparent 70%)`,
        top: -100, left: -80, pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", width: 360, height: 360, borderRadius: "50%",
        background: `radial-gradient(circle, ${skin.blobB} 0%, transparent 70%)`,
        bottom: -120, right: -60, pointerEvents: "none",
      }} />

      <div style={{ position: "relative", zIndex: 2, flexShrink: 0 }}>
        <div style={{
          width: 240, height: 240, borderRadius: "50%",
          background: "rgba(255,255,255,0.55)", backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.75)",
          padding: 10, boxShadow: "0 30px 60px -20px rgba(36,29,58,0.2)",
          overflow: "hidden",
        }}>
          {config.avatarUrl
            ? <img src={config.avatarUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} />
            : <div style={{ width: "100%", height: "100%", background: "#d8d4c8", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: skin.mute }}>Photo</div>
          }
        </div>
      </div>

      <div style={{
        position: "relative", zIndex: 2, flex: 1,
        padding: 36, borderRadius: 28,
        background: "rgba(255,255,255,0.55)", backdropFilter: "blur(24px)",
        border: "1px solid rgba(255,255,255,0.75)",
        boxShadow: "0 30px 60px -20px rgba(36,29,58,0.15), inset 0 1px 0 rgba(255,255,255,0.8)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4dd884", boxShadow: "0 0 0 4px rgba(77,216,132,0.25)", flexShrink: 0 }} />
          <span style={{ fontSize: 12, fontWeight: 500, color: skin.ink }}>Available for new projects</span>
        </div>
        <p style={{ margin: "0 0 6px", fontSize: 14, fontWeight: 500, color: skin.mute }}>{config.tagline}</p>
        <h1 style={{ margin: 0, fontSize: 56, fontWeight: 800, lineHeight: 1.02, letterSpacing: "-0.03em", color: skin.ink }}>
          {config.heading}.
        </h1>
        <p style={{ margin: "16px 0 24px", fontSize: 15, lineHeight: 1.55, color: skin.sub, maxWidth: 420 }}>
          {config.subheading}
        </p>
        <div style={{ display: "flex", gap: 10 }}>
          <a href={config.ctaHref} style={{
            padding: "13px 22px", borderRadius: 999, background: skin.accent, color: "#fff",
            fontSize: 13, fontWeight: 600, textDecoration: "none",
            boxShadow: "0 8px 20px -6px rgba(109,92,245,0.45)",
            display: "inline-flex", alignItems: "center", gap: 8,
          }}>
            {config.ctaLabel} <Icons.arrowR />
          </a>
          <a href={config.cta2Href} style={{
            padding: "13px 22px", borderRadius: 999,
            background: "rgba(255,255,255,0.55)", color: skin.ink, fontSize: 13, fontWeight: 600,
            textDecoration: "none", border: "1px solid rgba(255,255,255,0.75)",
          }}>
            {config.cta2Label}
          </a>
        </div>
      </div>
    </div>
  );
}
