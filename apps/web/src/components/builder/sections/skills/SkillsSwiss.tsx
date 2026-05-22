interface Props {
  config: {
    title: string;
    description?: string;
    layout?: string;
    skills: { name: string; level: number }[];
    variant?: string;
  };
}

export function SkillsSwiss({ config }: Props) {
  return (
    <div style={{
      width: "100%", height: "100%", background: "#fafaf7", color: "#111",
      fontFamily: "Geist, sans-serif", padding: "44px 60px", boxSizing: "border-box",
    }}>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "baseline",
        borderBottom: "1px solid #111", paddingBottom: 12, marginBottom: 28,
      }}>
        <h2 style={{ fontSize: 34, fontWeight: 500, letterSpacing: "-0.02em", margin: 0 }}>{config.title}</h2>
        <p style={{
          margin: 0, fontFamily: "Geist Mono, monospace", fontSize: 11,
          color: "#888", letterSpacing: "0.1em", textTransform: "uppercase",
        }}>§ 03 — {config.skills.length} items</p>
      </div>
      {config.description && (
        <p style={{ margin: "0 0 28px", color: "#555", fontSize: 15, maxWidth: 480 }}>{config.description}</p>
      )}
      <div>
        {config.skills.map((s, i) => (
          <div key={i} style={{
            display: "grid", gridTemplateColumns: "40px 1fr 100px 1fr",
            alignItems: "center", padding: "12px 0", borderBottom: "1px solid #e2e0d8", gap: 16,
          }}>
            <span style={{ fontFamily: "Geist Mono, monospace", fontSize: 11, color: "#888" }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <span style={{ fontSize: 15, fontWeight: 500 }}>{s.name}</span>
            <span style={{ fontFamily: "Geist Mono, monospace", fontSize: 11, color: "#888", textAlign: "right" }}>
              {s.level}%
            </span>
            <div style={{ height: 4, background: "#e2e0d8", position: "relative" }}>
              <div style={{ position: "absolute", inset: "0 auto 0 0", width: `${s.level}%`, background: "#111" }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
