import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SocialIcon } from "@/components/ui/social-icon";
import { profile } from "@/lib/data";

export function Contact() {
  return (
    <Section id="contact" title="Get in touch">
      <Reveal>
        <div className="rounded-2xl border border-border bg-surface p-8 sm:p-12">
          <p className="max-w-xl text-lg text-muted">
            Hiring for a full-stack role, or building something with live video or AI monitoring?
            I&apos;d like to hear about it.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {profile.socials.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-lg border border-border bg-bg px-4 py-3 transition hover:border-accent/50 focus-visible:outline-2 focus-visible:outline-accent"
                >
                  <SocialIcon name={s.icon} className="size-5 text-accent" />
                  <span className="flex-1 text-sm font-medium">{s.label}</span>
                  <ArrowUpRight
                    className="size-4 text-muted transition group-hover:text-accent"
                    aria-hidden="true"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
