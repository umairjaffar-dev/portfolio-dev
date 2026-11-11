import { Container } from "@/components/ui/container";
import { profile } from "@/lib/data";

/** Cached at build time, so prerendering stays deterministic under Cache Components. */
async function CopyrightYear() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}

export function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <Container className="flex flex-col items-center justify-between gap-3 font-mono text-xs text-muted sm:flex-row">
        <p>
          © <CopyrightYear /> {profile.name}
        </p>
        <p>{profile.location}</p>
      </Container>
    </footer>
  );
}
