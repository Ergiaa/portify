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

export function StatsBento({ config }: Props) {
  const colors = [
    "linear-gradient(160deg,#ff8a4d,#c2386e)",
    "#0d0d0f",
    "linear-gradient(160deg,#76e07a,#1e8f4a)",
    "linear-gradient(160deg,#7eb6ff,#3a4fd6)",
  ];

  return (
    <div style={{
      width: "100%", height: "100%", background: "#f5f4f0",
      fontFamily: "Geist, sans-serif", padding: 24, boxSizing: "border-box",
      display: "grid", gridTemplateColumns: `repeat(${config.stats.length}, 1fr)`, gap: 14,
    }}>
      <div style={{
        gridColumn: "1 / -1", display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <div>
          <p style={{
            fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "#888",
            textTransform: "uppercase", letterSpacing: "0.1em", margin: 0,
          }}>{`> stats.live`}</p>
          <h2 style={{ fontSize: 32, fontWeight: 800, letterSpacing: "-0.02em", margin: "4px 0 0" }}>
            {config.title}
          </h2>
        </div>
        <span style={{ fontSize: 12, color: "#888", fontFamily: "JetBrains Mono, monospace" }}>
          {new Date().toLocaleDateString("en-US")} · auto-sync
        </span>
      </div>
      {config.stats.map((s, i) => {
        const { to, suffix } = parseStat(s);
        const isDark = i === 1;
        return (
          <div key={i} style={{
            background: colors[i % colors.length],
            color: isDark ? "#fff" : (i === 0 || i === 3 ? "#fff" : "#0d2010"),
            borderRadius: 22, padding: 20,
            display: "flex", flexDirection: "column", justifyContent: "space-between",
            border: isDark ? "1px solid #232328" : "none",
            minHeight: 200, position: "relative", overflow: "hidden",
          }}>
            <div style={{
              display: "flex", justifyContent: "space-between",
              fontSize: 11, opacity: 0.85, fontFamily: "JetBrains Mono, monospace",
              textTransform: "uppercase", letterSpacing: "0.1em",
            }}>
              <span>{s.icon} {s.label}</span>
              <span>↑ {Math.round(to * 0.08)}%</span>
            </div>
            <div>
              <div style={{ fontSize: 64, fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1 }}>
                <Counter to={to} suffix={suffix} />
              </div>
              <svg viewBox="0 0 100 24" style={{ width: "100%", height: 24, marginTop: 6, opacity: 0.7 }}>
                <polyline points="0,18 12,14 24,16 36,10 48,12 60,6 72,8 84,3 100,5"
                  fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        );
      })}
    </div>
  );
}
