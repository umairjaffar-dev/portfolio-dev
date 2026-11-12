import type { CSSProperties, ReactNode } from "react";
import type { Project } from "@/lib/schemas";
import { cn } from "@/lib/utils";

/*
 * Animated mini-UIs for private projects with no public screenshots.
 * SVG + CSS keyframes (globals.css `xp-*`), theme tokens, motion-safe only.
 */

const W = 320;
const H = 180;
const mono = "font-mono";
const tiny: CSSProperties = { fontSize: 8 };
const delay = (s: number): CSSProperties => ({ animationDelay: `${s}s` });

function Svg({ label, children }: { label: string; children: ReactNode }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={label} className="block w-full">
      {children}
    </svg>
  );
}

/* forMedia: live player + HLS buffer + bilingual transcript */
function Broadcast() {
  return (
    <Svg label="Live TV player with buffering HLS segments and a bilingual transcript">
      <rect x="10" y="10" width="200" height="118" rx="5" className="fill-bg" />
      <rect x="18" y="18" width="34" height="13" rx="3" className="fill-alert/20" />
      <circle cx="25" cy="24.5" r="2.5" className="fill-alert motion-safe:animate-live-pulse" />
      <text x="31" y="28" className={cn(mono, "fill-alert")} style={tiny}>
        LIVE
      </text>
      <text x="202" y="28" textAnchor="end" className={cn(mono, "fill-muted")} style={tiny}>
        ch-14
      </text>
      <path d="M100 56l20 13-20 13z" className="fill-accent opacity-80" />
      {Array.from({ length: 7 }, (_, i) => (
        <rect
          key={i}
          x={18 + i * 27}
          y="138"
          width="23"
          height="5"
          rx="2"
          className="fill-accent motion-safe:animate-xp-segment"
          style={delay(i * 0.3)}
        />
      ))}
      <rect x="70" y="152" width="80" height="4" rx="2" className="fill-live/35" />
      <line x1="18" y1="154" x2="200" y2="154" strokeWidth="2" className="stroke-border" />
      <circle
        cx="18"
        cy="154"
        r="4"
        className="fill-accent motion-safe:animate-xp-playhead"
        style={{ animationDuration: "6s" }}
      />
      <text x="110" y="170" textAnchor="middle" className={cn(mono, "fill-live")} style={tiny}>
        clip 00:42 → 01:18
      </text>

      <text x="222" y="22" className={cn(mono, "fill-muted")} style={tiny}>
        transcript
      </text>
      {[76, 60, 70, 50, 66, 44].map((w, i) => (
        <rect
          key={i}
          x="222"
          y={32 + i * 15}
          width={w}
          height="6"
          rx="2"
          className={cn(
            "origin-left [transform-box:fill-box] motion-safe:animate-xp-type",
            i === 2 ? "fill-accent" : "fill-border",
          )}
          style={delay(i * 0.3)}
        />
      ))}
      <text x="222" y="134" className={cn(mono, "fill-live")} style={tiny}>
        اردو · EN
      </text>
    </Svg>
  );
}

/* BetaNexus: camera feed with AI detections and a unit counter */
function Detection() {
  const boxes = [
    { x: 46, y: 60, w: 52, h: 70, label: "det 97%", tone: "live", d: 0 },
    { x: 140, y: 78, w: 54, h: 48, label: "det 90%", tone: "live", d: 0.6 },
    { x: 224, y: 46, w: 48, h: 42, label: "unit 81%", tone: "accent", d: 1.1 },
  ] as const;
  return (
    <Svg label="Factory camera feed with AI detection boxes and a live unit count">
      <rect x="10" y="10" width="300" height="160" rx="5" className="fill-bg" />
      <path
        d="M18 30v-12h12M290 18h12v12M18 150v12h12M302 150v12h-12"
        fill="none"
        strokeWidth="1.5"
        className="stroke-accent"
      />
      <text x="36" y="30" className={cn(mono, "fill-muted")} style={tiny}>
        factory-12 · lane 3
      </text>
      <line
        x1="16"
        y1="20"
        x2="304"
        y2="20"
        strokeWidth="0.6"
        className="stroke-accent/50 motion-safe:animate-xp-scan"
        style={{ ["--xp-scan" as string]: "140px" }}
      />
      {boxes.map((b) => (
        <g key={b.label} className="motion-safe:animate-xp-detect" style={delay(b.d)}>
          <rect
            x={b.x}
            y={b.y}
            width={b.w}
            height={b.h}
            fill="none"
            className={b.tone === "live" ? "stroke-live" : "stroke-accent"}
          />
          <rect
            x={b.x}
            y={b.y - 10}
            width="44"
            height="10"
            className={b.tone === "live" ? "fill-live/25" : "fill-accent/25"}
          />
          <text
            x={b.x + 3}
            y={b.y - 2}
            className={cn(mono, b.tone === "live" ? "fill-live" : "fill-accent")}
            style={tiny}
          >
            {b.label}
          </text>
        </g>
      ))}
      <text x="300" y="162" textAnchor="end" className={cn(mono, "fill-live")} style={tiny}>
        units today: 1,284
      </text>
    </Svg>
  );
}

