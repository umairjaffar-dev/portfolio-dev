import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import projectsJson from "@/data/projects.json";
import { experience, processStages, profile, projects, skills } from "./data";
import { projectsSchema } from "./schemas";

describe("content data", () => {
  it("parses every JSON file against its schema", () => {
    expect(profile.name).toBeTruthy();
    expect(skills.length).toBeGreaterThan(0);
    expect(processStages.length).toBeGreaterThan(0);
    expect(experience.length).toBeGreaterThan(0);
    expect(projects.length).toBeGreaterThan(0);
  });

  it("rejects duplicate project slugs", () => {
    const dup = [...projectsJson, projectsJson[0]];
    expect(projectsSchema.safeParse(dup).success).toBe(false);
  });

  it("points every screenshot at a file that exists in public/", () => {
    const missing = projects
      .flatMap((p) => p.screenshots.map((s) => s.src))
      .filter((src) => !existsSync(join(process.cwd(), "public", src)));
    expect(missing).toEqual([]);
  });
});
