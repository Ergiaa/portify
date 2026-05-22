interface Props {
  config: {
    title: string;
    description?: string;
    layout?: string;
    skills: { name: string; level: number }[];
    variant?: string;
  };
}

export function SkillsGlass({ config }: Props) {
  return (
    <div style={{
      width: "100%", height: "100%",
      background: "linear-gradient(135deg,#fce4ff,#d0e8ff)",
      fontFamily: "Plus Jakarta Sans, sans-serif", color: "#2a1e4d",
      padding: 40, boxSizing: "border-box", position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", width: 360, height: 360, borderRadius: "50%",
        background: "radial-gradient(circle,#ff9ec8 0%, transparent 70%)",
        top: -100, right: -80, filter: "blur(40px)",
      }} />
      <div style={{ position: "relative", zIndex: 2, textAlign: "center", marginBottom: 26 }}>
        <h2 style={{ margin: 0, fontSize: 38, fontWeight: 800, letterSpacing: "-0.02em" }}>{config.title}</h2>
        {config.description && (
          <p style={{ margin: "6px 0 0", color: "#6b5495", fontSize: 14 }}>{config.description}</p>
        )}
      </div>
      <div style={{
        position: "relative", zIndex: 2, display: "grid",
        gridTemplateColumns: "repeat(4,1fr)", gap: 12,
      }}>
        {config.skills.map((s, i) => (
          <div key={i} style={{
            background: "rgba(255,255,255,0.45)", backdropFilter: "blur(18px)",
            border: "1px solid rgba(255,255,255,0.65)", borderRadius: 18,
            padding: 16, boxShadow: "0 10px 30px -10px rgba(80,40,140,0.15)",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
              <span style={{ fontSize: 14, fontWeight: 600 }}>{s.name}</span>
              <span style={{ fontSize: 11, color: "#7e5aa3", fontWeight: 600 }}>{s.level}</span>
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
                fontSize: 12, fontWeight: 700, color: "#2a1e4d",
              }}>{s.level}%</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
