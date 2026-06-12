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

const skin = {
  bg: "#f3ecdd", panel: "#faf5ea", ink: "#211a12", sub: "#5c4e3a", mute: "#8a7a5e",
  accent: "#9a4a26", accentInk: "#faf5ea", line: "#dccfb6", soft: "#ece2cd",
  fontBody: "'Newsreader', serif", fontHead: "'Instrument Serif', serif", fontMono: "'Geist Mono', monospace",
  radius: 2,
};

export function AboutEditorial({ config }: Props) {
  const firstName = config.name ? config.name.split(" ")[0] : "Author";

  return (
    <div style={{
      width: "100%", height: "100%", background: skin.bg, color: skin.ink,
      fontFamily: skin.fontBody, padding: "44px 56px", boxSizing: "border-box",
      display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 48, alignItems: "start",
    }}>
      <div>
        <div style={{ aspectRatio: "4/5", filter: "sepia(0.15)" }}>
          {config.photoUrl
            ? <img src={config.photoUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            : <div style={{ width: "100%", height: "100%", background: "#d8d4c8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: skin.mute }}>Photo</div>
          }
        </div>
        <p style={{ fontFamily: skin.fontHead, fontStyle: "italic", fontSize: 13, color: skin.mute, margin: "10px 0 0", textAlign: "center" }}>
          "On location, somewhere overcast."
        </p>
      </div>
      <div>
        <p style={{ fontFamily: skin.fontHead, fontStyle: "italic", fontSize: 20, color: skin.mute, margin: "0 0 4px" }}>§ The author</p>
        <h2 style={{ fontFamily: skin.fontHead, fontSize: 64, fontWeight: 400, lineHeight: 1, letterSpacing: "-0.02em", margin: 0, color: skin.ink }}>
          On {firstName},<br />
          <span style={{ fontStyle: "italic" }}>in their own words.</span>
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.55, color: skin.sub, marginTop: 24, columnCount: 2, columnGap: 28, textAlign: "justify" }}>
          {config.bio}
        </p>

        {config.highlights && config.highlights.length > 0 && (
          <div style={{ display: "flex", gap: 22, marginTop: 26, flexWrap: "wrap", paddingTop: 18, borderTop: `1px solid ${skin.line}` }}>
            {config.highlights.map((h, i) => (
              <div key={i}>
                <div style={{ fontFamily: skin.fontMono, fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: skin.mute }}>{h.label}</div>
                <div style={{ fontFamily: skin.fontHead, fontSize: 17, fontStyle: "italic", color: skin.ink, marginTop: 4 }}>{h.value}</div>
              </div>
            ))}
          </div>
        )}

        {config.ctaLabel && (
          <a href={config.ctaHref} style={{ display: "inline-flex", alignItems: "center", gap: 10, marginTop: 22, fontFamily: skin.fontHead, fontStyle: "italic", fontSize: 18, color: skin.accent, textDecoration: "none", borderBottom: `1px solid ${skin.accent}`, paddingBottom: 2 }}>
            {config.ctaLabel} →
          </a>
        )}
      </div>
    </div>
  );
}
