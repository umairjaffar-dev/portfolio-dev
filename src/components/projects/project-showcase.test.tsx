import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { projects } from "@/lib/data";
import { ProjectShowcase } from "./project-showcase";

describe("ProjectShowcase", () => {
  it("renders a row per project and opens the case study modal", () => {
    render(<ProjectShowcase projects={projects} />);
    expect(screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent)).toEqual(
      projects.map((p) => p.title),
    );

    fireEvent.click(screen.getAllByRole("button", { name: /view case study/i })[0]);
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveTextContent(projects[0].title);
    expect(dialog).toHaveTextContent("// scope");
    expect(dialog).toHaveTextContent(projects[0].techStack[0].name);
  });

  it("opens the same modal from the preview frame", () => {
    render(<ProjectShowcase projects={projects} />);
    fireEvent.click(screen.getByRole("button", { name: `Open ${projects[1].title} case study` }));
    expect(screen.getByRole("dialog")).toHaveTextContent(projects[1].title);
  });
});
