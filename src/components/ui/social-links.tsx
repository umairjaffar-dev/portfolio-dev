import { profile } from "@/lib/data";
import { cn } from "@/lib/utils";
import { SocialIcon } from "./social-icon";

/** Icon links to the socials in profile.json (header, footer, mobile menu). */
export function SocialLinks({
  className,
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md";
}) {
  return (
    <ul className={cn("flex items-center gap-1.5", className)}>
      {profile.socials.map((s) => {
        const external = s.href.startsWith("http");
        return (
          <li key={s.label}>
            <a
              href={s.href}
              aria-label={s.label}
              title={s.label}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className={cn(
                "flex items-center justify-center rounded-lg border border-border text-muted transition hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                size === "sm" ? "size-8" : "size-9",
              )}
            >
              <SocialIcon name={s.icon} className="size-4" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
