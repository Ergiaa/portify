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

export function SkillsEditorial({ config }: Props) {
  return (
    <div style={{
      width: "100%", height: "100%", background: "#f1ebdd", color: "#1a1410",
      fontFamily: "Newsreader, serif", padding: "40px 56px", boxSizing: "border-box",
    }}>
      <div style={{ textAlign: "center", borderBottom: "2px solid #1a1410", paddingBottom: 18, marginBottom: 28 }}>
        <p style={{
          fontFamily: "Geist Mono, monospace", fontSize: 10,
          letterSpacing: "0.2em", textTransform: "uppercase", color: "#8a7256", margin: 0,
        }}>Chapter III</p>
        <h2 style={{
          fontFamily: "Instrument Serif, serif", fontWeight: 400, fontStyle: "italic",
          fontSize: 52, lineHeight: 1, margin: "6px 0 8px",
        }}>{config.title}</h2>
        {config.description && (
          <p style={{ margin: 0, fontFamily: "Newsreader, serif", fontSize: 15, color: "#5a4830" }}>
            {config.description}
          </p>
        )}
      </div>
      <div style={{ columnCount: 2, columnGap: 40 }}>
        {config.skills.map((s, i) => (
          <div key={i} style={{
            breakInside: "avoid", marginBottom: 18, display: "flex",
            alignItems: "baseline", justifyContent: "space-between",
            borderBottom: "1px dotted #5a4830", paddingBottom: 8,
          }}>
            <span style={{ fontFamily: "Instrument Serif, serif", fontSize: 22, fontStyle: "italic" }}>
              {s.name}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 2 }}>
              {Array.from({ length: 5 }).map((_, k) => (
                <Icons.star key={k} style={{
                  width: 14, height: 14,
                  color: s.level / 20 > k ? "#1a1410" : "transparent",
                  stroke: "#1a1410", strokeWidth: 1,
                  fill: s.level / 20 > k ? "#1a1410" : "none",
                }} />
              ))}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
