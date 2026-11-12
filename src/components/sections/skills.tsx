import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { skills } from "@/lib/data";
import { SkillsConsole } from "./skills-console";

export function Skills() {
  return (
    <Section id="skills" title="Skills and tools">
      <Reveal>
        <SkillsConsole groups={skills} />
      </Reveal>
    </Section>
  );
}
