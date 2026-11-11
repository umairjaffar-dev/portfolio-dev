# portfolio-dev

Personal portfolio of Umair Jaffar: Full-Stack Developer, Video Streaming & AI Surveillance.
Built with Next.js 16 (App Router, Cache Components), React 19, TypeScript, and Tailwind CSS v4.

## Scripts

| Command                           | Purpose                                          |
| --------------------------------- | ------------------------------------------------ |
| `npm run dev`                     | Local dev server                                 |
| `npm run build`                   | Production build (fails on invalid content JSON) |
| `npm run typecheck`               | Generate route types, then `tsc --noEmit`        |
| `npm run lint` / `npm run format` | ESLint / Prettier                                |
| `npm run test:run`                | Vitest unit tests                                |

## Structure

```
src/
├── app/                 # layout, page, not-found, globals.css (Theme A tokens), fonts/
├── components/
│   ├── layout/          # Navbar, Footer
│   ├── sections/        # Hero, About, Expertise, Skills, Experience, Projects, Contact
│   └── ui/              # Container, Section, SectionHeading, Badge, ButtonLink, LiveDot, ThemeToggle
├── data/                # ✏️ All content lives here (profile, skills, experience, projects)
└── lib/                 # schemas.ts (Zod), data.ts (parsed content), navigation, theme, utils
public/images/projects/<slug>/  # Project screenshots (.webp)
public/resume/           # CV PDF
```

## Updating content

Edit the JSON files in `src/data/`. Each file is validated by `src/lib/schemas.ts` at build time,
so a missing or wrong field stops the build with a clear error instead of shipping a broken page.
