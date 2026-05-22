import { Icons } from "../../shared/Icons";

interface Props {
  config: {
    title?: string;
    name?: string;
    role?: string;
    bio: string;
    photoUrl: string;
    photoPosition?: "left" | "right";
    highlights?: { label: string; value: string }[];
    ctaLabel?: string;
    ctaHref?: string;
    variant?: string;
  };
}

const TILE_COLORS = [
  { bg: "#ff8a4d", fg: "#fff" },
  { bg: "#0d0d0f", fg: "#fff" },
  { bg: "#e7e3d4", fg: "#0d0d0f" },
  { bg: "#76e07a", fg: "#0d3010" },
];

export function AboutBento({ config }: Props) {
  const highlights = config.highlights ?? [];

  return (
    <div style={{
      width: "100%", height: "100%", background: "#f5f4f0", color: "#0d0d0f",
      fontFamily: "Geist, sans-serif", padding: 24, boxSizing: "border-box",
      display: "grid",
      gridTemplateColumns: "1.6fr 1fr 1fr",
      gridTemplateRows: "auto 1fr 1fr",
      gap: 14,
    }}>
      <div style={{
        gridColumn: "1", gridRow: "1 / 4",
        background: "#fff", borderRadius: 24, padding: 28, border: "1px solid #e6e4dd",
        display: "flex", flexDirection: "column", gap: 18,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 64, height: 64, borderRadius: 16, overflow: "hidden", flexShrink: 0 }}>
            {config.photoUrl
              ? <img src={config.photoUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              : <div style={{ width: "100%", height: "100%", background: "#d8d4c8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#888" }}>Photo</div>
            }
          </div>
          <div>
            <div style={{ fontSize: 11, color: "#888", fontFamily: "JetBrains Mono, monospace", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              {config.title || "About me"}
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.01em" }}>{config.name}</div>
            <div style={{ fontSize: 12, color: "#666" }}>{config.role}</div>
          </div>
        </div>
        <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: "#333" }}>{config.bio}</p>
        {config.ctaLabel && (
          <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: "#f5f4f0", borderRadius: 14 }}>
            <a href={config.ctaHref} style={{ fontSize: 13, fontWeight: 500, color: "#0d0d0f", textDecoration: "none" }}>{config.ctaLabel}</a>
            <Icons.arrowUR />
          </div>
        )}
      </div>

      {highlights.slice(0, 4).map((h, i) => {
        const colors = TILE_COLORS[i] ?? { bg: "#e7e3d4", fg: "#0d0d0f" };
        return (
          <div key={i} style={{ background: colors.bg, color: colors.fg, borderRadius: 24, padding: 20, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div style={{ fontSize: 11, opacity: 0.7, fontFamily: "JetBrains Mono, monospace", textTransform: "uppercase", letterSpacing: "0.1em" }}>{h.label}</div>
            <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.01em", lineHeight: 1.1 }}>{h.value}</div>
          </div>
        );
      })}

      <div style={{
        gridColumn: "2 / 4", gridRow: "1 / 2",
        background: "#0d0d0f", color: "#fff", borderRadius: 24, padding: 16,
        display: "flex", gap: 14, alignItems: "center",
      }}>
        <div style={{ width: 64, height: 64, borderRadius: 14, overflow: "hidden", flexShrink: 0 }}>
          {config.photoUrl
            ? <img src={config.photoUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            : <div style={{ width: "100%", height: "100%", background: "#d8d4c8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#888" }}>Photo</div>
          }
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: "#76e07a", fontFamily: "JetBrains Mono, monospace", textTransform: "uppercase", letterSpacing: "0.1em" }}>● At the studio</div>
          <div style={{ fontSize: 14, fontWeight: 600, marginTop: 2 }}>Available for projects</div>
        </div>
        <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "#888" }}>
          {new Date().toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short" })}
        </div>
      </div>
    </div>
  );
}
