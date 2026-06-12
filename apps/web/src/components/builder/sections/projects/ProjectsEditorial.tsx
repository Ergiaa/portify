import { Icons } from "../../shared/Icons";

interface ContentItem {
  id: string;
  title: string;
  type: string;
  platform?: string | null;
  publishedAt?: Date | null;
  thumbnailUrl?: string | null;
  duration?: string | null;
}

interface Props {
  config: {
    title: string;
    limit: number;
    layout?: string;
    filterType?: string;
    viewAllLabel?: string;
    viewAllHref?: string;
    variant?: string;
  };
  items: ContentItem[];
}

const skin = {
  bg: "#f3ecdd", panel: "#faf5ea", ink: "#211a12", sub: "#5c4e3a", mute: "#8a7a5e",
  accent: "#9a4a26", line: "#dccfb6", soft: "#ece2cd",
  fontBody: "'Newsreader', serif", fontHead: "'Instrument Serif', serif", fontMono: "'Geist Mono', monospace",
  radius: 2,
};

const TYPE_COLOR: Record<string, string> = {
  video: "#9a4a26", article: "#5a8ae8", podcast: "#2e6b40", design: "#7a5e2e",
};

export function ProjectsEditorial({ config, items }: Props) {
  const featured = items[0];
  const rest = items.slice(1, 5);

  return (
    <div style={{
      width: "100%", height: "100%", background: skin.bg, color: skin.ink,
      fontFamily: skin.fontBody, padding: "36px 50px", boxSizing: "border-box",
      overflow: "hidden",
    }}>
      <style>{`.proj-mag-feat:hover h3{font-style:italic}.proj-mag-row:hover{transform:translateX(6px)}`}</style>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "baseline",
        borderBottom: `2px solid ${skin.ink}`, paddingBottom: 8, marginBottom: 18,
      }}>
        <h2 style={{
          fontFamily: skin.fontHead, fontStyle: "italic",
          fontSize: 44, lineHeight: 1, margin: 0, color: skin.ink,
        }}>{config.title}</h2>
        <a href={config.viewAllHref ?? "#"} style={{
          fontFamily: skin.fontMono, fontSize: 10,
          letterSpacing: "0.15em", textTransform: "uppercase", color: skin.mute,
          textDecoration: "none",
        }}>
          ☞ {config.viewAllLabel ?? "Browse archive"}
        </a>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 28, alignItems: "start" }}>
        {featured && (
          <article className="proj-mag-feat" style={{ cursor: "pointer" }}>
            <div style={{
              aspectRatio: "16/10", background: skin.soft, display: "flex",
              alignItems: "center", justifyContent: "center", filter: "sepia(0.1)",
              borderRadius: skin.radius, overflow: "hidden",
            }}>
              {featured.thumbnailUrl
                ? <img src={featured.thumbnailUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                : <div style={{ width: "100%", height: "100%", background: skin.soft, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontSize: 10, color: skin.mute }}>{featured.type}</span></div>
              }
            </div>
            <p style={{
              margin: "12px 0 4px", fontFamily: skin.fontMono,
              fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase",
              color: TYPE_COLOR[featured.type] ?? skin.accent,
            }}>
              ★ Cover story · {featured.type}
            </p>
            <h3 style={{
              fontFamily: skin.fontHead, fontSize: 32, fontWeight: 400,
              lineHeight: 1.05, margin: "0 0 8px", letterSpacing: "-0.02em", color: skin.ink,
            }}>{featured.title}</h3>
            <p style={{
              fontFamily: skin.fontHead, fontStyle: "italic",
              fontSize: 14, color: skin.mute, margin: 0,
            }}>
              {featured.duration ?? "—"} · {featured.publishedAt ? new Date(featured.publishedAt).getFullYear() : "—"}
            </p>
          </article>
        )}

        <div>
          {rest.map((item, i) => (
            <article key={item.id} className="proj-mag-row" style={{
              display: "grid", gridTemplateColumns: "44px 1fr auto", gap: 14, padding: "10px 0",
              borderBottom: `1px dotted ${skin.mute}`, cursor: "pointer",
              transition: "transform 200ms",
            }}>
              <span style={{
                fontFamily: skin.fontHead, fontStyle: "italic",
                fontSize: 26, color: TYPE_COLOR[item.type] ?? skin.accent,
              }}>{String(i + 2).padStart(2, "0")}</span>
              <div>
                <p style={{
                  fontFamily: skin.fontHead, fontSize: 17,
                  margin: 0, lineHeight: 1.2, color: skin.ink,
                }}>{item.title}</p>
                <p style={{
                  fontFamily: skin.fontMono, fontSize: 9,
                  letterSpacing: "0.1em", textTransform: "uppercase", color: skin.mute,
                  margin: "4px 0 0",
                }}>{item.type} · {item.duration ?? "—"}</p>
              </div>
              <Icons.arrowR style={{ alignSelf: "center", color: skin.ink }} />
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
