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
  bg: "#f3ecdd", panel: "#faf5ea", ink: "#211a12", sub: "#5c4e3a", mute: "#8a7a5e",
  accent: "#9a4a26", line: "#dccfb6", soft: "#ece2cd",
  fontBody: "'Newsreader', serif", fontHead: "'Instrument Serif', serif", fontMono: "'Geist Mono', monospace",
  radius: 2,
};

export function StatsEditorial({ config }: Props) {
  return (
    <div style={{
      width: "100%", height: "100%", background: skin.bg, color: skin.ink,
      fontFamily: skin.fontBody, padding: "40px 56px", boxSizing: "border-box",
    }}>
      <div style={{ textAlign: "center", borderBottom: `2px solid ${skin.ink}`, paddingBottom: 12, marginBottom: 28 }}>
        <p style={{
          fontFamily: skin.fontMono, fontSize: 10,
          letterSpacing: "0.25em", textTransform: "uppercase", color: skin.mute, margin: 0,
        }}>─── A ledger of work ───</p>
        <h2 style={{
          fontFamily: skin.fontHead, fontStyle: "italic", fontWeight: 400,
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
                fontFamily: skin.fontHead, fontSize: 96, fontWeight: 400,
                lineHeight: 0.9, margin: 0, letterSpacing: "-0.04em",
                color: i % 2 ? skin.accent : skin.ink,
              }}>
                <Counter to={to} suffix={suffix} />
              </p>
              <div style={{ width: 30, height: 1, background: skin.ink, margin: "16px auto 12px" }} />
              <p style={{
                margin: 0, fontFamily: skin.fontHead, fontSize: 16,
                fontStyle: "italic", color: skin.sub,
              }}>{s.label}</p>
            </div>
          );
        })}
      </div>
      <p style={{
        textAlign: "center", marginTop: 30, fontFamily: skin.fontHead,
        fontStyle: "italic", color: skin.mute, fontSize: 14,
      }}>
        — figures as of {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })} —
      </p>
    </div>
  );
}
