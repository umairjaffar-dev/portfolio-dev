import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { SocialLinks } from "@/components/ui/social-links";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { profile } from "@/lib/data";
import { sections } from "@/lib/navigation";
import { MobileNav } from "./mobile-nav";
import { RecTimecode, ScrollProgressBar } from "./scroll-progress";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-6">
        {/* Logo always returns to the hero (smooth via SmoothScroll). */}
        <Link
          href="/#top"
          aria-label={`${profile.name}, back to top`}
          className="rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          <Logo name={profile.name} />
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-5 text-sm text-muted lg:gap-6">
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`/#${s.id}`} className="transition hover:text-text">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <RecTimecode className="hidden items-center gap-1.5 font-mono text-[11px] text-alert xl:inline-flex" />
          <SocialLinks size="sm" className="hidden lg:flex" />
          <ThemeToggle />
          <MobileNav />
        </div>
      </Container>
      <ScrollProgressBar />
    </header>
  );
}
