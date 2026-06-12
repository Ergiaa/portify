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
  bg: "#edeef6", panel: "#ffffff", ink: "#18182a", sub: "#4a4a66", mute: "#86869e",
  accent: "#5b4bff", line: "#18182a", soft: "#e3e4f1",
  altPink: "#ff45bf", altCyan: "#00b6c7", altGold: "#e8a400",
  fontBody: "'Space Grotesk', sans-serif", fontHead: "'Major Mono Display', monospace", fontMono: "'VT323', monospace",
  radius: 4,
};

const chromeStyle = {
  background: "linear-gradient(162deg,#2a2a45 0%,#9398d8 24%,#3a3a5c 44%,#cf94da 64%,#3a3a5c 86%)",
  WebkitBackgroundClip: "text" as const,
  backgroundClip: "text" as const,
  color: "transparent",
  WebkitTextFillColor: "transparent" as const,
};

export function HeroY2K({ config }: Props) {
  const words = config.heading.split(" ");
  const firstWord = words[0];
  const restWords = words.slice(1).join(" ");

  return (
    <div style={{
      width: "100%", height: "100%", position: "relative", overflow: "hidden",
      background: skin.bg,
      color: skin.ink, fontFamily: skin.fontBody, padding: 40, boxSizing: "border-box",
    }}>
      <style>{`
        @keyframes spinHeroY2K { to { transform: rotate(360deg); } }
        @keyframes sysBlink { 50% { opacity: 0; } }
      `}</style>

      {/* Grid background */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `linear-gradient(rgba(91,75,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(91,75,255,0.05) 1px, transparent 1px)`,
        backgroundSize: "34px 34px", pointerEvents: "none",
      }} />
      {/* Scanlines */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `repeating-linear-gradient(0deg, rgba(24,24,42,0.035) 0px, rgba(24,24,42,0.035) 1px, transparent 1px, transparent 3px)`,
        pointerEvents: "none",
      }} />

      {/* Terminal bar */}
      <div style={{
        position: "relative", zIndex: 2,
        display: "flex", justifyContent: "space-between",
        borderBottom: `1px solid ${skin.accent}`, paddingBottom: 8,
        fontFamily: skin.fontMono, fontSize: 18, color: skin.sub, marginBottom: 28,
      }}>
        <span style={{ color: skin.accent }}>★ portfolio.exe</span>
        <span>{new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })} :: ONLINE</span>
        <span style={{ color: skin.altPink, animation: "sysBlink 1.1s step-end infinite" }}>■</span>
      </div>

      <div style={{ position: "relative", zIndex: 2, display: "grid", gridTemplateColumns: "1fr auto", gap: 40, alignItems: "center" }}>
        <div>
          <p style={{ fontFamily: skin.fontMono, fontSize: 26, margin: "0 0 8px", color: skin.mute }}>
            &gt;&gt; {config.tagline}_
          </p>
          <h1 style={{
            ...chromeStyle,
            fontFamily: skin.fontHead, fontSize: 80, lineHeight: 1, margin: 0,
            letterSpacing: "-0.02em", textTransform: "lowercase",
          }}>
            {firstWord}
          </h1>
          {restWords && (
            <h1 style={{
              ...chromeStyle,
              fontFamily: skin.fontHead, fontSize: 80, lineHeight: 1, margin: 0,
              letterSpacing: "-0.02em", textTransform: "lowercase",
            }}>
              {restWords}
            </h1>
          )}
          <p style={{ marginTop: 24, fontSize: 15, lineHeight: 1.5, maxWidth: 420, color: skin.sub }}>
            {config.subheading}
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
            <a href={config.ctaHref} style={{
              padding: "12px 22px",
              background: skin.accent,
              color: "#fff", fontWeight: 700, fontSize: 13, textDecoration: "none",
              border: `2px solid ${skin.accent}`, borderRadius: skin.radius, letterSpacing: "0.04em",
              boxShadow: `3px 3px 0 ${skin.altPink}`,
              fontFamily: skin.fontBody,
            }}>
              ▶ {config.ctaLabel.toUpperCase()}
            </a>
            <a href={config.cta2Href} style={{
              padding: "12px 22px", color: skin.ink, border: `2px solid ${skin.ink}`,
              borderRadius: skin.radius, fontFamily: skin.fontMono, fontSize: 18,
              textDecoration: "none", background: skin.soft,
              boxShadow: `3px 3px 0 ${skin.altCyan}`,
            }}>
              {config.cta2Label} →
            </a>
          </div>
        </div>

        <div style={{ position: "relative", width: 220, height: 220 }}>
          <div style={{
            position: "absolute", inset: -12, borderRadius: "50%",
            background: `conic-gradient(from 0deg, ${skin.altPink}, ${skin.altCyan}, ${skin.altGold}, ${skin.accent}, ${skin.altPink})`,
            filter: "blur(2px)", animation: "spinHeroY2K 8s linear infinite",
          }} />
          <div style={{
            position: "relative", width: "100%", height: "100%", borderRadius: "50%",
            border: `3px solid ${skin.panel}`, overflow: "hidden", background: skin.bg,
          }}>
            {config.avatarUrl
              ? <img src={config.avatarUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} />
              : <div style={{ width: "100%", height: "100%", background: "#d8d4c8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: skin.mute }}>Photo</div>
            }
          </div>
          <Icons.spark style={{ position: "absolute", top: -20, right: -10, color: skin.accent, width: 20, height: 20 }} />
          <Icons.spark style={{ position: "absolute", bottom: 0, left: -22, color: skin.altGold, width: 14, height: 14 }} />
        </div>
      </div>
    </div>
  );
}
