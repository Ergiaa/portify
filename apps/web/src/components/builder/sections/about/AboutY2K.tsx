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

export function AboutY2K({ config }: Props) {
  const firstName = config.name ? config.name.split(" ")[0] : "";
  const locationHighlight = config.highlights?.find(h => h.label.toLowerCase().includes("based") || h.label.toLowerCase().includes("location"));

  const chromeStyle = {
    background: "linear-gradient(180deg,#fff,#c9d4ff,#6e8fff)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  };

  return (
    <div style={{
      width: "100%", height: "100%", background: "#0a0a16", color: "#fff",
      fontFamily: "Space Grotesk, sans-serif", padding: 32, boxSizing: "border-box",
      position: "relative", overflow: "hidden", borderBottom: "1px solid rgba(110,143,255,0.2)",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(110,143,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(110,143,255,0.1) 1px, transparent 1px)",
        backgroundSize: "30px 30px",
      }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(circle at 50% 100%, rgba(255,138,225,0.3) 0%, transparent 60%)",
      }} />

      <div style={{ position: "relative", zIndex: 2, border: "2px solid #fff", borderRadius: 6, overflow: "hidden", boxShadow: "8px 8px 0 #ff7af2, -8px -8px 0 #6effff", height: "calc(100% - 16px)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", background: "linear-gradient(180deg,#3a3a6a,#1a1a3a)", padding: "8px 14px", borderBottom: "2px solid #fff", fontFamily: "VT323, monospace", fontSize: 18 }}>
          <span>★ about_me.txt</span>
          <span>[_] [□] [×]</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", height: "calc(100% - 38px)", background: "rgba(10,10,30,0.7)" }}>
          <div style={{ padding: 18, borderRight: "1px dashed rgba(255,255,255,0.3)" }}>
            <div style={{ position: "relative", padding: 4, border: "2px solid #fff", background: "linear-gradient(135deg,#ff7af2,#6effff)" }}>
              {config.photoUrl
                ? <img src={config.photoUrl} alt="" style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover", display: "block" }} />
                : <div style={{ width: "100%", aspectRatio: "3/4", background: "#d8d4c8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#888" }}>Photo</div>
              }
            </div>
            <div style={{ marginTop: 14, fontFamily: "VT323, monospace", fontSize: 16, color: "#c7d3ff" }}>
              <div>&gt; status: ★ ONLINE</div>
              <div>&gt; loc: {locationHighlight?.value ?? "Remote"}</div>
              <div>&gt; mood: ☆ caffeinated</div>
            </div>
            <div style={{ marginTop: 14, display: "flex", gap: 6, flexWrap: "wrap" }}>
              {["★", "♥", "✦", "✧"].map((s, i) => (
                <span key={i} style={{ width: 24, height: 24, display: "grid", placeItems: "center", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.3)", fontSize: 14 }}>{s}</span>
              ))}
            </div>
          </div>

          <div style={{ padding: 24, overflow: "hidden" }}>
            <p style={{ fontFamily: "VT323, monospace", fontSize: 20, margin: 0, color: "#ffce5b" }}>
              &gt;&gt; loading {(config.title || "about me").toLowerCase()}.txt
            </p>
            <h2 style={{ ...chromeStyle, fontFamily: "Major Mono Display, monospace", fontSize: 52, lineHeight: 0.95, letterSpacing: "-0.02em", margin: "8px 0 4px", textTransform: "lowercase" }}>
              {firstName}
            </h2>
            <p style={{ margin: 0, fontFamily: "VT323, monospace", fontSize: 18, color: "#6effff" }}>
              [ {config.role} ]
            </p>
            <p style={{ fontSize: 14, lineHeight: 1.55, marginTop: 16, color: "rgba(255,255,255,0.9)" }}>{config.bio}</p>

            {config.highlights && config.highlights.length > 0 && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 18 }}>
                {config.highlights.map((h, i) => (
                  <div key={i} style={{ border: "1px dashed rgba(255,255,255,0.35)", padding: "6px 10px", fontFamily: "VT323, monospace", fontSize: 15 }}>
                    <span style={{ color: "#ff7af2" }}>&gt;</span> {h.label}: <span style={{ color: "#fff" }}>{h.value}</span>
                  </div>
                ))}
              </div>
            )}

            {config.ctaLabel && (
              <a href={config.ctaHref} style={{ marginTop: 20, display: "inline-block", padding: "8px 18px", background: "linear-gradient(180deg,#fff,#c9d4ff,#6e8fff)", color: "#0a0a16", fontWeight: 700, fontSize: 13, textDecoration: "none", border: "2px solid #fff", boxShadow: "4px 4px 0 #ff7af2", fontFamily: "Space Grotesk, sans-serif" }}>
                ▶ {config.ctaLabel.toUpperCase()}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
