import { Icons } from "../../shared/Icons";
import { Counter } from "../shared/Counter";

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
  bg: "#f1f0ea", panel: "#ffffff", ink: "#16161a", sub: "#54545c", mute: "#8a8a90",
  accent: "#16161a", line: "#e5e3db", soft: "#e9e8e1",
  fontBody: "'Geist', sans-serif", fontHead: "'Geist', sans-serif", fontMono: "'JetBrains Mono', monospace",
  radius: 20,
};

export function ContactBento({ config }: Props) {
  return (
    <div style={{
      width: "100%", height: "100%", background: skin.bg, color: skin.ink,
      fontFamily: skin.fontBody, padding: 24, boxSizing: "border-box",
      display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gridTemplateRows: "auto 1fr 1fr", gap: 14,
    }}>
      {/* Main card */}
      <div style={{
        gridColumn: "1", gridRow: "1 / 4",
        background: skin.panel, border: `1px solid ${skin.line}`,
        borderRadius: skin.radius, padding: 28,
        display: "flex", flexDirection: "column", justifyContent: "space-between",
      }}>
        <div>
          {config.availability && (
            <span style={{
              fontFamily: skin.fontMono, fontSize: 11,
              color: "#4dd884", letterSpacing: "0.1em", textTransform: "uppercase",
            }}>
              ● {config.availability}
            </span>
          )}
          <h2 style={{
            margin: "14px 0 8px", fontSize: 40, fontWeight: 800,
            letterSpacing: "-0.02em", lineHeight: 1.02, color: skin.ink,
          }}>{config.title}.</h2>
          {config.description && (
            <p style={{ color: skin.sub, fontSize: 14, lineHeight: 1.55, marginTop: 10 }}>
              {config.description}
            </p>
          )}
        </div>
        <a href={`mailto:${config.email}`} style={{
          padding: "14px 18px", borderRadius: 14, background: skin.ink,
          color: "#fff", textDecoration: "none", fontSize: 14, fontWeight: 600,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <span>{config.email}</span><Icons.arrowUR />
        </a>
      </div>

      {/* Avg reply tile — orange gradient */}
      <div style={{
        background: "linear-gradient(155deg,#ff9a52,#e0476b)", color: "#fff",
        borderRadius: skin.radius, padding: 18,
      }}>
        <div style={{
          fontFamily: skin.fontMono, fontSize: 10,
          textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.85,
        }}>Avg reply</div>
        <div style={{ fontSize: 36, fontWeight: 800, letterSpacing: "-0.02em", marginTop: 6 }}>
          <Counter to={4} />h
        </div>
        <div style={{ fontSize: 11, opacity: 0.85, marginTop: 2 }}>during weekdays</div>
      </div>

      {/* Phone card */}
      <div style={{
        background: skin.panel, border: `1px solid ${skin.line}`, borderRadius: skin.radius,
        padding: 18, display: "flex", flexDirection: "column", justifyContent: "space-between",
      }}>
        <Icons.phone style={{ color: "#4dd884" }} />
        <div>
          <div style={{
            fontFamily: skin.fontMono, fontSize: 10,
            color: skin.mute, textTransform: "uppercase", letterSpacing: "0.1em",
          }}>Phone</div>
          <div style={{ fontSize: 15, fontWeight: 600, marginTop: 4, color: skin.ink }}>{config.phone ?? "—"}</div>
        </div>
      </div>

      {/* Social grid */}
      <div style={{
        gridColumn: "2 / 4",
        background: skin.panel, border: `1px solid ${skin.line}`, borderRadius: skin.radius,
        padding: 14, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8,
      }}>
        {config.socials.map((s, i) => (
          <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" style={{
            padding: "16px 8px", borderRadius: 14,
            background: skin.soft,
            color: skin.ink, textDecoration: "none", textAlign: "center",
            fontSize: 12, fontWeight: 600,
          }}>
            <div style={{
              fontFamily: skin.fontMono, fontSize: 18, fontWeight: 700,
              marginBottom: 6, color: skin.sub,
            }}>
              {s.platform.slice(0, 2)}
            </div>
            {s.platform}
          </a>
        ))}
      </div>
    </div>
  );
}
