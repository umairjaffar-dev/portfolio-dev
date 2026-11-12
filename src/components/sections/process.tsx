import { Section } from "@/components/ui/section";
import { processStages } from "@/lib/data";
import { ProcessTimeline } from "./process-timeline";

export function Process() {
  return (
    <Section id="process" title="How I build software">
      <p className="-mt-6 mb-10 max-w-2xl text-lg text-muted">
        From the first conversation to a product that scales.
      </p>
      <ProcessTimeline stages={processStages} />
    </Section>
  );
}
