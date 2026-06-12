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
  bg: "#eef0f7", panel: "rgba(255,255,255,0.55)", ink: "#241d3a", sub: "#534c70", mute: "#837da0",
  accent: "#6d5cf5", line: "rgba(109,92,245,0.18)", soft: "rgba(255,255,255,0.4)",
  fontBody: "'Plus Jakarta Sans', sans-serif", fontHead: "'Plus Jakarta Sans', sans-serif", fontMono: "'Geist Mono', monospace",
  radius: 20,
  blobA: "rgba(167,139,255,0.45)", blobB: "rgba(120,182,255,0.40)",
};

export function SkillsGlass({ config }: Props) {
  return (
    <div style={{
      width: "100%", height: "100%",
      background: skin.bg,
      fontFamily: skin.fontBody, color: skin.ink,
      padding: 40, boxSizing: "border-box", position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", width: 360, height: 360, borderRadius: "50%",
        background: `radial-gradient(circle, ${skin.blobA} 0%, transparent 70%)`,
        top: -100, right: -80, pointerEvents: "none",
      }} />
      <div style={{ position: "relative", zIndex: 2, textAlign: "center", marginBottom: 26 }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 12,
          padding: "6px 14px", borderRadius: 999,
          background: "rgba(255,255,255,0.55)", backdropFilter: "blur(14px)",
          border: "1px solid rgba(255,255,255,0.75)",
        }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4dd884" }} />
          <span style={{ fontSize: 11, fontWeight: 600, color: skin.ink, letterSpacing: "0.08em", textTransform: "uppercase" }}>Skills</span>
        </div>
        <h2 style={{ margin: 0, fontSize: 38, fontWeight: 800, letterSpacing: "-0.02em", color: skin.ink }}>{config.title}</h2>
        {config.description && (
          <p style={{ margin: "6px 0 0", color: skin.mute, fontSize: 14 }}>{config.description}</p>
        )}
      </div>
      <div style={{
        position: "relative", zIndex: 2, display: "grid",
        gridTemplateColumns: "repeat(4,1fr)", gap: 12,
      }}>
        {config.skills.map((s, i) => (
          <div key={i} style={{
            background: "rgba(255,255,255,0.55)", backdropFilter: "blur(18px)",
            border: "1px solid rgba(255,255,255,0.75)", borderRadius: 18,
            padding: 16, boxShadow: "0 10px 30px -10px rgba(36,29,58,0.1)",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: skin.ink }}>{s.name}</span>
              <span style={{ fontSize: 11, color: skin.accent, fontWeight: 600 }}>{s.level}</span>
            </div>
            <div style={{ position: "relative", width: 56, height: 56, margin: "0 auto" }}>
              <svg width="56" height="56" style={{ transform: "rotate(-90deg)" }}>
                <defs>
                  <linearGradient id={`g${i}`} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#a78bff" />
                    <stop offset="100%" stopColor="#ff7ac0" />
                  </linearGradient>
                </defs>
                <circle cx="28" cy="28" r="22" stroke="rgba(255,255,255,0.6)" strokeWidth="6" fill="none" />
                <circle cx="28" cy="28" r="22" stroke={`url(#g${i})`} strokeWidth="6" fill="none"
                  strokeLinecap="round" strokeDasharray={`${(s.level / 100) * 138} 138`} />
              </svg>
              <div style={{
                position: "absolute", inset: 0, display: "grid", placeItems: "center",
                fontSize: 12, fontWeight: 700, color: skin.ink,
              }}>{s.level}%</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
