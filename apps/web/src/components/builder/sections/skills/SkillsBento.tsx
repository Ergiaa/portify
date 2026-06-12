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

const skin = {
  bg: "#f1f0ea", panel: "#ffffff", ink: "#16161a", sub: "#54545c", mute: "#8a8a90",
  accent: "#16161a", line: "#e5e3db", soft: "#e9e8e1",
  fontBody: "'Geist', sans-serif", fontHead: "'Geist', sans-serif", fontMono: "'JetBrains Mono', monospace",
  radius: 20,
};

const gradientTiles = [
  "linear-gradient(155deg,#ff9a52,#e0476b)",
  "linear-gradient(155deg,#54cf78,#1e8f4a)",
  "linear-gradient(155deg,#7eb6ff,#3a4fd6)",
];
const tileInk = ["#fff", "#0a2410", "#fff"];

export function SkillsBento({ config }: Props) {
  const sorted = [...config.skills].sort((a, b) => b.level - a.level);
  const top = sorted.slice(0, 3);
  const rest = sorted.slice(3);

  return (
    <div style={{
      width: "100%", height: "100%", background: skin.bg, color: skin.ink,
      fontFamily: skin.fontBody, padding: 24, boxSizing: "border-box",
      display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr", gap: 14,
    }}>
      {/* Description + rest chips */}
      <div style={{
        background: skin.panel, border: `1px solid ${skin.line}`, borderRadius: skin.radius,
        padding: 22, display: "flex", flexDirection: "column", justifyContent: "space-between",
      }}>
        <div>
          <p style={{
            fontFamily: skin.fontMono, fontSize: 11, color: skin.mute,
            textTransform: "uppercase", letterSpacing: "0.1em", margin: 0,
          }}>{`> skills.json`}</p>
          <h2 style={{
            fontSize: 30, fontWeight: 700, letterSpacing: "-0.02em",
            margin: "8px 0 6px", lineHeight: 1.05, color: skin.ink,
          }}>{config.title}</h2>
          {config.description && (
            <p style={{ color: skin.sub, fontSize: 13, margin: 0 }}>{config.description}</p>
          )}
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {rest.map((s, i) => (
            <span key={i} style={{
              padding: "6px 12px", borderRadius: 999,
              background: skin.soft, fontSize: 12, color: skin.sub,
            }}>{s.name}</span>
          ))}
        </div>
      </div>
      {top.map((s, i) => (
        <div key={i} style={{
          background: gradientTiles[i], color: tileInk[i], borderRadius: skin.radius,
          padding: 20, display: "flex", flexDirection: "column", justifyContent: "space-between",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            fontSize: 11, opacity: 0.8, fontFamily: skin.fontMono,
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
