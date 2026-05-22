interface Props {
  config: {
    title: string;
    description?: string;
    layout?: string;
    skills: { name: string; level: number }[];
    variant?: string;
  };
}

export function SkillsY2K({ config }: Props) {
  return (
    <div style={{
      width: "100%", height: "100%",
      background: "linear-gradient(135deg,#0a0a16 0%,#12122a 40%,#0a0a16 100%)",
      color: "#fff", fontFamily: "Space Grotesk, sans-serif",
      padding: 32, boxSizing: "border-box", position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(rgba(110,143,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(110,143,255,0.1) 1px, transparent 1px)",
        backgroundSize: "30px 30px",
      }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(circle at 70% 0%, rgba(255,138,225,0.25), transparent 60%)",
      }} />
      <div style={{ position: "relative", zIndex: 2 }}>
        <p style={{ fontFamily: "VT323, monospace", fontSize: 22, color: "#ffce5b", margin: 0 }}>
          &gt;&gt;&gt; rendering skills.dat
        </p>
        <h2 style={{
          fontFamily: "Major Mono Display, monospace", fontSize: 48, lineHeight: 1, margin: "4px 0 4px",
          textTransform: "lowercase", letterSpacing: "-0.02em",
          background: "linear-gradient(180deg,#fff,#c9d4ff,#6e8fff)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
        }}>{config.title}</h2>
        {config.description && (
          <p style={{ fontFamily: "VT323, monospace", fontSize: 18, color: "#c7d3ff", margin: 0 }}>
            ─── {config.description}
          </p>
        )}
        <div style={{ marginTop: 22, display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
          {config.skills.map((s, i) => (
            <div key={i} style={{
              border: "2px solid #fff", padding: 10,
              background: "linear-gradient(180deg,rgba(110,143,255,0.15),rgba(255,138,225,0.15))",
              boxShadow: "3px 3px 0 #ff7af2",
            }}>
              <div style={{
                display: "flex", justifyContent: "space-between",
                fontFamily: "VT323, monospace", fontSize: 18, marginBottom: 4,
              }}>
                <span>★ {s.name}</span>
                <span style={{ color: "#6effff" }}>{s.level}/100</span>
              </div>
              <div style={{ display: "flex", gap: 2 }}>
                {Array.from({ length: 20 }).map((_, k) => (
                  <div key={k} style={{
                    flex: 1, height: 10,
                    background: (k / 20) * 100 < s.level
                      ? "linear-gradient(180deg,#fff,#c9d4ff,#6e8fff)"
                      : "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.3)",
                  }} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
