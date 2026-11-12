import type { CSSProperties } from "react";
import type { ExpertiseItem } from "@/lib/schemas";
import { cn } from "@/lib/utils";

/*
 * Small animated diagrams showing how each feature works. Pure SVG + CSS
 * keyframes (globals.css, `xp-*`), themed via design tokens so they work in
 * light and dark mode. Animations are `motion-safe:` only, so the static
 * frame is a complete picture under reduced motion.
 */

const W = 280;
const mono = "font-mono";
const tiny: CSSProperties = { fontSize: 9 };
const delay = (s: number): CSSProperties => ({ animationDelay: `${s}s` });

function Frame({
  h,
  w = W,
  label,
  className,
  children,
}: {
  h: number;
  w?: number;
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      role="img"
      aria-label={label}
      className={cn("block w-full rounded-lg border border-border bg-bg", className)}
    >
      {children}
    </svg>
  );
}

/* ---------- HLS streaming: buffering segments, playhead, clip range ---------- */
function StreamVisual({ h }: { h: number }) {
  const bottom = h - 20;
  return (
    <Frame h={h} label="HLS player buffering video segments while a clip range is selected">
      <rect x="10" y="10" width="260" height={h - 50} rx="4" className="fill-surface" />
      <rect x="18" y="17" width="34" height="13" rx="3" className="fill-alert/20" />
      <circle cx="25" cy="23.5" r="2.5" className="fill-alert motion-safe:animate-live-pulse" />
      <text x="31" y="27" className={cn(mono, "fill-alert")} style={tiny}>
        LIVE
      </text>
      <text x="262" y="27" textAnchor="end" className={cn(mono, "fill-muted")} style={tiny}>
        720p · hls
      </text>
      <path d={`M128 ${(h - 50) / 2 - 2} l18 11 l-18 11z`} className="fill-accent opacity-80" />
      {Array.from({ length: 8 }, (_, i) => (
        <rect
          key={i}
          x={30 + i * 28}
          y={bottom - 12}
          width="24"
          height="6"
          rx="2"
          className="fill-accent motion-safe:animate-xp-segment"
          style={delay(i * 0.3)}
        />
      ))}
      <rect x="88" y={bottom - 2} width="90" height="4" rx="2" className="fill-live/35" />
      <line x1="30" y1={bottom} x2="250" y2={bottom} strokeWidth="2" className="stroke-border" />
      <circle cx="30" cy={bottom} r="4" className="fill-accent motion-safe:animate-xp-playhead" />
      <text x="140" y={h - 6} textAnchor="middle" className={cn(mono, "fill-live")} style={tiny}>
        clip 00:42 → 01:18
      </text>
    </Frame>
  );
}

/* ---------- AI surveillance: detections, scan line, OCR/LLM output ---------- */
function DetectionVisual({ h, w = W }: { h: number; w?: number }) {
  const feedW = w - 110;
  const feedH = h - 20;
  const ocrX = feedW + 20;
  const sx = feedW / 180; // scale box positions with the feed size
  const sy = h / 120;
  return (
    <Frame
      h={h}
      w={w}
      label="Camera feed with AI detection boxes and OCR output turning into an analyst alert"
    >
      <rect x="10" y="10" width={feedW} height={feedH} rx="4" className="fill-surface" />
      <path
        d={`M16 22v-6h6M${feedW - 2} 16h6v6M16 ${h - 22}v6h6M${feedW + 4} ${h - 22}v6h-6`}
        fill="none"
        strokeWidth="1.2"
        className="stroke-accent"
      />
      <text x="26" y="25" className={cn(mono, "fill-muted")} style={tiny}>
        cam-07
      </text>
      <line
        x1="14"
        y1="16"
        x2={feedW + 6}
        y2="16"
        strokeWidth="0.6"
        className="stroke-accent/50 motion-safe:animate-xp-scan"
        style={{ ["--xp-scan" as string]: `${feedH - 12}px` }}
      />
      <g className="motion-safe:animate-xp-detect">
        <rect
          x={40 * sx}
          y={30 + 10 * sy}
          width={44 * sx}
          height={feedH - 40 * sy}
          fill="none"
          className="stroke-live"
        />
        <rect x={40 * sx} y={21 + 10 * sy} width="58" height="10" className="fill-live/25" />
        <text x={40 * sx + 3} y={29 + 10 * sy} className={cn(mono, "fill-live")} style={tiny}>
          person 92%
        </text>
      </g>
      <g className="motion-safe:animate-xp-detect" style={delay(0.7)}>
        <rect
          x={108 * sx}
          y={46 * sy}
          width={60 * sx}
          height={30 * sy}
          fill="none"
          className="stroke-accent"
        />
        <rect x={108 * sx} y={46 * sy - 9} width="52" height="10" className="fill-accent/25" />
        <text x={108 * sx + 3} y={46 * sy - 1} className={cn(mono, "fill-accent")} style={tiny}>
          truck 88%
        </text>
      </g>
      <text x={ocrX} y="22" className={cn(mono, "fill-muted")} style={tiny}>
        ocr / llm
      </text>
      {[66, 50, 60, 40].map((lw, i) => (
        <rect
          key={i}
          x={ocrX}
          y={32 + i * 14}
          width={lw}
          height="6"
          rx="2"
          className={cn(
            "origin-left [transform-box:fill-box] motion-safe:animate-xp-type",
            i === 0 ? "fill-accent" : "fill-border",
          )}
          style={delay(i * 0.35)}
        />
      ))}
      <text x={ocrX} y={h - 12} className={cn(mono, "fill-live")} style={tiny}>
        → analyst alert
      </text>
    </Frame>
  );
}

