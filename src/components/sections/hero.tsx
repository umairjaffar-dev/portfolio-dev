import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { LiveDot } from "@/components/ui/live-dot";
import { profile } from "@/lib/data";
import { HeroBanner } from "./hero-banner";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[calc(100dvh-4rem)] items-center overflow-hidden py-24 sm:py-32"
    >
      <HeroBanner />
      <Container className="relative">
        {profile.availableForWork && (
          <Badge tone="live">
            <LiveDot />
            available for work
          </Badge>
        )}
        <h1 id="hero-title" className="mt-6 text-4xl font-semibold tracking-tight sm:text-6xl">
          {profile.name}
        </h1>
        <p className="mt-3 font-mono text-sm text-accent sm:text-base">{profile.tagline}</p>
        <p className="mt-6 max-w-2xl text-lg text-muted">{profile.summary}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/#projects">View work</ButtonLink>
          <ButtonLink href="/#contact" variant="secondary">
            Contact
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
