import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { SocialLinks } from "@/components/ui/social-links";
import { profile } from "@/lib/data";

/** Cached at build time, so prerendering stays deterministic under Cache Components. */
async function CopyrightYear() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/40 py-10">
      <Container className="flex flex-col gap-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <Link
            href="/#top"
            aria-label={`${profile.name}, back to top`}
            className="rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            <Logo name={profile.name} />
          </Link>
          <SocialLinks menuSide="top" />
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-border pt-6 font-mono text-xs text-muted sm:flex-row">
          <p>
            © <CopyrightYear /> {profile.name} · {profile.location}
          </p>
          <Link
            href="/#top"
            className="inline-flex items-center gap-1.5 transition hover:text-accent"
          >
            Back to top
            <ArrowUp className="size-3.5" aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </footer>
  );
}
