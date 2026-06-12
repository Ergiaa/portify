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

const skin = {
  bg: "#f6f5f1", panel: "#ffffff", ink: "#16150f", sub: "#56544b", mute: "#94917f",
  accent: "#16150f", line: "#deded4", soft: "#edece4",
  fontBody: "'Geist', sans-serif", fontHead: "'Geist', sans-serif", fontMono: "'Geist Mono', monospace",
  radius: 0,
};

export function AboutSwiss({ config }: Props) {
  return (
    <div style={{
      width: "100%", height: "100%", background: skin.bg, color: skin.ink,
      fontFamily: skin.fontBody, padding: "48px 64px", boxSizing: "border-box",
      display: "grid", gridTemplateColumns: "240px 1fr", gap: 56, alignContent: "start",
    }}>
      <div>
        <div style={{ aspectRatio: "3/4" }}>
          {config.photoUrl
            ? <img src={config.photoUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            : <div style={{ width: "100%", height: "100%", background: "#d8d4c8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: skin.mute }}>Photo</div>
          }
        </div>
        <div style={{ marginTop: 16, fontFamily: skin.fontMono, fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: skin.mute }}>
          Fig. 01 / Author
        </div>
      </div>

      <div>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "flex-end",
          borderBottom: `1px solid ${skin.ink}`, paddingBottom: 14, marginBottom: 28,
        }}>
          <div>
            <p style={{ margin: "0 0 8px", fontFamily: skin.fontMono, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: skin.mute }}>
              § 02 — {config.title || "About me"}
            </p>
            <h2 style={{ fontSize: 36, fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1.05, margin: 0 }}>
              {config.name}
            </h2>
          </div>
          <p style={{ margin: 0, fontFamily: skin.fontMono, fontSize: 11, color: skin.mute }}>2019—present</p>
        </div>
        <p style={{ fontSize: 16, fontStyle: "italic", color: skin.sub, margin: "0 0 18px" }}>{config.role}</p>
        <p style={{ fontSize: 16, lineHeight: 1.55, color: skin.sub, marginTop: 0, maxWidth: 540 }}>{config.bio}</p>

        {config.highlights && config.highlights.length > 0 && (
          <div style={{ marginTop: 28, borderTop: `1px solid ${skin.ink}` }}>
            {config.highlights.map((h, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "140px 1fr", padding: "12px 0", borderBottom: `1px solid ${skin.line}`, fontSize: 14 }}>
                <span style={{ color: skin.mute, fontFamily: skin.fontMono, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase" }}>{h.label}</span>
                <span style={{ color: skin.ink }}>{h.value}</span>
              </div>
            ))}
          </div>
        )}
        {config.ctaLabel && (
          <a href={config.ctaHref} style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 22, fontSize: 14, fontWeight: 500, color: skin.ink, textDecoration: "underline", textUnderlineOffset: 4 }}>
            {config.ctaLabel} <Icons.arrowR />
          </a>
        )}
      </div>
    </div>
  );
}
