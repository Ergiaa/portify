import { Icons } from "../../shared/Icons";

interface Props {
  config: {
    title: string;
    description?: string;
    availability?: string;
    email: string;
    phone?: string;
    socials: { platform: string; url: string }[];
    variant?: string;
  };
}

const skin = {
  bg: "#f6f5f1", panel: "#ffffff", ink: "#16150f", sub: "#56544b", mute: "#94917f",
  accent: "#16150f", line: "#deded4", soft: "#edece4",
  fontBody: "'Geist', sans-serif", fontHead: "'Geist', sans-serif", fontMono: "'Geist Mono', monospace",
  radius: 0,
};

export function ContactSwiss({ config }: Props) {
  return (
    <div style={{
      width: "100%", height: "100%", background: skin.bg, color: skin.ink,
      fontFamily: skin.fontBody, padding: "48px 64px", boxSizing: "border-box",
      display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignContent: "center",
    }}>
      <div style={{ borderTop: `1px solid ${skin.ink}`, paddingTop: 18 }}>
        <p style={{
          fontFamily: skin.fontMono, fontSize: 11, color: skin.mute,
          letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 8px",
        }}>§ 06 — Contact</p>
        <h2 style={{
          fontSize: 52, fontWeight: 500, letterSpacing: "-0.03em",
          lineHeight: 1.02, margin: "16px 0 0", color: skin.ink,
        }}>
          {config.title}.
        </h2>
        {config.description && (
          <p style={{ marginTop: 16, color: skin.sub, fontSize: 15, maxWidth: 380, lineHeight: 1.5 }}>
            {config.description}
          </p>
        )}
        {config.availability && (
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8, marginTop: 18,
            padding: "5px 12px", border: `1px solid ${skin.ink}`, borderRadius: skin.radius,
            fontFamily: skin.fontMono, fontSize: 10, letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#27ae60" }} />
            {config.availability}
          </div>
        )}
      </div>
      <div style={{ borderTop: `1px solid ${skin.ink}`, paddingTop: 18 }}>
        <div style={{ marginBottom: 18 }}>
          <p style={{
            margin: 0, fontFamily: skin.fontMono, fontSize: 10,
            letterSpacing: "0.12em", textTransform: "uppercase", color: skin.mute,
          }}>Email</p>
          <a href={`mailto:${config.email}`} style={{
            fontSize: 22, color: skin.ink, textDecoration: "underline", textUnderlineOffset: 6,
            display: "inline-block", marginTop: 4,
          }}>{config.email}</a>
        </div>
        {config.phone && (
          <div style={{ marginBottom: 24 }}>
            <p style={{
              margin: 0, fontFamily: skin.fontMono, fontSize: 10,
              letterSpacing: "0.12em", textTransform: "uppercase", color: skin.mute,
            }}>Phone</p>
            <p style={{ margin: "4px 0 0", fontSize: 16, fontFamily: skin.fontMono, color: skin.ink }}>{config.phone}</p>
          </div>
        )}
        {config.socials.length > 0 && (
          <div style={{ borderTop: `1px solid ${skin.line}`, paddingTop: 14 }}>
            <p style={{
              margin: "0 0 10px", fontFamily: skin.fontMono, fontSize: 10,
              letterSpacing: "0.12em", textTransform: "uppercase", color: skin.mute,
            }}>Elsewhere</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 0 }}>
              {config.socials.map((s, i) => (
                <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" style={{
                  padding: "8px 14px", border: `1px solid ${skin.ink}`,
                  marginRight: -1, marginBottom: -1, color: skin.ink, textDecoration: "none",
                  fontSize: 13, fontWeight: 500, display: "inline-flex", alignItems: "center", gap: 4,
                }}>
                  {s.platform} <Icons.arrowUR />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
