import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { skills } from "@/lib/data";
import { SkillsConsole } from "./skills-console";

describe("SkillsConsole", () => {
  it("renders one tab per group and switches channels by click and keyboard", () => {
    render(<SkillsConsole groups={skills} />);
    const tabs = screen.getAllByRole("tab");
    expect(tabs).toHaveLength(skills.length);
    expect(tabs[0]).toHaveAttribute("aria-selected", "true");

    const panel = () => screen.getByRole("tabpanel");
    expect(within(panel()).getAllByRole("listitem")).toHaveLength(skills[0].items.length);

    fireEvent.click(tabs[3]);
    expect(tabs[3]).toHaveAttribute("aria-selected", "true");
    expect(within(panel()).getByText(skills[3].items[0].name)).toBeInTheDocument();

    fireEvent.keyDown(tabs[3], { key: "ArrowDown" });
    expect(tabs[4]).toHaveAttribute("aria-selected", "true");

    fireEvent.keyDown(tabs[4], { key: "Home" });
    expect(tabs[0]).toHaveAttribute("aria-selected", "true");
  });
});
