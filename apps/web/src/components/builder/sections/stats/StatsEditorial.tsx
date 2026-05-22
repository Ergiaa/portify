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

export function StatsEditorial({ config }: Props) {
  return (
    <div style={{
      width: "100%", height: "100%", background: "#f1ebdd", color: "#1a1410",
      fontFamily: "Newsreader, serif", padding: "40px 56px", boxSizing: "border-box",
    }}>
      <div style={{ textAlign: "center" }}>
        <p style={{
          fontFamily: "Geist Mono, monospace", fontSize: 10,
          letterSpacing: "0.25em", textTransform: "uppercase", color: "#8a7256", margin: 0,
        }}>─── A ledger of work ───</p>
        <h2 style={{
          fontFamily: "Instrument Serif, serif", fontStyle: "italic", fontWeight: 400,
          fontSize: 56, lineHeight: 1, margin: "8px 0 0", letterSpacing: "-0.01em",
        }}>{config.title}</h2>
      </div>
      <div style={{
        display: "grid", gridTemplateColumns: `repeat(${config.stats.length}, 1fr)`,
        gap: 24, marginTop: 38, alignItems: "end",
      }}>
        {config.stats.map((s, i) => {
          const { to, suffix } = parseStat(s);
          return (
            <div key={i} style={{ textAlign: "center", position: "relative" }}>
              <p style={{
                fontFamily: "Instrument Serif, serif", fontSize: 96, fontWeight: 400,
                lineHeight: 0.9, margin: 0, letterSpacing: "-0.04em",
                color: i % 2 ? "#8a4a2a" : "#1a1410",
              }}>
                <Counter to={to} suffix={suffix} />
              </p>
              <div style={{ width: 30, height: 1, background: "#1a1410", margin: "16px auto 12px" }} />
              <p style={{
                margin: 0, fontFamily: "Instrument Serif, serif", fontSize: 16,
                fontStyle: "italic", color: "#3a2e22",
              }}>{s.label}</p>
            </div>
          );
        })}
      </div>
      <p style={{
        textAlign: "center", marginTop: 30, fontFamily: "Instrument Serif, serif",
        fontStyle: "italic", color: "#6b5b48", fontSize: 14,
      }}>
        — figures as of {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })} —
      </p>
    </div>
  );
}
