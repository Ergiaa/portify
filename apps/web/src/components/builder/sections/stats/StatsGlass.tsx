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
  bg: "#eef0f7", panel: "rgba(255,255,255,0.55)", ink: "#241d3a", sub: "#534c70", mute: "#837da0",
  accent: "#6d5cf5", line: "rgba(109,92,245,0.18)", soft: "rgba(255,255,255,0.4)",
  fontBody: "'Plus Jakarta Sans', sans-serif", fontHead: "'Plus Jakarta Sans', sans-serif", fontMono: "'Geist Mono', monospace",
  radius: 20,
  blobA: "rgba(167,139,255,0.45)", blobB: "rgba(120,182,255,0.40)",
};

export function StatsGlass({ config }: Props) {
  return (
    <div style={{
      width: "100%", height: "100%",
      background: skin.bg,
      fontFamily: skin.fontBody, color: skin.ink,
      padding: 36, boxSizing: "border-box", position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", width: 320, height: 320, borderRadius: "50%",
        background: `radial-gradient(circle, ${skin.blobA} 0%, transparent 70%)`,
        top: -80, left: -60, pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", width: 280, height: 280, borderRadius: "50%",
        background: `radial-gradient(circle, ${skin.blobB} 0%, transparent 70%)`,
        bottom: -80, right: -40, pointerEvents: "none",
      }} />
      <div style={{ position: "relative", zIndex: 2, textAlign: "center", marginBottom: 22 }}>
        <h2 style={{ margin: 0, fontSize: 38, fontWeight: 800, letterSpacing: "-0.02em", color: skin.ink }}>{config.title}</h2>
        {config.description && (
          <p style={{ margin: "6px 0 0", color: skin.mute, fontSize: 14 }}>{config.description}</p>
        )}
      </div>
      <div style={{
        position: "relative", zIndex: 2, display: "grid",
        gridTemplateColumns: `repeat(${config.stats.length}, 1fr)`, gap: 14,
      }}>
        {config.stats.map((s, i) => {
          const { to, suffix } = parseStat(s);
          return (
            <div key={i} style={{
              background: "rgba(255,255,255,0.55)", backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.75)", borderRadius: 24, padding: 22,
              boxShadow: "0 16px 40px -16px rgba(36,29,58,0.12)",
              textAlign: "center",
            }}>
              <div style={{
                width: 44, height: 44, margin: "0 auto 10px", borderRadius: "50%",
                background: "linear-gradient(135deg,#a78bff,#ff7ac0)", display: "grid",
                placeItems: "center", color: "#fff", fontSize: 18,
                boxShadow: "0 6px 16px -4px rgba(167,139,255,0.5)",
              }}>{s.icon}</div>
              <div style={{ fontSize: 42, fontWeight: 800, letterSpacing: "-0.03em", color: skin.ink, lineHeight: 1 }}>
                <Counter to={to} suffix={suffix} />
              </div>
              <div style={{ fontSize: 12, color: skin.mute, marginTop: 6, fontWeight: 500 }}>{s.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
