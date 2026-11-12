import { ArrowUpRight, ChevronDown } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { EmailMenu } from "@/components/ui/email-menu";
import { emailFromHref } from "@/lib/email";
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
            {profile.socials.map((s) =>
              s.href.startsWith("mailto:") ? (
                <li key={s.href}>
                  <EmailMenu
                    email={emailFromHref(s.href)}
                    side="top"
                    align="start"
                    triggerClassName="group flex w-full items-center gap-3 rounded-lg border border-border bg-bg px-4 py-3 text-left transition hover:border-accent/50 focus-visible:outline-2 focus-visible:outline-accent data-[state=open]:border-accent/50"
                  >
                    <SocialIcon name={s.icon} className="size-5 text-accent" />
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="text-sm font-medium">{s.label}</span>
                      <span className="truncate font-mono text-[11px] text-muted">
                        {emailFromHref(s.href)}
                      </span>
                    </span>
                    <ChevronDown
                      className="size-4 text-muted transition group-hover:text-accent group-data-[state=open]:rotate-180"
                      aria-hidden="true"
                    />
                  </EmailMenu>
                </li>
              ) : (
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
              ),
            )}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
