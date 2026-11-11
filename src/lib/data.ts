import profileJson from "@/data/profile.json";
import expertiseJson from "@/data/expertise.json";
import skillsJson from "@/data/skills.json";
import experienceJson from "@/data/experience.json";
import projectsJson from "@/data/projects.json";
import {
  experienceSchema,
  expertiseSchema,
  profileSchema,
  projectsSchema,
  skillsSchema,
} from "./schemas";

/**
 * All content is parsed once at build time. Invalid JSON fails the build with a
 * readable Zod error instead of shipping a broken section.
 */
export const profile = profileSchema.parse(profileJson);
export const expertise = expertiseSchema.parse(expertiseJson);
export const skills = skillsSchema.parse(skillsJson);
export const experience = experienceSchema.parse(experienceJson);
export const projects = projectsSchema.parse(projectsJson);

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
