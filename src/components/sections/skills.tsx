import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { skills } from "@/lib/data";

export function Skills() {
  return (
    <Section id="skills" title="Skills and tools">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, i) => (
          <Reveal key={group.id} delay={i * 0.04}>
            <div className="h-full rounded-xl border border-border bg-surface p-5">
              <h3 className="font-mono text-sm text-accent">{group.label.toLowerCase()}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item}>
                    <Badge className="text-text">{item}</Badge>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
