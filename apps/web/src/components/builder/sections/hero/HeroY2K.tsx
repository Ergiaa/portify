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

export function HeroY2K({ config }: Props) {
  const words = config.heading.split(" ");
  const firstWord = words[0];
  const restWords = words.slice(1).join(" ");

  const chromeStyle = {
    background: "linear-gradient(180deg,#fff,#c9d4ff,#6e8fff)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  };

  return (
    <div style={{
      width: "100%", height: "100%", position: "relative", overflow: "hidden",
      background: "linear-gradient(135deg,#0a0a16 0%,#12122a 40%,#0a0a16 100%)",
      color: "#fff", fontFamily: "Space Grotesk, sans-serif", padding: 40, boxSizing: "border-box",
    }}>
      <style>{"@keyframes spinHero { to { transform: rotate(360deg); } }"}</style>

      <div style={{
        position: "absolute", inset: 0,
        background: "repeating-linear-gradient(0deg, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 1px, transparent 1px, transparent 3px)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
        backgroundSize: "40px 40px", pointerEvents: "none",
      }} />

      <div style={{
        position: "relative", zIndex: 2, display: "flex", justifyContent: "space-between",
        fontFamily: "VT323, monospace", fontSize: 18, color: "#c7d3ff", marginBottom: 28,
      }}>
        <span>★ portfolio.exe</span>
        <span>{new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })} :: ONLINE</span>
        <span>[_] [□] [×]</span>
      </div>

      <div style={{ position: "relative", zIndex: 2, display: "grid", gridTemplateColumns: "1fr auto", gap: 40, alignItems: "center" }}>
        <div>
          <p style={{ fontFamily: "VT323, monospace", fontSize: 26, margin: "0 0 8px", color: "#ffce5b" }}>
            &gt;&gt; {config.tagline}_
          </p>
          <h1 style={{
            ...chromeStyle,
            fontFamily: "Major Mono Display, monospace", fontSize: 80, lineHeight: 1, margin: 0,
            letterSpacing: "-0.03em", textShadow: "0 4px 30px rgba(110,143,255,0.6)",
            textTransform: "lowercase",
          }}>
            {firstWord}
          </h1>
          <h1 style={{
            ...chromeStyle,
            fontFamily: "Major Mono Display, monospace", fontSize: 80, lineHeight: 1, margin: 0,
            letterSpacing: "-0.03em", textShadow: "0 4px 30px rgba(255,138,225,0.6)",
            textTransform: "lowercase",
          }}>
            {restWords}
          </h1>
          <p style={{ marginTop: 24, fontSize: 15, lineHeight: 1.5, maxWidth: 420, color: "rgba(255,255,255,0.85)" }}>
            {config.subheading}
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
            <a href={config.ctaHref} style={{
              padding: "12px 22px",
              background: "linear-gradient(180deg, #fff, #c9d4ff 60%, #6e8fff)",
              color: "#0a0a16", fontWeight: 700, fontSize: 13, textDecoration: "none",
              border: "2px solid #fff", borderRadius: 4, letterSpacing: "0.04em",
              boxShadow: "4px 4px 0 #ff7af2, 0 0 30px rgba(110,143,255,0.6)",
            }}>
              ▶ {config.ctaLabel.toUpperCase()}
            </a>
            <a href={config.cta2Href} style={{
              padding: "12px 22px", color: "#fff", border: "2px solid #fff",
              borderRadius: 4, fontFamily: "VT323, monospace", fontSize: 18,
              textDecoration: "none", background: "rgba(255,255,255,0.06)",
            }}>
              {config.cta2Label} →
            </a>
          </div>
        </div>

        <div style={{ position: "relative", width: 220, height: 220 }}>
          <div style={{
            position: "absolute", inset: -12, borderRadius: "50%",
            background: "conic-gradient(from 0deg,#ff7af2,#6effff,#ffce5b,#8a7bff,#ff7af2)",
            filter: "blur(2px)", animation: "spinHero 8s linear infinite",
          }} />
          <div style={{
            position: "relative", width: "100%", height: "100%", borderRadius: "50%",
            border: "3px solid #0a0a16", overflow: "hidden", background: "#0a0a16",
          }}>
            {config.avatarUrl
              ? <img src={config.avatarUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} />
              : <div style={{ width: "100%", height: "100%", background: "#d8d4c8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#888" }}>Photo</div>
            }
          </div>
          <Icons.spark style={{ position: "absolute", top: -20, right: -10, color: "#fff", width: 20, height: 20 }} />
          <Icons.spark style={{ position: "absolute", bottom: 0, left: -22, color: "#ffce5b", width: 14, height: 14 }} />
        </div>
      </div>
    </div>
  );
}
