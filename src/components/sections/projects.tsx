import { ProjectGrid } from "@/components/projects/project-grid";
import { Section } from "@/components/ui/section";
import { projects } from "@/lib/data";

export function Projects() {
  return (
    <Section id="projects" title="Selected projects">
      <ProjectGrid projects={projects} />
    </Section>
  );
}
