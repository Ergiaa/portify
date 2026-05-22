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

export function AboutSwiss({ config }: Props) {
  return (
    <div style={{
      width: "100%", height: "100%", background: "#fff", color: "#111",
      fontFamily: "Geist, sans-serif", padding: "48px 64px", boxSizing: "border-box",
      display: "grid", gridTemplateColumns: "240px 1fr", gap: 56, alignContent: "start",
    }}>
      <div>
        <div style={{ aspectRatio: "3/4" }}>
          {config.photoUrl
            ? <img src={config.photoUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            : <div style={{ width: "100%", height: "100%", background: "#d8d4c8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#888" }}>Photo</div>
          }
        </div>
        <div style={{ marginTop: 16, fontFamily: "Geist Mono, monospace", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "#888" }}>
          Fig. 01 / Author
        </div>
      </div>

      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: "1px solid #111", paddingBottom: 14, marginBottom: 28 }}>
          <p style={{ margin: 0, fontFamily: "Geist Mono, monospace", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#888" }}>
            § 02 — {config.title || "About me"}
          </p>
          <p style={{ margin: 0, fontFamily: "Geist Mono, monospace", fontSize: 11, color: "#888" }}>2019—present</p>
        </div>
        <h2 style={{ fontSize: 44, fontWeight: 500, letterSpacing: "-0.03em", lineHeight: 1.05, margin: 0 }}>
          {config.name}, <span style={{ fontStyle: "italic", fontWeight: 300, color: "#666" }}>{config.role}.</span>
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.55, color: "#333", marginTop: 22, maxWidth: 540 }}>{config.bio}</p>

        {config.highlights && config.highlights.length > 0 && (
          <div style={{ marginTop: 28, borderTop: "1px solid #111" }}>
            {config.highlights.map((h, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "140px 1fr", padding: "12px 0", borderBottom: "1px solid #eee", fontSize: 14 }}>
                <span style={{ color: "#888", fontFamily: "Geist Mono, monospace", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase" }}>{h.label}</span>
                <span style={{ color: "#111" }}>{h.value}</span>
              </div>
            ))}
          </div>
        )}
        {config.ctaLabel && (
          <a href={config.ctaHref} style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 22, fontSize: 14, fontWeight: 500, color: "#111", textDecoration: "underline", textUnderlineOffset: 4 }}>
            {config.ctaLabel} <Icons.arrowR />
          </a>
        )}
      </div>
    </div>
  );
}
