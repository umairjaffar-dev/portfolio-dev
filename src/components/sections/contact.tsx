import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SocialIcon } from "@/components/ui/social-icon";
import { profile } from "@/lib/data";

export function Contact() {
  return (
    <Section id="contact" title="Get in touch">
      <Reveal>
        <div className="border-border bg-surface rounded-2xl border p-8 sm:p-12">
          <p className="text-muted max-w-xl text-lg">
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
                  className="group border-border bg-bg hover:border-accent/50 focus-visible:outline-accent flex items-center gap-3 rounded-lg border px-4 py-3 transition focus-visible:outline-2"
                >
                  <SocialIcon name={s.icon} className="text-accent size-5" />
                  <span className="flex-1 text-sm font-medium">{s.label}</span>
                  <ArrowUpRight
                    className="text-muted group-hover:text-accent size-4 transition"
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
