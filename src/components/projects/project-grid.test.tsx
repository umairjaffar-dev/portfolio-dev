import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { projects } from "@/lib/data";
import { ProjectGrid } from "./project-grid";

describe("ProjectGrid", () => {
  it("opens the project modal with scope and tech stack on Preview", () => {
    render(<ProjectGrid projects={projects} />);
    fireEvent.click(screen.getAllByRole("button", { name: /preview/i })[0]);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveTextContent(projects[0].title);
    expect(dialog).toHaveTextContent("// scope");
    expect(dialog).toHaveTextContent(projects[0].techStack[0].name);
  });
});
