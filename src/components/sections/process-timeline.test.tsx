import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { processStages } from "@/lib/data";
import { ProcessTimeline } from "./process-timeline";

describe("ProcessTimeline", () => {
  it("renders every stage in order with its tools as named icons", () => {
    render(<ProcessTimeline stages={processStages} />);
    const headings = screen.getAllByRole("heading", { level: 3 });
    expect(headings.map((h) => h.textContent)).toEqual(processStages.map((s) => s.title));

    const first = processStages[0];
    const tools = screen.getByRole("list", { name: `${first.title} tools` });
    for (const tool of first.tools) {
      expect(within(tools).getByLabelText(tool.name)).toBeInTheDocument();
    }
  });
});
