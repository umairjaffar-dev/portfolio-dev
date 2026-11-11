import Link from "next/link";
import { Container } from "@/components/ui/container";
import { LiveDot } from "@/components/ui/live-dot";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { profile } from "@/lib/data";
import { sections } from "@/lib/navigation";

export function Navbar() {
  return (
    <header className="border-border bg-bg/80 sticky top-0 z-40 border-b backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2 font-mono text-sm font-medium">
          <LiveDot />
          {profile.name.split(" ")[0].toLowerCase()}.dev
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="text-muted flex items-center gap-6 text-sm">
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`/#${s.id}`} className="hover:text-text transition">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ThemeToggle />
      </Container>
    </header>
  );
}
