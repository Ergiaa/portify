import { useEffect, useRef } from "react";

interface DataPoint {
  date: string;
  value: number;
}

interface Props {
  data: DataPoint[];
  color?: string;
  height?: number;
  gridColor?: string;
  labelColor?: string;
}

function fmtVal(n: number): string {
  if (n >= 1e6) return (n / 1e6).toFixed(1) + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(1) + "K";
  return String(n);
}

export function AnalyticsChart({
  data,
  color = "#6366f1",
  height = 220,
  gridColor = "#e5e5e5",
  labelColor = "#737373",
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || data.length === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.offsetWidth;
    const h = height;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    const padL = 48, padR = 16, padT = 16, padB = 32;
    const chartW = w - padL - padR;
    const chartH = h - padT - padB;

    const values = data.map((d) => d.value);
    const maxVal = Math.max(...values, 1);

    const xStep = chartW / Math.max(data.length - 1, 1);
    const px = (i: number) => padL + i * xStep;
    const py = (v: number) => padT + chartH - (v / maxVal) * chartH;

    // Gradient fill
    const grad = ctx.createLinearGradient(0, padT, 0, padT + chartH);
    grad.addColorStop(0, color + "40");
    grad.addColorStop(1, color + "00");

    ctx.beginPath();
    ctx.moveTo(px(0), py(values[0]));
    for (let i = 1; i < values.length; i++) {
      const cpx = (px(i - 1) + px(i)) / 2;
      ctx.bezierCurveTo(cpx, py(values[i - 1]), cpx, py(values[i]), px(i), py(values[i]));
    }
    ctx.lineTo(px(values.length - 1), padT + chartH);
    ctx.lineTo(px(0), padT + chartH);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    // Line
    ctx.beginPath();
    ctx.moveTo(px(0), py(values[0]));
    for (let i = 1; i < values.length; i++) {
      const cpx = (px(i - 1) + px(i)) / 2;
      ctx.bezierCurveTo(cpx, py(values[i - 1]), cpx, py(values[i]), px(i), py(values[i]));
    }
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Y-axis labels + grid
    ctx.font = "11px ui-monospace, monospace";
    ctx.textAlign = "right";
    for (let tick = 0; tick <= 4; tick++) {
      const v = (maxVal * tick) / 4;
      const y = py(v);
      ctx.fillStyle = labelColor;
      ctx.fillText(fmtVal(Math.round(v)), padL - 6, y + 4);
      ctx.beginPath();
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 0.5;
      ctx.moveTo(padL, y);
      ctx.lineTo(padL + chartW, y);
      ctx.stroke();
    }

    // X-axis labels
    const labelCount = Math.min(6, data.length);
    const step = Math.max(1, Math.floor((data.length - 1) / (labelCount - 1)));
    ctx.textAlign = "center";
    ctx.fillStyle = labelColor;
    for (let i = 0; i < data.length; i += step) {
      const d = new Date(data[i].date);
      ctx.fillText(`${d.getMonth() + 1}/${d.getDate()}`, px(i), h - 8);
    }
  }, [data, color, height, gridColor, labelColor]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: `${height}px`, display: "block" }}
    />
  );
}
