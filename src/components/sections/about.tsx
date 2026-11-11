import { MapPin } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { profile } from "@/lib/data";

export function About() {
  return (
    <Section id="about" title="About me">
      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <Reveal className="space-y-5 text-lg leading-relaxed text-muted">
          {profile.about.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <p className="flex items-center gap-2 font-mono text-sm text-text">
            <MapPin className="size-4 text-accent" aria-hidden="true" />
            {profile.location}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <dl className="grid grid-cols-2 gap-4">
            {profile.stats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-border bg-surface p-5 last:odd:col-span-2"
              >
                <dt className="font-mono text-xs text-muted">{s.label}</dt>
                <dd className="mt-2 text-2xl font-semibold text-text">{s.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
