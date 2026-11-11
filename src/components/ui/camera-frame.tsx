import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** CCTV viewfinder corner brackets around any media. */
export function CameraFrame({
  label,
  children,
  className,
}: {
  label?: string;
  children: ReactNode;
  className?: string;
}) {
  const corner = "pointer-events-none absolute size-4 border-accent";
  return (
    <div className={cn("bg-surface-2 relative overflow-hidden rounded-lg", className)}>
      {children}
      <span aria-hidden="true" className={cn(corner, "top-2 left-2 border-t-2 border-l-2")} />
      <span aria-hidden="true" className={cn(corner, "top-2 right-2 border-t-2 border-r-2")} />
      <span aria-hidden="true" className={cn(corner, "bottom-2 left-2 border-b-2 border-l-2")} />
      <span aria-hidden="true" className={cn(corner, "right-2 bottom-2 border-r-2 border-b-2")} />
      {label && (
        <span className="text-muted absolute top-3 left-8 font-mono text-[11px]">{label}</span>
      )}
    </div>
  );
}
