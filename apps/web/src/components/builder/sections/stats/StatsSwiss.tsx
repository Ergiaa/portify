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
  bg: "#f6f5f1", panel: "#ffffff", ink: "#16150f", sub: "#56544b", mute: "#94917f",
  accent: "#16150f", line: "#deded4", soft: "#edece4",
  fontBody: "'Geist', sans-serif", fontHead: "'Geist', sans-serif", fontMono: "'Geist Mono', monospace",
  radius: 0,
};

export function StatsSwiss({ config }: Props) {
  return (
    <div style={{
      width: "100%", height: "100%", background: skin.bg, color: skin.ink,
      fontFamily: skin.fontBody, padding: "44px 56px", boxSizing: "border-box",
    }}>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "flex-end",
        borderBottom: `1px solid ${skin.ink}`, paddingBottom: 14, marginBottom: 28,
      }}>
        <div>
          <p style={{ margin: "0 0 8px", fontFamily: skin.fontMono, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: skin.mute }}>
            § 04 — Stats
          </p>
          <h2 style={{ fontSize: 36, fontWeight: 500, letterSpacing: "-0.02em", margin: 0 }}>{config.title}</h2>
        </div>
        <p style={{ margin: 0, fontFamily: skin.fontMono, fontSize: 11, color: skin.mute, letterSpacing: "0.1em", textTransform: "uppercase" }}>
          {config.stats.length} figures
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${config.stats.length}, 1fr)`, gap: 0 }}>
        {config.stats.map((s, i) => {
          const { to, suffix } = parseStat(s);
          return (
            <div key={i} style={{
              padding: "16px 18px",
              borderRight: i < config.stats.length - 1 ? `1px solid ${skin.line}` : "none",
            }}>
              <p style={{
                fontFamily: skin.fontMono, fontSize: 10,
                letterSpacing: "0.12em", textTransform: "uppercase", color: skin.mute, margin: 0,
              }}>
                {String(i + 1).padStart(2, "0")} / {String(config.stats.length).padStart(2, "0")}
              </p>
              <p style={{ fontSize: 64, fontWeight: 500, letterSpacing: "-0.04em", margin: "14px 0 6px", lineHeight: 0.95, color: skin.ink }}>
                <Counter to={to} suffix={suffix} />
              </p>
              <p style={{ margin: 0, fontSize: 13, color: skin.sub }}>{s.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
