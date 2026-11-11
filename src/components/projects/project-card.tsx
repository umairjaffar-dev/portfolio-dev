import { Eye, Lock } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { CameraFrame } from "@/components/ui/camera-frame";
import type { Project } from "@/lib/schemas";

export function ProjectCard({
  project,
  index,
  onPreview,
}: {
  project: Project;
  index: number;
  onPreview: () => void;
}) {
  const cover = project.screenshots[0];
  return (
    <article className="group flex h-full flex-col rounded-xl border border-border bg-surface p-4 transition hover:border-accent/40">
      <CameraFrame
        label={`cam_${String(index + 1).padStart(2, "0")} · ${project.slug}`}
        className="aspect-video"
      >
        {cover ? (
          <Image
            src={cover.src}
            alt={cover.alt}
            fill
            sizes="(min-width: 1024px) 540px, 100vw"
            className="object-cover transition duration-500 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="h-full bg-[linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] bg-size-[24px_24px] opacity-60" />
        )}
      </CameraFrame>

      <div className="flex flex-1 flex-col px-1 pt-5">
        <div className="flex flex-wrap gap-2">
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

        <h3 className="mt-4 text-xl font-semibold">{project.title}</h3>
        <p className="mt-1 text-muted">{project.tagline}</p>

        <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-muted marker:text-live">
          {project.achievements.slice(0, 3).map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>

        <p className="mt-4 font-mono text-xs text-muted">
          {project.techStack
            .slice(0, 5)
            .map((t) => t.name)
            .join(" · ")}
        </p>

        <div className="mt-auto pt-6">
          <button
            type="button"
            onClick={onPreview}
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-accent px-4 text-sm font-medium text-accent-fg transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <Eye className="size-4" aria-hidden="true" />
            Preview
          </button>
        </div>
      </div>
    </article>
  );
}
