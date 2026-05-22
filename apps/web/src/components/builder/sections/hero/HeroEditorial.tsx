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

export function HeroEditorial({ config }: Props) {
  return (
    <div style={{
      width: "100%", height: "100%", background: "#f1ebdd", color: "#1a1410",
      fontFamily: "Newsreader, serif", padding: "40px 56px", boxSizing: "border-box",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "baseline",
        borderBottom: "2px solid #1a1410", paddingBottom: 10,
      }}>
        <div style={{ fontFamily: "Instrument Serif, serif", fontSize: 26, fontStyle: "italic" }}>The Daily Frame</div>
        <div style={{ fontFamily: "Geist Mono, monospace", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "#6b5b48" }}>
          Vol. XII · Issue 04
        </div>
      </div>
      <div style={{
        display: "flex", justifyContent: "space-between", fontFamily: "Geist Mono, monospace",
        fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6b5b48",
        padding: "4px 0 0", borderBottom: "1px solid #1a1410", marginBottom: 28,
      }}>
        <span>Cinema</span><span>Essays</span><span>Interviews</span><span>Field Notes</span><span>Reviews</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 40, alignItems: "start" }}>
        <div>
          <p style={{ fontFamily: "Instrument Serif, serif", fontStyle: "italic", fontSize: 22, margin: "0 0 12px", color: "#8a4a2a" }}>
            {config.tagline}…
          </p>
          <h1 style={{
            fontFamily: "Instrument Serif, serif", fontWeight: 400,
            fontSize: 92, lineHeight: 0.92, letterSpacing: "-0.02em", margin: 0, color: "#1a1410",
          }}>
            {config.heading}
          </h1>
          <div style={{ display: "flex", gap: 12, marginTop: 22, alignItems: "center" }}>
            <span style={{
              fontFamily: "Geist Mono, monospace", fontSize: 10, padding: "4px 10px",
              border: "1px solid #1a1410", borderRadius: 999, textTransform: "uppercase", letterSpacing: "0.1em",
            }}>
              {config.subheading.split(" ").slice(0, 3).join(" ")}
            </span>
            <span style={{ fontSize: 14, color: "#6b5b48" }}>· est. 2019</span>
          </div>
          <p style={{ fontSize: 18, lineHeight: 1.5, marginTop: 26, color: "#3a2e22", columnCount: 2, columnGap: 28, textAlign: "justify" }}>
            <span style={{ float: "left", fontFamily: "Instrument Serif, serif", fontSize: 62, lineHeight: 0.85, paddingRight: 8, paddingTop: 6, fontStyle: "italic" }}>
              {config.subheading[0]}
            </span>
            {config.subheading.slice(1)}
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 22 }}>
            <a href={config.ctaHref} style={{
              padding: "11px 22px", background: "#1a1410", color: "#f1ebdd",
              fontFamily: "Geist, sans-serif", fontSize: 13, fontWeight: 500, borderRadius: 0,
              textDecoration: "none", letterSpacing: "0.02em",
            }}>{config.ctaLabel} →</a>
            <a href={config.cta2Href} style={{
              padding: "11px 22px", border: "1px solid #1a1410", color: "#1a1410",
              fontFamily: "Geist, sans-serif", fontSize: 13, fontWeight: 500, borderRadius: 0,
              textDecoration: "none", letterSpacing: "0.02em",
            }}>{config.cta2Label}</a>
          </div>
        </div>
        <div>
          <div style={{ aspectRatio: "4/5", filter: "sepia(0.2)" }}>
            {config.avatarUrl
              ? <img src={config.avatarUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              : <div style={{ width: "100%", height: "100%", background: "#d8d4c8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#888" }}>Photo</div>
            }
          </div>
          <p style={{ fontFamily: "Instrument Serif, serif", fontStyle: "italic", fontSize: 12, color: "#6b5b48", margin: "8px 0 0", textAlign: "center" }}>
            Fig. 1 — The author, at desk.
          </p>
        </div>
      </div>
    </div>
  );
}
