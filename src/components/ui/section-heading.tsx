import { getSection, type SectionId } from "@/lib/navigation";

/** Renders "// 01 · about" label plus the section title. */
export function SectionHeading({ id, title }: { id: SectionId; title: string }) {
  const { index, label } = getSection(id);
  return (
    <header className="mb-10">
      <p className="text-accent font-mono text-sm">
        {"// "}
        {index} · {label.toLowerCase()}
      </p>
      <h2 id={`${id}-title`} className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h2>
    </header>
  );
}