/* CICO: QR scan + check-in feed */
function Attendance() {
  const qr = [0, 2, 4, 6, 8];
  return (
    <Svg label="QR code being scanned and employees checking in">
      <rect x="10" y="10" width="120" height="160" rx="8" className="fill-bg" />
      {Array.from({ length: 9 }, (_, i) => (
        <rect
          key={i}
          x={30 + (i % 3) * 28}
          y={36 + Math.floor(i / 3) * 28}
          width="20"
          height="20"
          rx="3"
          className={qr.includes(i) ? "fill-accent" : "fill-border"}
        />
      ))}
      <line
        x1="22"
        y1="32"
        x2="118"
        y2="32"
        strokeWidth="1.5"
        className="stroke-live motion-safe:animate-xp-qr"
        style={{ ["--xp-qr" as string]: "80px" }}
      />
      <text x="70" y="150" textAnchor="middle" className={cn(mono, "fill-live")} style={tiny}>
        checked in ✓
      </text>
      {["09:02", "09:05", "09:11", "09:14", "09:20"].map((t, i) => (
        <g
          key={t}
          className="motion-safe:animate-fade-up"
          style={{ ...delay(0.2 + i * 0.25), animationIterationCount: 1 }}
        >
          <rect x="142" y={12 + i * 31} width="168" height="25" rx="4" className="fill-bg" />
          <circle
            cx="155"
            cy={24.5 + i * 31}
            r="4"
            className={i === 0 ? "fill-live" : "fill-muted"}
          />
          <rect
            x="166"
            y={21 + i * 31}
            width={[70, 56, 80, 48, 64][i]}
            height="6"
            rx="2"
            className="fill-border"
          />
          <text
            x="302"
            y={28 + i * 31}
            textAnchor="end"
            className={cn(mono, "fill-muted")}
            style={tiny}
          >
            {t}
          </text>
        </g>
      ))}
    </Svg>
  );
}

/* Server monitoring: uptime bars per server, one degrading */
function Uptime() {
  return (
    <Svg label="Uptime bars for several servers with one server going down">
      {[0, 1, 2, 3, 4].map((row) => (
        <g key={row}>
          <rect x="10" y={10 + row * 32} width="300" height="26" rx="4" className="fill-bg" />
          <circle
            cx="24"
            cy={23 + row * 32}
            r="4"
            className={cn(row === 2 ? "fill-alert motion-safe:animate-live-pulse" : "fill-live")}
          />
          <text x="34" y={26 + row * 32} className={cn(mono, "fill-text")} style={tiny}>
            srv-0{row + 1}
          </text>
          {Array.from({ length: 30 }, (_, k) => {
            const down = row === 2 && k > 23;
            const warn = row === 1 && k === 11;
            return (
              <rect
                key={k}
                x={78 + k * 7.6}
                y={17 + row * 32}
                width="5"
                height="12"
                rx="1"
                className={cn(
                  down ? "fill-alert" : warn ? "fill-accent" : "fill-live",
                  "opacity-75",
                )}
              />
            );
          })}
        </g>
      ))}
    </Svg>
  );
}

const previews = {
  broadcast: Broadcast,
  detection: Detection,
  attendance: Attendance,
  uptime: Uptime,
} satisfies Record<Project["preview"], unknown>;

/** Browser-window frame around the animated preview. */
export function ProjectPreview({ project, className }: { project: Project; className?: string }) {
  const Preview = previews[project.preview];
  return (
    <div className={cn("overflow-hidden rounded-xl border border-border bg-surface", className)}>
      <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
        <span aria-hidden="true" className="size-2 rounded-full bg-alert/70" />
        <span aria-hidden="true" className="size-2 rounded-full bg-accent/50" />
        <span aria-hidden="true" className="size-2 rounded-full bg-live/70" />
        <span className="ml-2 font-mono text-[11px] text-muted">{project.slug}.app</span>
        {project.confidential && (
          <span className="ml-auto font-mono text-[10px] text-muted">illustrative preview</span>
        )}
      </div>
      <div className="p-2 sm:p-3">
        <Preview />
      </div>
    </div>
  );
}
