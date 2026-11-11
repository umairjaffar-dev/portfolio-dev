import type { ReactNode } from "react";
import type { SectionId } from "@/lib/navigation";
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
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-20 py-20 sm:py-28">
      <Container>
        <SectionHeading id={id} title={title} />
        {children}
      </Container>
    </section>
  );
}
