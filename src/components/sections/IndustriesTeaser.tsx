import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CardGrid } from "@/components/ui/CardGrid";
import { industriesTeaser } from "@/content/home";
import { page, section } from "@/content/siteMap";

export function IndustriesTeaser() {
  const industries = page("industries");
  const cards = industriesTeaser.cards.map((id) => {
    const s = section("industries", id);
    return { label: s.name, href: `${industries.href}#${s.id}` };
  });

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading title={industriesTeaser.heading} />
        <CardGrid items={cards} className="mt-12" />
      </Container>
    </section>
  );
}
