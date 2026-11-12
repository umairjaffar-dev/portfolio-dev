import { ProjectShowcase } from "@/components/projects/project-showcase";
import { Section } from "@/components/ui/section";
import { projects } from "@/lib/data";

export function Projects() {
  return (
    <Section id="projects" title="Selected projects">
      <ProjectShowcase projects={projects} />
    </Section>
  );
}
