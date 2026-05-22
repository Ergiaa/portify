interface Props {
  config: {
    title?: string;
    name?: string;
    role?: string;
    bio: string;
    photoUrl: string;
    photoPosition?: "left" | "right";
    highlights?: { label: string; value: string }[];
    ctaLabel?: string;
    ctaHref?: string;
    variant?: string;
  };
}

export function AboutEditorial({ config }: Props) {
  const firstName = config.name ? config.name.split(" ")[0] : "Author";

  return (
    <div style={{
      width: "100%", height: "100%", background: "#1a1410", color: "#f1ebdd",
      fontFamily: "Newsreader, serif", padding: "44px 56px", boxSizing: "border-box",
      display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 48, alignItems: "start",
    }}>
      <div>
        <div style={{ aspectRatio: "4/5", filter: "sepia(0.3) brightness(0.95)" }}>
          {config.photoUrl
            ? <img src={config.photoUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            : <div style={{ width: "100%", height: "100%", background: "#d8d4c8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#888" }}>Photo</div>
          }
        </div>
        <p style={{ fontFamily: "Instrument Serif, serif", fontStyle: "italic", fontSize: 13, color: "#bfa888", margin: "10px 0 0", textAlign: "center" }}>
          "On location, somewhere overcast."
        </p>
      </div>
      <div>
        <p style={{ fontFamily: "Instrument Serif, serif", fontStyle: "italic", fontSize: 20, color: "#bfa888", margin: "0 0 4px" }}>§ The author</p>
        <h2 style={{ fontFamily: "Instrument Serif, serif", fontSize: 64, fontWeight: 400, lineHeight: 1, letterSpacing: "-0.02em", margin: 0, color: "#f1ebdd" }}>
          On {firstName},<br />
          <span style={{ fontStyle: "italic" }}>in their own words.</span>
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.55, color: "#d6cbb6", marginTop: 24, columnCount: 2, columnGap: 28, textAlign: "justify" }}>
          <span style={{ float: "left", fontFamily: "Instrument Serif, serif", fontSize: 56, lineHeight: 0.85, paddingRight: 8, paddingTop: 4, color: "#bfa888" }}>
            {config.bio[0]}
          </span>
          {config.bio.slice(1)}
        </p>

        {config.highlights && config.highlights.length > 0 && (
          <div style={{ display: "flex", gap: 22, marginTop: 26, flexWrap: "wrap", paddingTop: 18, borderTop: "1px solid #3a2e22" }}>
            {config.highlights.map((h, i) => (
              <div key={i}>
                <div style={{ fontFamily: "Geist Mono, monospace", fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "#8a7a5e" }}>{h.label}</div>
                <div style={{ fontFamily: "Instrument Serif, serif", fontSize: 17, fontStyle: "italic", color: "#f1ebdd", marginTop: 4 }}>{h.value}</div>
              </div>
            ))}
          </div>
        )}

        {config.ctaLabel && (
          <a href={config.ctaHref} style={{ display: "inline-flex", alignItems: "center", gap: 10, marginTop: 22, fontFamily: "Instrument Serif, serif", fontStyle: "italic", fontSize: 18, color: "#bfa888", textDecoration: "none", borderBottom: "1px solid #bfa888", paddingBottom: 2 }}>
            {config.ctaLabel} →
          </a>
        )}
      </div>
    </div>
  );
}
