import { Counter } from "../shared/Counter";

interface Props {
  config: {
    title: string;
    description?: string;
    layout?: string;
    skills: { name: string; level: number }[];
    variant?: string;
  };
}

export function SkillsBento({ config }: Props) {
  const sorted = [...config.skills].sort((a, b) => b.level - a.level);
  const top = sorted.slice(0, 3);
  const rest = sorted.slice(3);

  const colors = [
    { bg: "linear-gradient(160deg,#ff8a4d,#c2386e)", fg: "#fff" },
    { bg: "linear-gradient(160deg,#76e07a,#1e8f4a)", fg: "#0d2010" },
    { bg: "linear-gradient(160deg,#7eb6ff,#3a4fd6)", fg: "#fff" },
  ];

  return (
    <div style={{
      width: "100%", height: "100%", background: "#0d0d0f", color: "#fff",
      fontFamily: "Geist, sans-serif", padding: 24, boxSizing: "border-box",
      display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr", gap: 14,
    }}>
      <div style={{
        background: "#16161a", border: "1px solid #232328", borderRadius: 24,
        padding: 22, display: "flex", flexDirection: "column", justifyContent: "space-between",
      }}>
        <div>
          <p style={{
            fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "#777",
            textTransform: "uppercase", letterSpacing: "0.1em", margin: 0,
          }}>{`> skills.json`}</p>
          <h2 style={{
            fontSize: 30, fontWeight: 700, letterSpacing: "-0.02em",
            margin: "8px 0 6px", lineHeight: 1.05,
          }}>{config.title}</h2>
          {config.description && (
            <p style={{ color: "#a8a8b3", fontSize: 13, margin: 0 }}>{config.description}</p>
          )}
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {rest.map((s, i) => (
            <span key={i} style={{
              padding: "6px 12px", borderRadius: 999,
              background: "#1f1f24", fontSize: 12, color: "#d0d0d8",
            }}>{s.name}</span>
          ))}
        </div>
      </div>
      {top.map((s, i) => (
        <div key={i} style={{
          background: colors[i].bg, color: colors[i].fg, borderRadius: 24,
          padding: 20, display: "flex", flexDirection: "column", justifyContent: "space-between",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            fontSize: 11, opacity: 0.8, fontFamily: "JetBrains Mono, monospace",
            textTransform: "uppercase", letterSpacing: "0.1em",
          }}>Top {i + 1}</div>
          <div>
            <div style={{ fontSize: 56, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1 }}>
              <Counter to={s.level} />
              <span style={{ fontSize: 24, opacity: 0.7 }}>/100</span>
            </div>
            <div style={{ fontSize: 16, fontWeight: 600, marginTop: 6 }}>{s.name}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