/* ---------- Full-stack: client → API (2FA) → DB ---------- */
function FullStackVisual({ h, w = W }: { h: number; w?: number }) {
  const y = h / 2 - 4;
  const step = (w - 20 - 66) / 2;
  const nodes = [
    { x: 10, title: "Client", sub: "next.js" },
    { x: 10 + step, title: "API", sub: "node / drf" },
    { x: 10 + step * 2, title: "DB", sub: "postgres" },
  ];
  const gap = step - 66;
  const mid = w / 2;
  return (
    <Frame
      h={h}
      w={w}
      label="Request flowing from the client through an authenticated API to the database"
    >
      {nodes.map((n) => (
        <g key={n.title}>
          <rect
            x={n.x}
            y={y - 22}
            width="66"
            height="44"
            rx="6"
            className="fill-surface stroke-border"
          />
          <text
            x={n.x + 33}
            y={y - 2}
            textAnchor="middle"
            className="fill-text"
            style={{ fontSize: 11 }}
          >
            {n.title}
          </text>
          <text
            x={n.x + 33}
            y={y + 13}
            textAnchor="middle"
            className={cn(mono, "fill-muted")}
            style={tiny}
          >
            {n.sub}
          </text>
        </g>
      ))}
      {[nodes[0].x + 66, nodes[1].x + 66].map((x, i) => (
        <g key={x}>
          <line
            x1={x}
            y1={y}
            x2={x + gap}
            y2={y}
            strokeDasharray="4 5"
            className="stroke-accent motion-safe:animate-xp-flow"
          />
          <circle
            cx={x + 2}
            cy={y}
            r="3"
            className={cn(i ? "fill-live" : "fill-accent", "motion-safe:animate-xp-packet")}
            style={{ ...delay(i * 0.9), ["--xp-dx" as string]: `${gap - 5}px` }}
          />
        </g>
      ))}
      <rect
        x={mid - 22}
        y={y - 38}
        width="44"
        height="13"
        rx="3"
        className="fill-live/15 stroke-live"
        strokeWidth="0.5"
      />
      <text x={mid} y={y - 28} textAnchor="middle" className={cn(mono, "fill-live")} style={tiny}>
        2FA ✓
      </text>
      <text x={mid} y={h - 10} textAnchor="middle" className={cn(mono, "fill-muted")} style={tiny}>
        REST · GraphQL · typed end to end
      </text>
    </Frame>
  );
}

/* ---------- Data viz: bars + trend line drawing ---------- */
function DataVizVisual({ h }: { h: number }) {
  const values = [40, 62, 30, 74, 52, 84, 46, 66];
  const plot = h - 40;
  return (
    <Frame h={h} label="Bar chart and trend line drawing live operational data">
      {[0, 1, 2].map((i) => (
        <line
          key={i}
          x1="16"
          y1={20 + (i * plot) / 2}
          x2="264"
          y2={20 + (i * plot) / 2}
          strokeWidth="0.5"
          className="stroke-border"
        />
      ))}
      {values.map((v, i) => {
        const bh = (v * plot) / 90;
        return (
          <rect
            key={i}
            x={22 + i * 31}
            y={h - 20 - bh}
            width="16"
            height={bh}
            rx="2"
            className="origin-bottom fill-accent/30 [transform-box:fill-box] motion-safe:animate-xp-bar"
            style={delay(i * 0.12)}
          />
        );
      })}
      <polyline
        fill="none"
        strokeWidth="1.6"
        pathLength={1}
        strokeDasharray="1"
        className="stroke-live motion-safe:animate-xp-draw"
        points={values.map((v, i) => `${30 + i * 31},${h - 20 - ((v + 8) * plot) / 100}`).join(" ")}
      />
      <text x="264" y="14" textAnchor="end" className={cn(mono, "fill-muted")} style={tiny}>
        48 sites · live
      </text>
    </Frame>
  );
}

const visuals = {
  stream: StreamVisual,
  detection: DetectionVisual,
  fullstack: FullStackVisual,
  dataviz: DataVizVisual,
} satisfies Record<ExpertiseItem["visual"], unknown>;

/** `feature` tiles get a larger canvas, `wide` rows a wider one, so text keeps a sane scale. */
export function ExpertiseVisual({
  kind,
  layout,
}: {
  kind: ExpertiseItem["visual"];
  layout: ExpertiseItem["layout"];
}) {
  const Visual: (p: { h: number; w?: number }) => React.ReactNode = visuals[kind];
  if (layout === "tile") return <Visual h={120} />;
  // Big/wide canvases only where the tile is big/wide (lg); compact canvas below.
  return (
    <>
      <div className="lg:hidden">
        <Visual h={layout === "feature" ? 150 : 120} />
      </div>
      <div className="hidden lg:block">
        {layout === "feature" ? <Visual h={330} w={440} /> : <Visual h={130} w={400} />}
      </div>
    </>
  );
}
