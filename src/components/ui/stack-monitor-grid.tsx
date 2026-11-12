import type { Profile } from "@/lib/schemas";
import { cn } from "@/lib/utils";
import { LiveDot } from "./live-dot";

type Tile = Profile["stackGrid"][number];

const corner = "pointer-events-none absolute size-3";

/** Tech stack shown as a wall of CCTV feeds, matching the hero monitoring wall. */
export function StackMonitorGrid({ tiles, className }: { tiles: Tile[]; className?: string }) {
  return (
    <ul className={cn("grid grid-cols-2 gap-3", className)} aria-label="Tech stack">
      {tiles.map((tile, i) => {
        const tone = tile.highlight ? "border-accent" : "border-muted/60";
        return (
          <li
            key={tile.channel}
            className={cn(
              "relative isolate flex h-44 flex-col justify-end overflow-hidden rounded-xl border bg-surface p-3 sm:p-4",
              tile.highlight ? "border-accent/40" : "border-border",
            )}
          >
            {/* viewfinder corners */}
            <span
              aria-hidden="true"
              className={cn(corner, tone, "top-2 left-2 border-t-2 border-l-2")}
            />
            <span
              aria-hidden="true"
              className={cn(corner, tone, "top-2 right-2 border-t-2 border-r-2")}
            />
            <span
              aria-hidden="true"
              className={cn(corner, tone, "bottom-2 left-2 border-b-2 border-l-2")}
            />
            <span
              aria-hidden="true"
              className={cn(corner, tone, "right-2 bottom-2 border-r-2 border-b-2")}
            />

            {/* REC label */}
            <span
              aria-hidden="true"
              className="absolute top-4 left-5 flex items-center gap-1.5 font-mono text-[11px] text-muted sm:left-6"
            >
              <span className="inline-block size-1.5 animate-live-pulse rounded-full bg-alert" />
              REC · {tile.channel}
            </span>

            {/* scan line */}
            <span
              aria-hidden="true"
              className="absolute inset-x-3 top-0 -z-10 h-px animate-tile-scan bg-accent/30"
              style={{ animationDelay: `${i * -0.9}s` }}
            />

            {/* AI detection box on the highlighted feed */}
            {tile.highlight && (
              <span
                aria-hidden="true"
                className="absolute top-11 right-6 h-8 w-12 animate-live-pulse border border-live"
              >
                <span className="absolute -top-4 left-0 bg-live/20 px-1 font-mono text-[10px] leading-4 whitespace-nowrap text-live">
                  det 94%
                </span>
              </span>
            )}

            <h3
              className={cn(
                "flex items-center gap-2 text-sm font-semibold",
                tile.highlight ? "text-accent" : "text-text",
              )}
            >
              {tile.highlight && <LiveDot />}
              {tile.title}
            </h3>
            <ul className="mt-1.5 space-y-0.5 font-mono text-[10px] leading-relaxed whitespace-nowrap text-muted sm:text-[11px]">
              {tile.tech.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </li>
        );
      })}
    </ul>
  );
}
