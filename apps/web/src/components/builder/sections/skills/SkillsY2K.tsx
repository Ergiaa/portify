interface Props {
  config: {
    title: string;
    description?: string;
    layout?: string;
    skills: { name: string; level: number }[];
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

export function SkillsY2K({ config }: Props) {
  return (
    <div style={{
      width: "100%", height: "100%",
      background: skin.bg,
      color: skin.ink, fontFamily: skin.fontBody,
      padding: 32, boxSizing: "border-box", position: "relative", overflow: "hidden",
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

      <div style={{ position: "relative", zIndex: 2 }}>
        {/* Terminal header */}
        <div style={{
          display: "flex", justifyContent: "space-between",
          borderBottom: `1px solid ${skin.accent}`, paddingBottom: 8, marginBottom: 16,
          fontFamily: skin.fontMono, fontSize: 18, color: skin.sub,
        }}>
          <span style={{ color: skin.accent }}>&gt;&gt;&gt; skills.dat</span>
          <span style={{ color: skin.altPink, animation: "sysBlink 1.1s step-end infinite" }}>■</span>
        </div>

        <h2 style={{
          ...chromeStyle,
          fontFamily: skin.fontHead, fontSize: 48, lineHeight: 1, margin: "0 0 4px",
          textTransform: "lowercase", letterSpacing: "-0.02em",
        }}>{config.title}</h2>
        {config.description && (
          <p style={{ fontFamily: skin.fontMono, fontSize: 18, color: skin.mute, margin: "0 0 18px" }}>
            ─── {config.description}
          </p>
        )}

        <div style={{ marginTop: 22, display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
          {config.skills.map((s, i) => {
            const shadowColor = [skin.altPink, skin.altCyan][i % 2];
            return (
              <div key={i} style={{
                border: `2px solid ${skin.accent}`, padding: 10,
                background: skin.panel,
                boxShadow: `3px 3px 0 ${shadowColor}`,
              }}>
                <div style={{
                  display: "flex", justifyContent: "space-between",
                  fontFamily: skin.fontMono, fontSize: 18, marginBottom: 4,
                  color: skin.ink,
                }}>
                  <span>★ {s.name}</span>
                  <span style={{ color: skin.altCyan }}>{s.level}/100</span>
                </div>
                <div style={{ display: "flex", gap: 2 }}>
                  {Array.from({ length: 20 }).map((_, k) => (
                    <div key={k} style={{
                      flex: 1, height: 10,
                      background: (k / 20) * 100 < s.level ? skin.accent : skin.soft,
                      border: `1px solid ${skin.mute}`,
                    }} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
