"use client";

import { ArrowRight, Lock } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { CountUp } from "@/components/ui/count-up";
import type { Project } from "@/lib/schemas";
import { cn } from "@/lib/utils";
import { ProjectModal } from "./project-modal";
import { ProjectPreview } from "./project-preview";

/**
 * Case-study rows. Previews alternate sides, slide in from their side on
 * scroll and drift slightly (parallax) while the row is on screen.
 */
export function ProjectShowcase({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Project | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      <ol className="space-y-16 lg:space-y-24">
        {projects.map((p, i) => (
          <ProjectRow
            key={p.slug}
            project={p}
            index={i}
            total={projects.length}
            onOpen={() => {
              setActive(p);
              setOpen(true);
            }}
          />
        ))}
      </ol>
      {/* `active` stays set while closing so the exit doesn't flash empty. */}
      <ProjectModal project={active} open={open} onOpenChange={setOpen} />
    </>
  );
}

function ProjectRow({
  project,
  index,
  total,
  onOpen,
}: {
  project: Project;
  index: number;
  total: number;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const reduce = useReducedMotion();
  const flip = index % 2 === 1;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const parallax = useTransform(scrollYProgress, [0, 1], [32, -32]);
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <li
      ref={ref}
      className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-12"
    >
      <motion.div
        className={cn("group", flip && "lg:order-2")}
        initial={reduce ? false : { opacity: 0, x: flip ? 48 : -48 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={reduce ? undefined : { y: parallax }}
      >
        <button
          type="button"
          onClick={onOpen}
          aria-label={`Open ${project.title} case study`}
          className="block w-full rounded-xl text-left transition duration-300 group-hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          <ProjectPreview
            project={project}
            className="transition-colors duration-300 group-hover:border-accent/50"
          />
        </button>
      </motion.div>

      <motion.div
        className={cn(flip && "lg:order-1")}
        initial={reduce ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
      >
        <p className="font-mono text-xs text-accent">
          {pad(index + 1)} / {pad(total)}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {project.category.map((c) => (
            <Badge key={c} tone="accent">
              {c}
            </Badge>
          ))}
          {project.confidential && (
            <Badge>
              <Lock className="size-3" aria-hidden="true" />
              Private
            </Badge>
          )}
        </div>

        <h3 className="mt-4 text-2xl font-semibold">{project.title}</h3>
        <p className="mt-1 text-muted">{project.tagline}</p>

        {project.metrics.length > 0 && (
          <dl className="mt-5 flex flex-wrap gap-2">
            {project.metrics.map((m) => (
              <div
                key={m.label}
                className="flex flex-col-reverse rounded-lg border border-border bg-surface px-3 py-2"
              >
                <dt className="font-mono text-[11px] text-muted">{m.label}</dt>
                <dd className="text-lg font-semibold">
                  <CountUp value={m.value} />
                </dd>
              </div>
            ))}
          </dl>
        )}

        <ul className="mt-5 list-disc space-y-1.5 pl-5 text-sm text-muted marker:text-live">
          {project.achievements.slice(0, 2).map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>

        <p className="mt-4 font-mono text-xs text-muted">
          {project.techStack
            .slice(0, 5)
            .map((t) => t.name)
            .join(" · ")}
        </p>

        <button
          type="button"
          onClick={onOpen}
          className="group/cta mt-6 inline-flex h-10 items-center gap-2 rounded-lg bg-accent px-4 text-sm font-medium text-accent-fg transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          View case study
          <ArrowRight
            className="size-4 transition-transform group-hover/cta:translate-x-0.5"
            aria-hidden="true"
          />
        </button>
      </motion.div>
    </li>
  );
}
