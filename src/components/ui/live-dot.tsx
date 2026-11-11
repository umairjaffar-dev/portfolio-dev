import { cn } from "@/lib/utils";

/** Pulsing "live" indicator, the signature element of the Surveillance Ops theme. */
export function LiveDot({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("animate-live-pulse bg-live inline-block size-2 rounded-full", className)}
    />
  );
}
