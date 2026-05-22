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

const TYPE_COLOR: Record<string, string> = {
  video: "#e85a5a", article: "#5a8ae8", podcast: "#5ae89a", design: "#e8c25a",
};

export function ProjectsEditorial({ config, items }: Props) {
  const featured = items[0];
  const rest = items.slice(1, 5);

  return (
    <div style={{
      width: "100%", height: "100%", background: "#f1ebdd", color: "#1a1410",
      fontFamily: "Newsreader, serif", padding: "36px 50px", boxSizing: "border-box",
      overflow: "hidden",
    }}>
      <style>{`.proj-mag-feat:hover h3{font-style:italic}.proj-mag-row:hover{transform:translateX(6px)}`}</style>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "baseline",
        borderBottom: "2px solid #1a1410", paddingBottom: 8, marginBottom: 18,
      }}>
        <h2 style={{
          fontFamily: "Instrument Serif, serif", fontStyle: "italic",
          fontSize: 44, lineHeight: 1, margin: 0,
        }}>{config.title}</h2>
        <span style={{
          fontFamily: "Geist Mono, monospace", fontSize: 10,
          letterSpacing: "0.15em", textTransform: "uppercase", color: "#6b5b48",
        }}>
          ☞ {config.viewAllLabel ?? "Browse archive"}
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 28, alignItems: "start" }}>
        {featured && (
          <article className="proj-mag-feat" style={{ cursor: "pointer" }}>
            <div style={{
              aspectRatio: "16/10", background: "#1e1e24", display: "flex",
              alignItems: "center", justifyContent: "center", filter: "sepia(0.25)",
              borderRadius: 2,
            }}>
              {featured.thumbnailUrl
                ? <img src={featured.thumbnailUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                : <div style={{ width: "100%", height: "100%", background: "#1e1e24", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontSize: 10, color: "#666" }}>{featured.type}</span></div>
              }
            </div>
            <p style={{
              margin: "12px 0 4px", fontFamily: "Geist Mono, monospace",
              fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase",
              color: TYPE_COLOR[featured.type] ?? "#888",
            }}>
              ★ Cover story · {featured.type}
            </p>
            <h3 style={{
              fontFamily: "Instrument Serif, serif", fontSize: 32, fontWeight: 400,
              lineHeight: 1.05, margin: "0 0 8px", letterSpacing: "-0.02em",
            }}>{featured.title}</h3>
            <p style={{
              fontFamily: "Instrument Serif, serif", fontStyle: "italic",
              fontSize: 14, color: "#6b5b48", margin: 0,
            }}>
              {featured.duration ?? "—"} · {featured.publishedAt ? new Date(featured.publishedAt).getFullYear() : "—"}
            </p>
          </article>
        )}

        <div>
          {rest.map((item, i) => (
            <article key={item.id} className="proj-mag-row" style={{
              display: "grid", gridTemplateColumns: "44px 1fr auto", gap: 14, padding: "10px 0",
              borderBottom: "1px dotted #8a7256", cursor: "pointer",
              transition: "transform 200ms",
            }}>
              <span style={{
                fontFamily: "Instrument Serif, serif", fontStyle: "italic",
                fontSize: 26, color: TYPE_COLOR[item.type] ?? "#888",
              }}>{String(i + 2).padStart(2, "0")}</span>
              <div>
                <p style={{
                  fontFamily: "Instrument Serif, serif", fontSize: 17,
                  margin: 0, lineHeight: 1.2,
                }}>{item.title}</p>
                <p style={{
                  fontFamily: "Geist Mono, monospace", fontSize: 9,
                  letterSpacing: "0.1em", textTransform: "uppercase", color: "#6b5b48",
                  margin: "4px 0 0",
                }}>{item.type} · {item.duration ?? "—"}</p>
              </div>
              <Icons.arrowR style={{ alignSelf: "center", color: "#1a1410" }} />
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
