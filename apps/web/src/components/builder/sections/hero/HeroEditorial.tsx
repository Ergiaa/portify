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
    badge?: string;
    variant?: string;
  };
}

const skin = {
  bg: "#f3ecdd", panel: "#faf5ea", ink: "#211a12", sub: "#5c4e3a", mute: "#8a7a5e",
  accent: "#9a4a26", accentInk: "#faf5ea", line: "#dccfb6", soft: "#ece2cd",
  fontBody: "'Newsreader', serif", fontHead: "'Instrument Serif', serif", fontMono: "'Geist Mono', monospace",
  radius: 2,
};

export function HeroEditorial({ config }: Props) {
  return (
    <div style={{
      width: "100%", height: "100%", background: skin.bg, color: skin.ink,
      fontFamily: skin.fontBody, padding: "40px 56px", boxSizing: "border-box",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "baseline",
        borderBottom: `2px solid ${skin.ink}`, paddingBottom: 10,
      }}>
        <div style={{ fontFamily: skin.fontHead, fontSize: 26, fontStyle: "italic" }}>The Daily Frame</div>
        <div style={{ fontFamily: skin.fontMono, fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: skin.mute }}>
          Vol. XII · Issue 04
        </div>
      </div>
      <div style={{
        display: "flex", justifyContent: "space-between", fontFamily: skin.fontMono,
        fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: skin.mute,
        padding: "4px 0 0", borderBottom: `1px solid ${skin.ink}`, marginBottom: 28,
      }}>
        <span>Cinema</span><span>Essays</span><span>Interviews</span><span>Field Notes</span><span>Reviews</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 40, alignItems: "start" }}>
        <div>
          <p style={{ fontFamily: skin.fontHead, fontStyle: "italic", fontSize: 22, margin: "0 0 12px", color: skin.accent }}>
            {config.tagline}…
          </p>
          <h1 style={{
            fontFamily: skin.fontHead, fontWeight: 400,
            fontSize: 92, lineHeight: 0.92, letterSpacing: "-0.02em", margin: 0, color: skin.ink,
          }}>
            {config.heading}
          </h1>
          <div style={{ display: "flex", gap: 12, marginTop: 22, alignItems: "center" }}>
            <span style={{
              fontFamily: skin.fontMono, fontSize: 10, padding: "4px 10px",
              border: `1px solid ${skin.ink}`, borderRadius: skin.radius, textTransform: "uppercase", letterSpacing: "0.1em",
            }}>
              {config.badge || config.ctaLabel}
            </span>
            <span style={{ fontSize: 14, color: skin.mute }}>· est. 2019</span>
          </div>
          <p style={{ fontSize: 18, lineHeight: 1.5, marginTop: 26, color: skin.sub, columnCount: 2, columnGap: 28, textAlign: "justify" }}>
            {config.subheading}
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 22 }}>
            <a href={config.ctaHref} style={{
              padding: "11px 22px", background: skin.ink, color: skin.panel,
              fontFamily: "'Geist', sans-serif", fontSize: 13, fontWeight: 500, borderRadius: skin.radius,
              textDecoration: "none", letterSpacing: "0.02em",
            }}>{config.ctaLabel} →</a>
            <a href={config.cta2Href} style={{
              padding: "11px 22px", border: `1px solid ${skin.ink}`, color: skin.ink,
              fontFamily: "'Geist', sans-serif", fontSize: 13, fontWeight: 500, borderRadius: skin.radius,
              textDecoration: "none", letterSpacing: "0.02em",
            }}>{config.cta2Label}</a>
          </div>
        </div>
        <div>
          <div style={{ aspectRatio: "4/5", filter: "sepia(0.15)" }}>
            {config.avatarUrl
              ? <img src={config.avatarUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              : <div style={{ width: "100%", height: "100%", background: "#d8d4c8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: skin.mute }}>Photo</div>
            }
          </div>
          <p style={{ fontFamily: skin.fontHead, fontStyle: "italic", fontSize: 12, color: skin.mute, margin: "8px 0 0", textAlign: "center" }}>
            Fig. 1 — The author, at desk.
          </p>
        </div>
      </div>
    </div>
  );
}
