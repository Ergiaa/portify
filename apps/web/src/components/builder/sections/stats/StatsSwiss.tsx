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

export function StatsSwiss({ config }: Props) {
  return (
    <div style={{
      width: "100%", height: "100%", background: "#fafaf7", color: "#111",
      fontFamily: "Geist, sans-serif", padding: "44px 56px", boxSizing: "border-box",
    }}>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "baseline",
        borderBottom: "1px solid #111", paddingBottom: 14, marginBottom: 28,
      }}>
        <h2 style={{ fontSize: 34, fontWeight: 500, letterSpacing: "-0.02em", margin: 0 }}>{config.title}</h2>
        <p style={{
          margin: 0, fontFamily: "Geist Mono, monospace", fontSize: 11,
          color: "#888", letterSpacing: "0.1em", textTransform: "uppercase",
        }}>§ 04 — Stats</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${config.stats.length}, 1fr)`, gap: 0 }}>
        {config.stats.map((s, i) => {
          const { to, suffix } = parseStat(s);
          return (
            <div key={i} style={{
              padding: "16px 18px",
              borderRight: i < config.stats.length - 1 ? "1px solid #d8d4c8" : "none",
            }}>
              <p style={{
                fontFamily: "Geist Mono, monospace", fontSize: 10,
                letterSpacing: "0.12em", textTransform: "uppercase", color: "#888", margin: 0,
              }}>
                {String(i + 1).padStart(2, "0")} / {String(config.stats.length).padStart(2, "0")}
              </p>
              <p style={{ fontSize: 64, fontWeight: 500, letterSpacing: "-0.04em", margin: "14px 0 6px", lineHeight: 0.95 }}>
                <Counter to={to} suffix={suffix} />
              </p>
              <p style={{ margin: 0, fontSize: 13, color: "#444" }}>{s.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
