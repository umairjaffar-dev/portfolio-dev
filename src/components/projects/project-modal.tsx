"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { ExternalLink, Lock, X } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { Badge } from "@/components/ui/badge";
import type { Project, TechItem } from "@/lib/schemas";
import { ProjectGallery } from "./project-gallery";

function groupStack(stack: TechItem[]) {
  return stack.reduce<Record<string, TechItem[]>>((acc, t) => {
    (acc[t.group] ??= []).push(t);
    return acc;
  }, {});
}

export function ProjectModal({
  project,
  open,
  onOpenChange,
}: {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" />
        <Dialog.Content className="border-border bg-surface fixed inset-x-0 bottom-0 z-50 max-h-[92dvh] overflow-y-auto rounded-t-2xl border p-6 focus:outline-none sm:inset-auto sm:top-1/2 sm:left-1/2 sm:w-[min(860px,92vw)] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-2xl sm:p-8">
          {project && (
            <>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap gap-2">
                    {project.category.map((c) => (
                      <Badge key={c} tone="accent">
                        {c}
                      </Badge>
                    ))}
                    {project.confidential && (
                      <Badge>
                        <Lock className="size-3" aria-hidden="true" />
                        Private client project
                      </Badge>
                    )}
                  </div>
                  <Dialog.Title className="mt-3 text-2xl font-semibold">
                    {project.title}
                  </Dialog.Title>
                  <Dialog.Description className="text-muted mt-1">
                    {project.tagline} · <span className="font-mono text-xs">{project.period}</span>
                  </Dialog.Description>
                </div>
                <Dialog.Close
                  aria-label="Close"
                  className="border-border text-muted hover:bg-surface-2 hover:text-text focus-visible:outline-accent inline-flex size-9 shrink-0 items-center justify-center rounded-lg border transition focus-visible:outline-2"
                >
                  <X className="size-4" aria-hidden="true" />
                </Dialog.Close>
              </div>

              <div className="mt-6">
                <ProjectGallery key={project.slug} project={project} />
              </div>

              <div className="mt-8 grid gap-8 md:grid-cols-[1.3fr_1fr]">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-accent font-mono text-xs">{"// scope"}</h3>
                    <p className="text-muted mt-2">{project.scope}</p>
                  </div>
                  <div>
                    <h3 className="text-accent font-mono text-xs">{"// my role"}</h3>
                    <p className="text-muted mt-2">{project.role}</p>
                  </div>
                  <div>
                    <h3 className="text-accent font-mono text-xs">{"// achievements"}</h3>
                    <ul className="text-muted marker:text-live mt-2 list-disc space-y-1.5 pl-5">
                      {project.achievements.map((a) => (
                        <li key={a}>{a}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-accent font-mono text-xs">{"// tech stack"}</h3>
                  <dl className="mt-3 space-y-4">
                    {Object.entries(groupStack(project.techStack)).map(([group, items]) => (
                      <div key={group}>
                        <dt className="text-muted text-xs font-medium tracking-wide uppercase">
                          {group}
                        </dt>
                        {items.map((t) => (
                          <dd key={t.name} className="mt-1.5 text-sm">
                            <span className="text-text font-medium">{t.name}</span>
                            <span className="text-muted"> · {t.why}</span>
                          </dd>
                        ))}
                      </div>
                    ))}
                  </dl>
                </div>
              </div>

              {(project.liveUrl || project.repoUrl) && (
                <div className="border-border mt-8 flex flex-wrap gap-3 border-t pt-6">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-accent text-accent-fg inline-flex h-10 items-center gap-2 rounded-lg px-4 text-sm font-medium transition hover:opacity-90"
                    >
                      Live site <ExternalLink className="size-4" aria-hidden="true" />
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-border hover:bg-surface-2 inline-flex h-10 items-center gap-2 rounded-lg border px-4 text-sm font-medium transition"
                    >
                      <FaGithub className="size-4" aria-hidden="true" /> Source
                    </a>
                  )}
                </div>
              )}
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
