import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { SiFiverr, SiUpwork } from "react-icons/si";
import type { Profile } from "@/lib/schemas";

const icons = {
  github: FaGithub,
  linkedin: FaLinkedin,
  mail: Mail,
  upwork: SiUpwork,
  fiverr: SiFiverr,
  x: FaXTwitter,
} satisfies Record<Profile["socials"][number]["icon"], unknown>;

export function SocialIcon({
  name,
  className,
}: {
  name: Profile["socials"][number]["icon"];
  className?: string;
}) {
  const Icon = icons[name];
  return <Icon className={className} aria-hidden="true" />;
}
