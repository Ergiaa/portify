import { Icons } from "../../shared/Icons";

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
  bg: "#f3ecdd", panel: "#faf5ea", ink: "#211a12", sub: "#5c4e3a", mute: "#8a7a5e",
  accent: "#9a4a26", line: "#dccfb6", soft: "#ece2cd",
  fontBody: "'Newsreader', serif", fontHead: "'Instrument Serif', serif", fontMono: "'Geist Mono', monospace",
  radius: 2,
};

export function SkillsEditorial({ config }: Props) {
  return (
    <div style={{
      width: "100%", height: "100%", background: skin.bg, color: skin.ink,
      fontFamily: skin.fontBody, padding: "40px 56px", boxSizing: "border-box",
    }}>
      <div style={{ textAlign: "center", borderBottom: `2px solid ${skin.ink}`, paddingBottom: 18, marginBottom: 28 }}>
        <p style={{
          fontFamily: skin.fontMono, fontSize: 10,
          letterSpacing: "0.2em", textTransform: "uppercase", color: skin.mute, margin: 0,
        }}>— Chapter III —</p>
        <h2 style={{
          fontFamily: skin.fontHead, fontWeight: 400, fontStyle: "italic",
          fontSize: 52, lineHeight: 1, margin: "6px 0 8px",
        }}>{config.title}</h2>
        {config.description && (
          <p style={{ margin: 0, fontFamily: skin.fontBody, fontSize: 15, color: skin.sub }}>
            {config.description}
          </p>
        )}
      </div>
      <div style={{ columnCount: 2, columnGap: 40 }}>
        {config.skills.map((s, i) => (
          <div key={i} style={{
            breakInside: "avoid", marginBottom: 18, display: "flex",
            alignItems: "baseline", justifyContent: "space-between",
            borderBottom: `1px dotted ${skin.mute}`, paddingBottom: 8,
          }}>
            <span style={{ fontFamily: skin.fontHead, fontSize: 22, fontStyle: "italic", color: skin.ink }}>
              {s.name}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 2 }}>
              {Array.from({ length: 5 }).map((_, k) => (
                <Icons.star key={k} style={{
                  width: 14, height: 14,
                  color: s.level / 20 > k ? skin.ink : "transparent",
                  stroke: skin.ink, strokeWidth: 1,
                  fill: s.level / 20 > k ? skin.ink : "none",
                }} />
              ))}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
