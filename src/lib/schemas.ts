import { z } from "zod";

const nonEmpty = z.string().trim().min(1);
const urlOrNull = z.url().nullable();

/* ---------- profile.json ---------- */
export const socialSchema = z.object({
  label: nonEmpty,
  href: z.string().regex(/^(https?:\/\/|mailto:)/, "Must be an http(s) or mailto link"),
  icon: z.enum(["github", "linkedin", "mail", "upwork", "fiverr", "x"]),
});

export const profileSchema = z.object({
  name: nonEmpty,
  title: nonEmpty,
  tagline: nonEmpty,
  keywords: z.array(nonEmpty).min(1),
  summary: nonEmpty,
  about: z.array(nonEmpty).min(1),
  location: nonEmpty,
  availableForWork: z.boolean(),
  resumeUrl: z.string().startsWith("/").nullable(),
  stats: z.array(z.object({ value: nonEmpty, label: nonEmpty })).max(4),
  socials: z.array(socialSchema),
});

/* ---------- expertise.json ---------- */
export const expertiseSchema = z.array(
  z.object({
    title: nonEmpty,
    description: nonEmpty,
    icon: z.enum(["video", "cctv", "layers", "chart"]),
    tags: z.array(nonEmpty).max(4),
  }),
);

/* ---------- skills.json ---------- */
export const skillGroupSchema = z.object({
  id: nonEmpty,
  label: nonEmpty,
  items: z.array(nonEmpty).min(1),
});
export const skillsSchema = z.array(skillGroupSchema);

/* ---------- experience.json ---------- */
export const experienceSchema = z.array(
  z.object({
    company: nonEmpty,
    role: nonEmpty,
    location: nonEmpty,
    start: nonEmpty,
    end: z.string().nullable(),
    highlights: z.array(nonEmpty),
    stack: z.array(nonEmpty),
  }),
);

/* ---------- projects.json ---------- */
export const projectCategory = z.enum([
  "Full-Stack",
  "Frontend",
  "Backend",
  "Video Streaming",
  "AI",
  "Data Visualization",
]);

export const techItemSchema = z.object({
  name: nonEmpty,
  group: z.enum(["Frontend", "Backend", "Video", "Data", "AI", "DevOps", "Testing"]),
  /** Why this tech was used. Keeps every claim defensible in an interview. */
  why: nonEmpty,
});

export const screenshotSchema = z.object({
  src: z.string().startsWith("/images/projects/"),
  alt: nonEmpty,
  caption: z.string().optional(),
});

export const projectSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/, "Use kebab-case"),
  title: nonEmpty,
  tagline: nonEmpty,
  category: z.array(projectCategory).min(1),
  featured: z.boolean(),
  confidential: z.boolean(),
  period: nonEmpty,
  scope: nonEmpty,
  role: nonEmpty,
  achievements: z.array(nonEmpty).min(1),
  techStack: z.array(techItemSchema).min(1),
  screenshots: z.array(screenshotSchema),
  liveUrl: urlOrNull,
  repoUrl: urlOrNull,
});

export const projectsSchema = z
  .array(projectSchema)
  .refine((list) => new Set(list.map((p) => p.slug)).size === list.length, {
    message: "Project slugs must be unique",
  });

export type Profile = z.infer<typeof profileSchema>;
export type ExpertiseItem = z.infer<typeof expertiseSchema>[number];
export type SkillGroup = z.infer<typeof skillGroupSchema>;
export type Experience = z.infer<typeof experienceSchema>[number];
export type Project = z.infer<typeof projectSchema>;
export type TechItem = z.infer<typeof techItemSchema>;
