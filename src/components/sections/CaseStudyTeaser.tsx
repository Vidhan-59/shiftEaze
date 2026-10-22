import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/icons";
import { caseStudyTeaser } from "@/content/home";
import { page, section } from "@/content/siteMap";

export function CaseStudyTeaser() {
  const caseStudies = page("case-studies");
  const mundra = section("case-studies", "mundra-port-workforce-management-case-study");

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading title={caseStudyTeaser.heading} lead={caseStudyTeaser.summary} />
        <div className="mt-8 flex justify-center">
          <Button href={`${caseStudies.href}#${mundra.id}`} variant="secondary" size="lg">
            Read the Full Case Study
            <ArrowRight width={16} height={16} />
          </Button>
        </div>
      </Container>
    </section>
  );
}
