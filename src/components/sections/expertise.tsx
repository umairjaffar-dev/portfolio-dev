import { Cctv, ChartLine, Layers, Video } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { expertise } from "@/lib/data";
import type { ExpertiseItem } from "@/lib/schemas";
import { cn } from "@/lib/utils";
import { ExpertiseVisual } from "./expertise-visuals";

const icons = { video: Video, cctv: Cctv, layers: Layers, chart: ChartLine } satisfies Record<
  ExpertiseItem["icon"],
  unknown
>;

/** Bento placement per layout: feature = big tile, wide = full-width row. */
const placement: Record<ExpertiseItem["layout"], string> = {
  feature: "sm:col-span-2 lg:row-span-2",
  tile: "",
  wide: "sm:col-span-2 lg:col-span-3",
};

export function Expertise() {
  return (
    <Section id="expertise" title="What I build">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {expertise.map((item, i) => {
          const Icon = icons[item.icon];
          const feature = item.layout === "feature";
          const wide = item.layout === "wide";
          return (
            <Reveal key={item.title} delay={i * 0.06} className={placement[item.layout]}>
              <article
                className={cn(
                  "group h-full rounded-xl border bg-surface p-4 transition-colors hover:border-accent/50 sm:p-5",
                  feature ? "border-accent/30" : "border-border",
                  wide &&
                    "lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-center lg:gap-8",
                )}
              >
                <ExpertiseVisual kind={item.visual} layout={item.layout} />
                <div>
                  <div className={cn("mt-4 flex items-center gap-2.5", wide && "lg:mt-0")}>
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                    <h3 className={cn("font-semibold", feature ? "text-xl" : "text-base")}>
                      {item.title}
                    </h3>
                  </div>
                  <p className={cn("mt-2 text-muted", feature ? "text-base" : "text-sm")}>
                    {item.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.tags.map((t) => (
                      <Badge key={t}>{t}</Badge>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
