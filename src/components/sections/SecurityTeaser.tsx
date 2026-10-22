import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/icons";
import { securityTeaser } from "@/content/home";
import { page, section } from "@/content/siteMap";

export function SecurityTeaser() {
  const platform = page("platform");
  const security = section("platform", "security");

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading title={securityTeaser.heading} />
        <div className="mt-8 flex justify-center">
          <Button href={`${platform.href}#${security.id}`} variant="secondary" size="lg">
            Visit the Security Page
            <ArrowRight width={16} height={16} />
          </Button>
        </div>
      </Container>
    </section>
  );
}
