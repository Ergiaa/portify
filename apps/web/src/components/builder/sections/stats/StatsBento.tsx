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

const skin = {
  bg: "#f1f0ea", panel: "#ffffff", ink: "#16161a", sub: "#54545c", mute: "#8a8a90",
  accent: "#16161a", line: "#e5e3db", soft: "#e9e8e1",
  fontBody: "'Geist', sans-serif", fontHead: "'Geist', sans-serif", fontMono: "'JetBrains Mono', monospace",
  radius: 20,
};

const gradientTiles = [
  "linear-gradient(155deg,#ff9a52,#e0476b)",
  "#16161a",
  "linear-gradient(155deg,#54cf78,#1e8f4a)",
  "linear-gradient(155deg,#7eb6ff,#3a4fd6)",
];
const tileInk = ["#fff", "#fff", "#0a2410", "#fff"];

export function StatsBento({ config }: Props) {
  return (
    <div style={{
      width: "100%", height: "100%", background: skin.bg,
      fontFamily: skin.fontBody, padding: 24, boxSizing: "border-box",
      display: "grid", gridTemplateColumns: `repeat(${config.stats.length}, 1fr)`, gap: 14,
    }}>
      <div style={{
        gridColumn: "1 / -1", display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <div>
          <p style={{
            fontFamily: skin.fontMono, fontSize: 11, color: skin.mute,
            textTransform: "uppercase", letterSpacing: "0.1em", margin: 0,
          }}>{`> stats.live`}</p>
          <h2 style={{ fontSize: 32, fontWeight: 800, letterSpacing: "-0.02em", margin: "4px 0 0", color: skin.ink }}>
            {config.title}
          </h2>
        </div>
        <span style={{ fontSize: 12, color: skin.mute, fontFamily: skin.fontMono }}>
          {new Date().toLocaleDateString("en-US")} · auto-sync
        </span>
      </div>
      {config.stats.map((s, i) => {
        const { to, suffix } = parseStat(s);
        const bg = gradientTiles[i % gradientTiles.length];
        const fg = tileInk[i % tileInk.length];
        return (
          <div key={i} style={{
            background: bg, color: fg,
            borderRadius: skin.radius, padding: 20,
            display: "flex", flexDirection: "column", justifyContent: "space-between",
            minHeight: 200, position: "relative", overflow: "hidden",
          }}>
            <div style={{
              display: "flex", justifyContent: "space-between",
              fontSize: 11, opacity: 0.85, fontFamily: skin.fontMono,
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
