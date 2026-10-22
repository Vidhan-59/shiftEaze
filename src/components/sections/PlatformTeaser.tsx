import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { CardGrid } from "@/components/ui/CardGrid";
import { platformTeaser } from "@/content/home";
import { page, section } from "@/content/siteMap";

export function PlatformTeaser() {
  const platform = page("platform");
  const cards = platformTeaser.cards.map((id) => {
    const s = section("platform", id);
    return { label: s.name, href: `${platform.href}#${s.id}` };
  });

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <Reveal>
          <h2 className="mx-auto max-w-2xl text-balance text-center text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.05] tracking-tighter text-fg">
            <Link href="/platform" className="transition-colors hover:text-teal-400">
              {platformTeaser.heading}
            </Link>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-center text-[17px] leading-relaxed text-fg-muted">
            {platformTeaser.intro}
          </p>
        </Reveal>
        <CardGrid items={cards} className="mt-12" />
      </Container>
    </section>
  );
}
