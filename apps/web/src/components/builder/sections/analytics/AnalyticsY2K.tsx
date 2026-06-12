import { AnalyticsChart } from "./AnalyticsChart";

interface DataPoint {
  date: string;
  value: number;
}

interface Props {
  config: {
    title?: string;
    description?: string;
    metric?: string;
    period?: string;
    showTable?: boolean;
  };
  data: DataPoint[];
  loading?: boolean;
}

const METRIC_LABELS: Record<string, string> = {
  videoViews: "Video Views",
  likes: "Likes",
  shares: "Shares",
  comments: "Comments",
};

function fmtNum(n: number): string {
  if (n >= 1e6) return (n / 1e6).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(1).replace(/\.0$/, "") + "K";
  return Math.round(n).toLocaleString();
}

const skin = {
  bg: "#edeef6", panel: "#ffffff", ink: "#18182a", sub: "#4a4a66", mute: "#86869e",
  accent: "#5b4bff", line: "#18182a", soft: "#e3e4f1",
  altPink: "#ff45bf", altCyan: "#00b6c7", altGold: "#e8a400",
  fontBody: "'Space Grotesk', sans-serif",
  fontHead: "'Major Mono Display', monospace",
  fontMono: "'VT323', monospace",
};

const chromeStyle: React.CSSProperties = {
  background: "linear-gradient(162deg,#2a2a45 0%,#9398d8 24%,#3a3a5c 44%,#cf94da 64%,#3a3a5c 86%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  color: "transparent",
};

const STAT_SHADOWS = ["#ff45bf", "#00b6c7", "#e8a400"];

export function AnalyticsY2K({ config, data, loading }: Props) {
  const metricLabel = METRIC_LABELS[config.metric ?? "videoViews"] ?? "Value";
  const total = data.reduce((s, d) => s + d.value, 0);
  const peak  = data.reduce((m, d) => (d.value > m.value ? d : m), { date: "", value: 0 });
  const avg   = data.length > 0 ? Math.round(total / data.length) : 0;

  const statCards = [
    { key: "TOTAL",     value: fmtNum(total)      },
    { key: "DAILY_AVG", value: fmtNum(avg)          },
    { key: "PEAK_DAY",  value: fmtNum(peak.value)  },
  ];

  return (
    <div style={{
      background: skin.bg, color: skin.ink, fontFamily: skin.fontBody,
      padding: 26, position: "relative", overflow: "hidden",
    }}>
      <style>{`@keyframes y2kBlinkA{50%{opacity:0}}`}</style>

      {/* Grid background */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `linear-gradient(rgba(91,75,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(91,75,255,0.05) 1px, transparent 1px)`,
        backgroundSize: "34px 34px",
      }} />
      {/* Scanlines */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `repeating-linear-gradient(0deg, rgba(24,24,42,0.035) 0px, rgba(24,24,42,0.035) 1px, transparent 1px, transparent 3px)`,
      }} />

      <div style={{ position: "relative", zIndex: 2 }}>
        {/* Terminal header bar */}
        <div style={{
          display: "flex", justifyContent: "space-between",
          fontFamily: skin.fontMono, fontSize: 18, color: skin.sub,
          borderBottom: `1px solid ${skin.accent}`, paddingBottom: 8, marginBottom: 18,
        }}>
          <span style={{ color: skin.accent }}>★ ANALYTICS.EXE</span>
          <span>{(config.period ?? "30d").toUpperCase()} :: {metricLabel.replace(/ /g, "_").toUpperCase()}</span>
          <span style={{ color: skin.altPink, animation: "y2kBlinkA 1.1s step-end infinite" }}>■</span>
        </div>

        {/* Title */}
        <h2 style={{
          ...chromeStyle,
          fontFamily: skin.fontHead, fontSize: 36, lineHeight: 1,
          textTransform: "lowercase", marginBottom: 18,
        }}>
          {config.title ?? "My Growth"}
        </h2>

        {/* Stat cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 14 }}>
          {statCards.map((s, i) => (
            <div key={s.key} style={{
              border: `2px solid ${skin.accent}`, background: skin.panel,
              padding: 12, boxShadow: `3px 3px 0 ${STAT_SHADOWS[i]}`,
            }}>
              <div style={{
                fontFamily: skin.fontMono, fontSize: 14, color: skin.sub,
                letterSpacing: "0.06em", marginBottom: 5,
              }}>
                {`>> ${s.key}`}
              </div>
              <div style={{ ...chromeStyle, fontFamily: skin.fontHead, fontSize: 36, lineHeight: 1 }}>
                {loading ? "—" : s.value}
              </div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div style={{
          border: `2px solid ${skin.accent}`, background: skin.panel,
          boxShadow: `4px 4px 0 ${skin.altPink}`, padding: "12px 10px 6px",
          marginBottom: config.showTable ? 12 : 0,
        }}>
          <div style={{
            fontFamily: skin.fontMono, fontSize: 15, color: skin.accent,
            marginBottom: 4, letterSpacing: "0.06em",
          }}>
            {`> PLOTTING ${metricLabel.replace(/ /g, "_").toUpperCase()}...`}
          </div>
          {loading ? (
            <div style={{ height: 160, display: "flex", alignItems: "center", justifyContent: "center", color: skin.mute, fontFamily: skin.fontMono, fontSize: 18 }}>
              LOADING...
            </div>
          ) : data.length === 0 ? (
            <div style={{ height: 160, display: "flex", alignItems: "center", justifyContent: "center", color: skin.mute, fontFamily: skin.fontMono, fontSize: 18 }}>
              NO DATA FOUND
            </div>
          ) : (
            <AnalyticsChart data={data} color={skin.altCyan} height={160} gridColor="rgba(91,75,255,0.12)" labelColor={skin.mute} />
          )}
        </div>

        {/* Table */}
        {config.showTable && data.length > 0 && (
          <div style={{ border: `1px solid ${skin.line}`, overflow: "hidden", borderRadius: 4 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: skin.fontMono, fontSize: 15 }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${skin.line}`, background: skin.soft }}>
                  <th style={{ padding: "8px 14px", textAlign: "left", color: skin.mute, fontWeight: 400, letterSpacing: "0.08em" }}>DATE</th>
                  <th style={{ padding: "8px 14px", textAlign: "right", color: skin.mute, fontWeight: 400, letterSpacing: "0.08em" }}>{metricLabel.toUpperCase()}</th>
                </tr>
              </thead>
              <tbody>
                {[...data].reverse().slice(0, 7).map((row, i, arr) => (
                  <tr key={row.date} style={{ borderBottom: i < arr.length - 1 ? `1px solid ${skin.soft}` : "none" }}>
                    <td style={{ padding: "6px 14px", color: skin.sub }}>{row.date}</td>
                    <td style={{ padding: "6px 14px", textAlign: "right", color: skin.accent, fontWeight: 600 }}>{fmtNum(row.value)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
