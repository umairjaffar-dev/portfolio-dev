/**
 * Decorative "monitoring wall" behind the hero: a grid of camera feeds with AI
 * detection boxes, REC timestamps, and a scanning line. Pure SVG driven by theme
 * tokens, so it adapts to light/dark with no image download.
 */

type Box = [x: number, y: number, w: number, h: number, score: number];

const W = 260;
const H = 150;
const GAP = 14;

const feeds: { ch: string; time: string; boxes: Box[]; kind: "feed" | "chart" }[] = [
  {
    ch: "ch-07",
    time: "21:04:12",
    boxes: [
      [40, 50, 60, 60, 94],
      [150, 62, 54, 48, 88],
    ],
    kind: "feed",
  },
  { ch: "ch-12", time: "21:04:12", boxes: [], kind: "chart" },
  { ch: "ch-21", time: "21:04:11", boxes: [[100, 40, 80, 70, 97]], kind: "feed" },
  { ch: "ch-03", time: "21:04:12", boxes: [[30, 70, 50, 44, 81]], kind: "feed" },
  {
    ch: "ch-18",
    time: "21:04:10",
    boxes: [
      [120, 46, 70, 64, 91],
      [36, 80, 44, 38, 76],
    ],
    kind: "feed",
  },
  { ch: "ch-44", time: "21:04:12", boxes: [], kind: "chart" },
  { ch: "ch-09", time: "21:04:11", boxes: [[70, 54, 64, 56, 89]], kind: "feed" },
  { ch: "ch-30", time: "21:04:12", boxes: [[160, 60, 50, 50, 84]], kind: "feed" },
  { ch: "ch-15", time: "21:04:09", boxes: [[44, 44, 90, 70, 95]], kind: "feed" },
];

const COLS = 3;
const ROWS = Math.ceil(feeds.length / COLS);
const VW = COLS * W + (COLS - 1) * GAP;
const VH = ROWS * H + (ROWS - 1) * GAP;
const bars = [38, 62, 45, 80, 55, 70, 92, 60, 74, 50, 86, 66];

function Corners({ w, h }: { w: number; h: number }) {
  const n = 12;
  return (
    <path
      d={`M8 ${8 + n}V8h${n} M${w - 8 - n} 8h${n}v${n} M8 ${h - 8 - n}v${n}h${n} M${w - 8 - n} ${h - 8}h${n}v-${n}`}
      fill="none"
      stroke="var(--accent)"
      strokeWidth="2"
    />
  );
}

export function HeroBanner() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden [perspective:1400px]"
    >
      <svg
        viewBox={`0 0 ${VW} ${VH}`}
        className="absolute top-1/2 -right-[6%] w-[150%] [transform:translateY(-50%)_rotateY(-14deg)] [mask-image:linear-gradient(to_right,transparent_5%,black_60%)] opacity-25 sm:w-[110%] lg:w-[64%] lg:opacity-60"
      >
        <defs>
          <pattern id="hero-grid" width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M16 0H0V16" fill="none" stroke="var(--border)" strokeWidth="0.6" />
          </pattern>
        </defs>

        {feeds.map((f, i) => {
          const x = (i % COLS) * (W + GAP);
          const y = Math.floor(i / COLS) * (H + GAP);
          return (
            <g key={f.ch} transform={`translate(${x} ${y})`}>
              <rect width={W} height={H} rx="8" fill="var(--surface)" stroke="var(--border)" />
              <rect
                x="1"
                y="1"
                width={W - 2}
                height={H - 2}
                rx="7"
                fill="url(#hero-grid)"
                opacity="0.7"
              />
              <Corners w={W} h={H} />

              <circle cx="20" cy="22" r="3.5" fill="var(--alert)" className="animate-live-pulse" />
              <text
                x="30"
                y="26"
                fontSize="10"
                fontFamily="var(--font-mono)"
                fill="var(--text-muted)"
              >
                REC · {f.ch}
              </text>
              <text
                x={W - 16}
                y="26"
                fontSize="10"
                textAnchor="end"
                fontFamily="var(--font-mono)"
                fill="var(--text-muted)"
              >
                {f.time}
              </text>

              {f.kind === "chart"
                ? bars.map((b, j) => (
                    <rect
                      key={j}
                      x={22 + j * 18}
                      y={H - 20 - b}
                      width="10"
                      height={b}
                      rx="2"
                      fill="var(--accent)"
                      opacity={0.25 + (b / 92) * 0.6}
                    />
                  ))
                : f.boxes.map(([bx, by, bw, bh, score], j) => (
                    <g key={j}>
                      <rect
                        x={bx}
                        y={by}
                        width={bw}
                        height={bh}
                        fill="none"
                        stroke="var(--live)"
                        strokeWidth="1.6"
                      />
                      <rect x={bx} y={by - 13} width="46" height="13" fill="var(--live)" />
                      <text
                        x={bx + 4}
                        y={by - 3}
                        fontSize="9"
                        fontFamily="var(--font-mono)"
                        fill="var(--bg)"
                      >
                        det {score}%
                      </text>
                    </g>
                  ))}

              {f.kind === "feed" && (
                <>
                  <rect x="16" y={H - 16} width={W - 32} height="3" rx="1.5" fill="var(--border)" />
                  <rect
                    x="16"
                    y={H - 16}
                    width={(W - 32) * (0.35 + (i % 4) * 0.15)}
                    height="3"
                    rx="1.5"
                    fill="var(--accent)"
                  />
                </>
              )}
            </g>
          );
        })}

        <rect width={VW} height="2" fill="var(--accent)" opacity="0.5" className="animate-scan" />
      </svg>

      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bg to-transparent" />
    </div>
  );
}
