import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CardGrid } from "@/components/ui/CardGrid";
import { solutionsTeaser } from "@/content/home";
import { page, section } from "@/content/siteMap";

export function SolutionsTeaser() {
  const solutions = page("solutions");
  const cards = solutionsTeaser.cards.map((id) => {
    const s = section("solutions", id);
    return { label: s.name, href: `${solutions.href}#${s.id}` };
  });

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading title={solutionsTeaser.heading} />
        <CardGrid items={cards} className="mt-12" />
      </Container>
    </section>
  );
}
