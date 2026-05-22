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

const SOCIAL_COLORS = ["#76e07a", "#ff8a4d", "#7eb6ff", "#c9c9d4"];

export function ContactBento({ config }: Props) {
  return (
    <div style={{
      width: "100%", height: "100%", background: "#0d0d0f", color: "#fff",
      fontFamily: "Geist, sans-serif", padding: 24, boxSizing: "border-box",
      display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gridTemplateRows: "auto 1fr 1fr", gap: 14,
    }}>
      <div style={{
        gridColumn: "1", gridRow: "1 / 4",
        background: "linear-gradient(160deg,#1a1a1e 0%,#0d0d0f 100%)",
        border: "1px solid #232328", borderRadius: 24, padding: 28,
        display: "flex", flexDirection: "column", justifyContent: "space-between",
      }}>
        <div>
          {config.availability && (
            <span style={{
              fontFamily: "JetBrains Mono, monospace", fontSize: 11,
              color: "#76e07a", letterSpacing: "0.1em", textTransform: "uppercase",
            }}>
              ● {config.availability}
            </span>
          )}
          <h2 style={{
            margin: "14px 0 8px", fontSize: 40, fontWeight: 800,
            letterSpacing: "-0.02em", lineHeight: 1.02,
          }}>{config.title}.</h2>
          {config.description && (
            <p style={{ color: "#a8a8b3", fontSize: 14, lineHeight: 1.55, marginTop: 10 }}>
              {config.description}
            </p>
          )}
        </div>
        <a href={`mailto:${config.email}`} style={{
          padding: "14px 18px", borderRadius: 14, background: "#fff",
          color: "#0d0d0f", textDecoration: "none", fontSize: 14, fontWeight: 600,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <span>{config.email}</span><Icons.arrowUR />
        </a>
      </div>

      <div style={{
        background: "linear-gradient(160deg,#ff8a4d,#c2386e)", color: "#fff",
        borderRadius: 22, padding: 18,
      }}>
        <div style={{
          fontFamily: "JetBrains Mono, monospace", fontSize: 10,
          textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.85,
        }}>Avg reply</div>
        <div style={{ fontSize: 36, fontWeight: 800, letterSpacing: "-0.02em", marginTop: 6 }}>
          <Counter to={4} />h
        </div>
        <div style={{ fontSize: 11, opacity: 0.85, marginTop: 2 }}>during weekdays</div>
      </div>

      <div style={{
        background: "#16161a", border: "1px solid #232328", borderRadius: 22,
        padding: 18, display: "flex", flexDirection: "column", justifyContent: "space-between",
      }}>
        <Icons.phone style={{ color: "#76e07a" }} />
        <div>
          <div style={{
            fontFamily: "JetBrains Mono, monospace", fontSize: 10,
            color: "#777", textTransform: "uppercase", letterSpacing: "0.1em",
          }}>Phone</div>
          <div style={{ fontSize: 15, fontWeight: 600, marginTop: 4 }}>{config.phone ?? "—"}</div>
        </div>
      </div>

      <div style={{
        gridColumn: "2 / 4",
        background: "#16161a", border: "1px solid #232328", borderRadius: 22,
        padding: 14, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8,
      }}>
        {config.socials.map((s, i) => (
          <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" style={{
            padding: "16px 8px", borderRadius: 14,
            background: "#1f1f24",
            color: "#fff", textDecoration: "none", textAlign: "center",
            fontSize: 12, fontWeight: 600,
          }}>
            <div style={{
              fontFamily: "JetBrains Mono, monospace", fontSize: 18, fontWeight: 700,
              marginBottom: 6, color: SOCIAL_COLORS[i % SOCIAL_COLORS.length],
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
