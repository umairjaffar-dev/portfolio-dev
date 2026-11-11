import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <Container className="py-32 text-center">
      <p className="text-alert font-mono text-sm">signal lost · 404</p>
      <h1 className="mt-4 text-3xl font-semibold">This feed doesn&apos;t exist</h1>
      <ButtonLink href="/" className="mt-8">
        Back to home
      </ButtonLink>
    </Container>
  );
}
