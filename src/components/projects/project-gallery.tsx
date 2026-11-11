"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Images } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CameraFrame } from "@/components/ui/camera-frame";
import type { Project } from "@/lib/schemas";
import { cn } from "@/lib/utils";

export function ProjectGallery({ project }: { project: Project }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [index, setIndex] = useState(0);
  const shots = project.screenshots;

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  if (shots.length === 0) {
    return (
      <CameraFrame label={`cam_01 · ${project.slug}`} className="aspect-video">
        <div className="flex h-full flex-col items-center justify-center gap-2 text-muted">
          <Images className="size-6" aria-hidden="true" />
          <p className="font-mono text-xs">screenshots coming soon</p>
        </div>
      </CameraFrame>
    );
  }

  return (
    <div>
      <CameraFrame label={`cam_0${index + 1} · ${project.slug}`} className="aspect-video">
        <div ref={emblaRef} className="h-full overflow-hidden">
          <div className="flex h-full">
            {shots.map((s) => (
              <div key={s.src} className="relative h-full min-w-0 flex-[0_0_100%]">
                <Image
                  src={s.src}
                  alt={s.alt}
                  fill
                  sizes="(min-width: 768px) 720px, 100vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </CameraFrame>

      {shots.length > 1 && (
        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="truncate text-sm text-muted">
            {shots[index]?.caption ?? shots[index]?.alt}
          </p>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-muted">
              {index + 1}/{shots.length}
            </span>
            {[
              { label: "Previous screenshot", Icon: ChevronLeft, go: () => emblaApi?.scrollPrev() },
              { label: "Next screenshot", Icon: ChevronRight, go: () => emblaApi?.scrollNext() },
            ].map(({ label, Icon, go }) => (
              <button
                key={label}
                type="button"
                onClick={go}
                aria-label={label}
                className={cn(
                  "inline-flex size-8 items-center justify-center rounded-md border border-border text-muted",
                  "transition hover:bg-surface-2 hover:text-text focus-visible:outline-2 focus-visible:outline-accent",
                )}
              >
                <Icon className="size-4" aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
