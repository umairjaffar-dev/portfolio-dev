import { cn } from "@/lib/utils";

const BLADES = [0, 60, 120, 180, 240, 300];

/** Camera-lens aperture mark: ring, slowly rotating blades, "U" at the centre. */
export function LensMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 36" aria-hidden="true" className={cn("size-9 shrink-0", className)}>
      <circle cx="18" cy="18" r="16" fill="none" strokeWidth="1.5" className="stroke-accent" />
      <g className="origin-center [transform-box:fill-box] group-hover:[animation-duration:3s] motion-safe:animate-[spin_12s_linear_infinite]">
        {BLADES.map((a) => (
          <line
            key={a}
            x1="18"
            y1="4.5"
            x2="24.5"
            y2="14"
            strokeWidth="1.3"
            strokeLinecap="round"
            className="stroke-accent/70"
            transform={`rotate(${a} 18 18)`}
          />
        ))}
      </g>
      <circle cx="18" cy="18" r="7.5" strokeWidth="1" className="fill-accent/15 stroke-accent" />
      <text
        x="18"
        y="21.5"
        textAnchor="middle"
        className="fill-text font-mono"
        style={{ fontSize: 10, fontWeight: 600 }}
      >
        U
      </text>
    </svg>
  );
}

/** Full lockup: lens mark + name + descriptor. */
export function Logo({ name, className }: { name: string; className?: string }) {
  return (
    <span className={cn("group flex items-center gap-2.5", className)}>
      <LensMark />
      <span className="flex flex-col leading-tight">
        <span className="text-sm font-semibold text-text">{name}</span>
        <span className="font-mono text-[10px] text-muted">software solutions</span>
      </span>
    </span>
  );
}
