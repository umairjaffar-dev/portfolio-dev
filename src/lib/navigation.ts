export const sections = [
  { id: "about", label: "About", index: "01" },
  { id: "expertise", label: "Expertise", index: "02" },
  { id: "skills", label: "Skills", index: "03" },
  { id: "process", label: "Process", index: "04" },
  { id: "experience", label: "Experience", index: "05" },
  { id: "projects", label: "Projects", index: "06" },
  { id: "contact", label: "Contact", index: "07" },
] as const;

export type SectionId = (typeof sections)[number]["id"];

export function getSection(id: SectionId) {
  return sections.find((s) => s.id === id)!;
}
