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

export function HeroGlass({ config }: Props) {
  return (
    <div style={{
      width: "100%", height: "100%", position: "relative", overflow: "hidden",
      background: "linear-gradient(135deg,#ecdeff 0%,#fde4f5 50%,#d8efff 100%)",
      fontFamily: "Plus Jakarta Sans, sans-serif", color: "#241a3a",
      padding: 48, boxSizing: "border-box", display: "flex", alignItems: "center", gap: 40,
      borderBottom: "1px solid rgba(255,255,255,0.55)",
    }}>
      <div style={{
        position: "absolute", width: 360, height: 360, borderRadius: "50%",
        background: "radial-gradient(circle,#ff8ec7 0%, transparent 70%)",
        top: -80, right: -60, filter: "blur(30px)", opacity: 0.7,
      }} />
      <div style={{
        position: "absolute", width: 300, height: 300, borderRadius: "50%",
        background: "radial-gradient(circle,#7eb6ff 0%, transparent 70%)",
        bottom: -100, left: 120, filter: "blur(20px)", opacity: 0.65,
      }} />
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence baseFrequency='0.9'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.25'/></svg>\")",
        mixBlendMode: "overlay", opacity: 0.5, pointerEvents: "none",
      }} />

      <div style={{ position: "relative", zIndex: 2, flexShrink: 0 }}>
        <div style={{
          width: 240, height: 240, borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(255,255,255,0.4), rgba(255,255,255,0.1))",
          backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.5)",
          padding: 10, boxShadow: "0 30px 60px -20px rgba(50,30,90,0.3)",
          overflow: "hidden",
        }}>
          {config.avatarUrl
            ? <img src={config.avatarUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} />
            : <div style={{ width: "100%", height: "100%", background: "#d8d4c8", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#888" }}>Photo</div>
          }
        </div>
      </div>

      <div style={{
        position: "relative", zIndex: 2, flex: 1,
        padding: 36, borderRadius: 28,
        background: "rgba(255,255,255,0.35)",
        backdropFilter: "blur(24px)",
        border: "1px solid rgba(255,255,255,0.6)",
        boxShadow: "0 30px 60px -20px rgba(50,30,90,0.25), inset 0 1px 0 rgba(255,255,255,0.8)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4dd884", boxShadow: "0 0 0 4px rgba(77,216,132,0.25)", flexShrink: 0 }} />
          <span style={{ fontSize: 12, fontWeight: 500, color: "#241a3a" }}>Available for new projects</span>
        </div>
        <p style={{ margin: "0 0 6px", fontSize: 14, fontWeight: 500, color: "#6e5a8a" }}>{config.tagline}</p>
        <h1 style={{ margin: 0, fontSize: 56, fontWeight: 800, lineHeight: 1.02, letterSpacing: "-0.03em", color: "#241a3a" }}>
          {config.heading}.
        </h1>
        <p style={{ margin: "16px 0 24px", fontSize: 15, lineHeight: 1.55, color: "#3d2f5c", maxWidth: 420 }}>
          {config.subheading}
        </p>
        <div style={{ display: "flex", gap: 10 }}>
          <a href={config.ctaHref} style={{
            padding: "13px 22px", borderRadius: 999, background: "#241a3a", color: "#fff",
            fontSize: 13, fontWeight: 600, textDecoration: "none",
            boxShadow: "0 8px 20px -6px rgba(36,26,58,0.5)",
            display: "inline-flex", alignItems: "center", gap: 8,
          }}>
            {config.ctaLabel} <Icons.arrowR />
          </a>
          <a href={config.cta2Href} style={{
            padding: "13px 22px", borderRadius: 999,
            background: "rgba(255,255,255,0.5)", color: "#241a3a", fontSize: 13, fontWeight: 600,
            textDecoration: "none", border: "1px solid rgba(255,255,255,0.7)",
          }}>
            {config.cta2Label}
          </a>
        </div>
      </div>
    </div>
  );
}
