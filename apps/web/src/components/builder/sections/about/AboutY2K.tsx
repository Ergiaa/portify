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

export function AboutY2K({ config }: Props) {
  const firstName = config.name ? config.name.split(" ")[0] : "";
  const locationHighlight = config.highlights?.find(h => h.label.toLowerCase().includes("based") || h.label.toLowerCase().includes("location"));

  return (
    <div style={{
      width: "100%", height: "100%", background: skin.bg, color: skin.ink,
      fontFamily: skin.fontBody, padding: 32, boxSizing: "border-box",
      position: "relative", overflow: "hidden",
    }}>
      <style>{`@keyframes sysBlink { 50% { opacity: 0; } }`}</style>

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

      {/* Window chrome */}
      <div style={{
        position: "relative", zIndex: 2,
        border: `2px solid ${skin.accent}`, borderRadius: 6, overflow: "hidden",
        boxShadow: `8px 8px 0 ${skin.altPink}, -8px -8px 0 ${skin.altCyan}`,
        height: "calc(100% - 16px)",
      }}>
        {/* Title bar */}
        <div style={{
          display: "flex", justifyContent: "space-between",
          background: skin.accent, padding: "8px 14px",
          borderBottom: `2px solid ${skin.ink}`,
          fontFamily: skin.fontMono, fontSize: 18, color: "#fff",
        }}>
          <span>★ about_me.txt</span>
          <span>[_] [□] [×]</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", height: "calc(100% - 38px)", background: skin.panel }}>
          {/* Left panel */}
          <div style={{ padding: 18, borderRight: `1px dashed ${skin.soft}` }}>
            <div style={{
              position: "relative", padding: 4,
              border: `2px solid ${skin.accent}`,
              background: `linear-gradient(135deg,${skin.altPink},${skin.altCyan})`,
            }}>
              {config.photoUrl
                ? <img src={config.photoUrl} alt="" style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover", display: "block" }} />
                : <div style={{ width: "100%", aspectRatio: "3/4", background: "#d8d4c8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: skin.mute }}>Photo</div>
              }
            </div>
            <div style={{ marginTop: 14, fontFamily: skin.fontMono, fontSize: 16, color: skin.sub }}>
              <div>&gt; status: ★ ONLINE</div>
              <div>&gt; loc: {locationHighlight?.value ?? "Remote"}</div>
              <div>&gt; mood: ☆ caffeinated</div>
            </div>
            <div style={{ marginTop: 14, display: "flex", gap: 6, flexWrap: "wrap" }}>
              {["★", "♥", "✦", "✧"].map((s, i) => (
                <span key={i} style={{
                  width: 24, height: 24, display: "grid", placeItems: "center",
                  background: skin.soft, border: `1px solid ${skin.mute}`, fontSize: 14, color: skin.sub,
                }}>{s}</span>
              ))}
            </div>
          </div>

          {/* Right panel */}
          <div style={{ padding: 24, overflow: "hidden" }}>
            <p style={{ fontFamily: skin.fontMono, fontSize: 20, margin: 0, color: skin.mute }}>
              &gt;&gt; loading {(config.title || "about me").toLowerCase()}.txt
            </p>
            <h2 style={{
              ...chromeStyle,
              fontFamily: skin.fontHead, fontSize: 52, lineHeight: 0.95,
              letterSpacing: "-0.02em", margin: "8px 0 4px", textTransform: "lowercase",
            }}>
              {firstName}
            </h2>
            <p style={{ margin: 0, fontFamily: skin.fontMono, fontSize: 18, color: skin.altCyan }}>
              [ {config.role} ]
            </p>
            <p style={{ fontSize: 14, lineHeight: 1.55, marginTop: 16, color: skin.sub }}>{config.bio}</p>

            {config.highlights && config.highlights.length > 0 && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 18 }}>
                {config.highlights.map((h, i) => (
                  <div key={i} style={{ border: `1px dashed ${skin.mute}`, padding: "6px 10px", fontFamily: skin.fontMono, fontSize: 15, background: skin.soft }}>
                    <span style={{ color: skin.altPink }}>&gt;</span> {h.label}: <span style={{ color: skin.ink }}>{h.value}</span>
                  </div>
                ))}
              </div>
            )}

            {config.ctaLabel && (
              <a href={config.ctaHref} style={{
                marginTop: 20, display: "inline-block", padding: "8px 18px",
                background: skin.accent, color: "#fff",
                fontWeight: 700, fontSize: 13, textDecoration: "none",
                border: `2px solid ${skin.accent}`,
                boxShadow: `4px 4px 0 ${skin.altPink}`,
                fontFamily: skin.fontBody,
              }}>
                ▶ {config.ctaLabel.toUpperCase()}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
