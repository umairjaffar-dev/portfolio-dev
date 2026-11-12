import { profile } from "@/lib/data";
import { cn } from "@/lib/utils";
import { emailFromHref } from "@/lib/email";
import { EmailMenu } from "./email-menu";
import { SocialIcon } from "./social-icon";

/** Icon links to the socials in profile.json (header, footer, mobile menu). */
export function SocialLinks({
  className,
  size = "md",
  menuSide = "bottom",
}: {
  className?: string;
  size?: "sm" | "md";
  /** Where the email options menu opens (use "top" near the bottom of the page). */
  menuSide?: "top" | "bottom";
}) {
  return (
    <ul className={cn("flex items-center gap-1.5", className)}>
      {profile.socials.map((s) => {
        const external = s.href.startsWith("http");
        const buttonClass = cn(
          "flex items-center justify-center rounded-lg border border-border text-muted transition hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent data-[state=open]:border-accent/60 data-[state=open]:text-accent",
          size === "sm" ? "size-8" : "size-9",
        );
        if (s.href.startsWith("mailto:")) {
          return (
            <li key={s.label}>
              <EmailMenu
                email={emailFromHref(s.href)}
                triggerLabel={`${s.label} options`}
                triggerClassName={buttonClass}
                side={menuSide}
              >
                <SocialIcon name={s.icon} className="size-4" />
              </EmailMenu>
            </li>
          );
        }
        return (
          <li key={s.label}>
            <a
              href={s.href}
              aria-label={s.label}
              title={s.label}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className={buttonClass}
            >
              <SocialIcon name={s.icon} className="size-4" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
