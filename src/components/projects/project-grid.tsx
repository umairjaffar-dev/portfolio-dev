"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/reveal";
import type { Project } from "@/lib/schemas";
import { ProjectCard } from "./project-card";
import { ProjectModal } from "./project-modal";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Project | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="grid gap-6 lg:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.05}>
            <ProjectCard
              project={p}
              index={i}
              onPreview={() => {
                setActive(p);
                setOpen(true);
              }}
            />
          </Reveal>
        ))}
      </div>
      {/* `active` stays set while closing so the exit doesn't flash empty. */}
      <ProjectModal project={active} open={open} onOpenChange={setOpen} />
    </>
  );
}
