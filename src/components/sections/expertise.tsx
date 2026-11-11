import { Cctv, ChartLine, Layers, Video } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { expertise } from "@/lib/data";
import type { ExpertiseItem } from "@/lib/schemas";

const icons = { video: Video, cctv: Cctv, layers: Layers, chart: ChartLine } satisfies Record<
  ExpertiseItem["icon"],
  unknown
>;

export function Expertise() {
  return (
    <Section id="expertise" title="What I build">
      <div className="grid gap-4 sm:grid-cols-2">
        {expertise.map((item, i) => {
          const Icon = icons[item.icon];
          return (
            <Reveal key={item.title} delay={i * 0.05}>
              <article className="h-full rounded-xl border border-border bg-surface p-6 transition hover:border-accent/40">
                <div className="flex size-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Icon className="size-5" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-muted">{item.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {item.tags.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
