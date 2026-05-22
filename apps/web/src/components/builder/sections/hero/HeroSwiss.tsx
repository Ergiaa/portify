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

export function HeroSwiss({ config }: Props) {
  const words = config.heading.split(" ");
  const firstWord = words[0];
  const restWords = words.slice(1).join(" ");

  return (
    <div style={{
      width: "100%", height: "100%", background: "#fafaf7", color: "#111",
      fontFamily: "Geist, sans-serif", padding: "48px 64px", boxSizing: "border-box",
      display: "grid", gridTemplateRows: "auto 1fr auto", gap: 0, position: "relative",
    }}>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        fontFamily: "Geist Mono, monospace", fontSize: 11, letterSpacing: "0.1em",
        textTransform: "uppercase", color: "#888", paddingBottom: 16,
        borderBottom: "1px solid #111",
      }}>
        <span>Portfolio / 2025</span>
        <span>N°01 — Index</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", alignItems: "end", gap: 48, paddingTop: 56 }}>
        <div>
          <p style={{
            fontFamily: "Geist Mono, monospace", fontSize: 12, color: "#888",
            letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 18px",
          }}>
            01 — {config.tagline}
          </p>
          <h1 style={{ fontSize: 88, lineHeight: 0.95, fontWeight: 500, letterSpacing: "-0.04em", margin: 0, color: "#111" }}>
            {firstWord}
            <br />
            <span style={{ fontStyle: "italic", fontWeight: 300 }}>{restWords}.</span>
          </h1>
          <p style={{ fontSize: 16, color: "#444", maxWidth: 460, marginTop: 28, lineHeight: 1.5 }}>
            {config.subheading}
          </p>
        </div>
        <div style={{ aspectRatio: "3/4" }}>
          {config.avatarUrl
            ? <img src={config.avatarUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            : <div style={{ width: "100%", height: "100%", background: "#d8d4c8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#888" }}>Photo</div>
          }
        </div>
      </div>

      <div style={{ display: "flex", gap: 0, marginTop: 32, borderTop: "1px solid #111", paddingTop: 18 }}>
        <a href={config.ctaHref} style={{
          flex: 1, padding: "16px 0", color: "#111", fontSize: 14, fontWeight: 500,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          borderRight: "1px solid #111", paddingRight: 24, cursor: "pointer", textDecoration: "none",
        }}>
          <span>{config.ctaLabel}</span>
          <Icons.arrowUR />
        </a>
        <a href={config.cta2Href} style={{
          flex: 1, padding: "16px 0", color: "#888", fontSize: 14, fontWeight: 500,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          paddingLeft: 24, cursor: "pointer", textDecoration: "none",
        }}>
          <span>{config.cta2Label}</span>
          <Icons.arrowR />
        </a>
      </div>
    </div>
  );
}
