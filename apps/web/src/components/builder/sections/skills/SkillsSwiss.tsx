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
  bg: "#f6f5f1", panel: "#ffffff", ink: "#16150f", sub: "#56544b", mute: "#94917f",
  accent: "#16150f", line: "#deded4", soft: "#edece4",
  fontBody: "'Geist', sans-serif", fontHead: "'Geist', sans-serif", fontMono: "'Geist Mono', monospace",
  radius: 0,
};

export function SkillsSwiss({ config }: Props) {
  return (
    <div style={{
      width: "100%", height: "100%", background: skin.bg, color: skin.ink,
      fontFamily: skin.fontBody, padding: "44px 60px", boxSizing: "border-box",
    }}>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "flex-end",
        borderBottom: `1px solid ${skin.ink}`, paddingBottom: 12, marginBottom: 28,
      }}>
        <div>
          <p style={{ margin: "0 0 8px", fontFamily: skin.fontMono, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: skin.mute }}>
            § 03 — {config.skills.length} items
          </p>
          <h2 style={{ fontSize: 36, fontWeight: 500, letterSpacing: "-0.02em", margin: 0 }}>{config.title}</h2>
        </div>
        {config.description && (
          <p style={{ margin: 0, color: skin.mute, fontSize: 13, maxWidth: 280, textAlign: "right" }}>{config.description}</p>
        )}
      </div>
      <div>
        {config.skills.map((s, i) => (
          <div key={i} style={{
            display: "grid", gridTemplateColumns: "40px 1fr 100px 1fr",
            alignItems: "center", padding: "12px 0", borderBottom: `1px solid ${skin.line}`, gap: 16,
          }}>
            <span style={{ fontFamily: skin.fontMono, fontSize: 11, color: skin.mute }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <span style={{ fontSize: 15, fontWeight: 500, color: skin.ink }}>{s.name}</span>
            <span style={{ fontFamily: skin.fontMono, fontSize: 11, color: skin.mute, textAlign: "right" }}>
              {s.level}%
            </span>
            <div style={{ height: 4, background: skin.soft, position: "relative" }}>
              <div style={{ position: "absolute", inset: "0 auto 0 0", width: `${s.level}%`, background: skin.ink }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
