import { Section } from "@/components/ui/section";
import { experience } from "@/lib/data";
import { ExperienceStack } from "./experience-stack";

export function Experience() {
  return (
    <Section id="experience" title="Experience">
      <ExperienceStack jobs={experience} />
    </Section>
  );
}
