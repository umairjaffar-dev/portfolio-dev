import { describe, expect, it } from "vitest";
import projectsJson from "@/data/projects.json";
import { experience, profile, projects, skills } from "./data";
import { projectsSchema } from "./schemas";

describe("content data", () => {
  it("parses every JSON file against its schema", () => {
    expect(profile.name).toBeTruthy();
    expect(skills.length).toBeGreaterThan(0);
    expect(experience.length).toBeGreaterThan(0);
    expect(projects.length).toBeGreaterThan(0);
  });

  it("rejects duplicate project slugs", () => {
    const dup = [...projectsJson, projectsJson[0]];
    expect(projectsSchema.safeParse(dup).success).toBe(false);
  });
});
