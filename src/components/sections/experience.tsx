import { Badge } from "@/components/ui/badge";
import { LiveDot } from "@/components/ui/live-dot";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { experience } from "@/lib/data";

export function Experience() {
  return (
    <Section id="experience" title="Experience">
      <ol className="relative space-y-10 border-l border-border pl-8">
        {experience.map((job, i) => {
          const current = job.end === null;
          return (
            <li key={job.company} className="relative">
              <span
                aria-hidden="true"
                className="absolute top-1.5 -left-[37px] flex size-3 items-center justify-center rounded-full border border-border bg-bg"
              >
                {current ? <LiveDot /> : <span className="size-1.5 rounded-full bg-muted" />}
              </span>
              <Reveal delay={i * 0.05}>
                <p className="font-mono text-xs text-muted">
                  {job.start} → {current ? "present" : job.end} · {job.location}
                </p>
                <h3 className="mt-2 text-lg font-semibold">
                  {job.role} <span className="text-accent">@ {job.company}</span>
                </h3>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-muted marker:text-accent">
                  {job.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-2">
                  {job.stack.map((s) => (
                    <Badge key={s}>{s}</Badge>
                  ))}
                </div>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
