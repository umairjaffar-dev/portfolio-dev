import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { experience } from "@/lib/data";
import { ExperienceStack } from "./experience-stack";

describe("ExperienceStack", () => {
  it("renders every role with its highlights and metrics", () => {
    render(<ExperienceStack jobs={experience} />);
    const cards = screen
      .getAllByRole("listitem")
      .filter((li) => li.hasAttribute("data-stack-card"));
    expect(cards).toHaveLength(experience.length);

    experience.forEach((job, i) => {
      const card = within(cards[i]);
      expect(card.getByRole("heading", { level: 3 })).toHaveTextContent(job.company);
      job.highlights.forEach((h) => expect(card.getByText(h.text)).toBeInTheDocument());
      job.metrics.forEach((m) => expect(card.getByText(m.label)).toBeInTheDocument());
    });
  });
});
