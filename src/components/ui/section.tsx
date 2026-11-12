import type { ReactNode } from "react";
import { type SectionId, sections } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { Container } from "./container";
import { SectionHeading } from "./section-heading";

export function Section({
  id,
  title,
  children,
}: {
  id: SectionId;
  title: string;
  children: ReactNode;
}) {
  // Alternate tones: odd-numbered sections (01, 03, ...) sit on a lifted band.
  const lifted = sections.findIndex((s) => s.id === id) % 2 === 0;
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn(
        "scroll-mt-20 py-20 sm:py-28",
        lifted && "border-y border-accent/[0.06] bg-bg-alt",
      )}
    >
      <Container>
        <SectionHeading id={id} title={title} />
        {children}
      </Container>
    </section>
  );
}
