import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Photo } from "@/components/ui/Photo";
import { MarqueeTrack } from "@/components/ui/MarqueeTrack";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowUpRight } from "@/components/ui/icons";
import { industriesTeaser } from "@/content/home";
import { page, section } from "@/content/siteMap";

const PHOTOS = ["terminal-aerial", "factory-assembly", "warehouse-fulfillment", "control-room"];

export function IndustriesTeaser() {
  const industries = page("industries");
  const cards = industriesTeaser.cards.map((id) => {
    const s = section("industries", id);
    return { label: s.name, href: `${industries.href}#${s.id}` };
  });

  return (
    <section className="overflow-hidden bg-white py-12 sm:py-14 lg:py-16">
      <Container className="max-w-[1480px] lg:!px-6 xl:!px-10">
        <SectionTitle title={industriesTeaser.heading} />
      </Container>

      {/* Full-width strip: cards glide continuously to the right at a steady 70px/s */}
      <Reveal className="mt-10">
        <MarqueeTrack speed={70} label={industriesTeaser.heading}>
          {cards.map((c, i) => (
            <Link
              key={c.href}
              href={c.href}
              className="group relative block w-[clamp(280px,29vw,400px)] shrink-0 overflow-hidden rounded-[28px] shadow-card ring-1 ring-line-strong transition-shadow duration-300 hover:shadow-float"
            >
              <Photo
                name={PHOTOS[i % PHOTOS.length]}
                alt=""
                ratio="400/310"
                sizes="(min-width: 1024px) 29vw, 280px"
                className="rounded-[28px]"
                imgClassName="transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <span
                className="absolute inset-0 rounded-[28px] bg-gradient-to-t from-teal-800/95 via-teal-800/35 to-transparent"
                aria-hidden
              />
              <span
                className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white text-teal-400 transition-all duration-300 group-hover:rotate-12 group-hover:bg-accent-500 group-hover:text-white"
                aria-hidden
              >
                <ArrowUpRight width={17} height={17} />
              </span>
              <h3 className="absolute inset-x-0 bottom-0 p-5 font-display text-[20px] font-extrabold leading-tight tracking-tight text-white">
                {c.label}
              </h3>
            </Link>
          ))}
        </MarqueeTrack>
      </Reveal>
    </section>
  );
}
