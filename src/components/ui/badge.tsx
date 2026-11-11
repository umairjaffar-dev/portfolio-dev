import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type BadgeProps = ComponentProps<"span"> & { tone?: "default" | "accent" | "live" };

const tones = {
  default: "border-border bg-surface-2 text-muted",
  accent: "border-accent/30 bg-accent/10 text-accent",
  live: "border-live/30 bg-live/10 text-live",
};

export function Badge({ tone = "default", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 font-mono text-xs",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
