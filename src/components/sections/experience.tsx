import { Badge } from "@/components/ui/badge";
import { LiveDot } from "@/components/ui/live-dot";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { experience } from "@/lib/data";

export function Experience() {
  return (
    <Section id="experience" title="Experience">
      <ol className="border-border relative space-y-10 border-l pl-8">
        {experience.map((job, i) => {
          const current = job.end === null;
          return (
            <li key={job.company} className="relative">
              <span
                aria-hidden="true"
                className="border-border bg-bg absolute top-1.5 -left-[37px] flex size-3 items-center justify-center rounded-full border"
              >
                {current ? <LiveDot /> : <span className="bg-muted size-1.5 rounded-full" />}
              </span>
              <Reveal delay={i * 0.05}>
                <p className="text-muted font-mono text-xs">
                  {job.start} → {current ? "present" : job.end} · {job.location}
                </p>
                <h3 className="mt-2 text-lg font-semibold">
                  {job.role} <span className="text-accent">@ {job.company}</span>
                </h3>
                <ul className="text-muted marker:text-accent mt-3 list-disc space-y-1.5 pl-5">
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
