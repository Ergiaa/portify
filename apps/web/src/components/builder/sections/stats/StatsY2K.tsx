import { Counter } from "../shared/Counter";

interface Props {
  config: {
    title: string;
    description?: string;
    layout?: string;
    stats: { number: string; label: string; icon?: string }[];
    variant?: string;
  };
}

function parseStat(s: { number: string; to?: number; suffix?: string }) {
  if (typeof (s as any).to === "number") return { to: (s as any).to as number, suffix: s.suffix ?? "" };
  const m = String(s.number).match(/^(\d+(?:\.\d+)?)(\D*)$/);
  if (!m) return { to: 0, suffix: s.number };
  return { to: parseFloat(m[1]), suffix: m[2] };
}

export function StatsY2K({ config }: Props) {
  return (
    <div style={{
      width: "100%", height: "100%",
      background: "#0a0a16",
      color: "#fff", fontFamily: "Space Grotesk, sans-serif",
      padding: 28, boxSizing: "border-box", position: "relative", overflow: "hidden",
      borderBottom: "1px solid rgba(110,143,255,0.2)",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        background: "repeating-linear-gradient(0deg, rgba(0,0,0,0.15) 0, rgba(0,0,0,0.15) 1px, transparent 1px, transparent 3px)",
        pointerEvents: "none",
      }} />
      <div style={{ position: "relative", zIndex: 2, textAlign: "center", marginBottom: 22 }}>
        <p style={{ fontFamily: "VT323, monospace", fontSize: 22, color: "#ffce5b", margin: 0 }}>
          === STATS.SYS ===
        </p>
        <h2 style={{
          fontFamily: "Major Mono Display, monospace", fontSize: 44, lineHeight: 1,
          margin: "2px 0 0", textTransform: "lowercase", letterSpacing: "-0.02em",
          background: "linear-gradient(180deg,#fff,#c9d4ff,#6e8fff)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
        }}>{config.title}</h2>
      </div>
      <div style={{
        position: "relative", zIndex: 2, display: "grid",
        gridTemplateColumns: `repeat(${config.stats.length}, 1fr)`, gap: 12,
      }}>
        {config.stats.map((s, i) => {
          const { to, suffix } = parseStat(s);
          return (
            <div key={i} style={{
              border: "2px solid #fff", padding: "18px 12px",
              background: "linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))",
              boxShadow: "4px 4px 0 #ff7af2", textAlign: "center", position: "relative",
            }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{s.icon}</div>
              <div style={{
                fontFamily: "Major Mono Display, monospace", fontSize: 52, lineHeight: 1,
                fontWeight: 700, textShadow: "0 0 30px rgba(110,143,255,0.6)",
                background: "linear-gradient(180deg,#fff,#c9d4ff,#6e8fff)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>
                <Counter to={to} suffix={suffix} />
              </div>
              <div style={{
                marginTop: 8, fontFamily: "VT323, monospace", fontSize: 16,
                color: "#c7d3ff", textTransform: "uppercase", letterSpacing: "0.08em",
              }}>
                ► {s.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
