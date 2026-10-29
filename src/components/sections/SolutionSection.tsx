import type { ComponentType } from "react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/**
 * One Solutions section: an outlined index numeral, the heading, the grey copy
 * as a lead and the blue copy beneath (both in dark ink), beside an animated
 * scene. Sides alternate; the light background alternates white / pale blue.
 */
export function SolutionSection({
  id,
  index,
  heading,
  paragraphs,
  Visual,
}: {
  id: string;
  index: number;
  heading: string;
  paragraphs: string[];
  Visual?: ComponentType;
}) {
  const flip = index % 2 === 1;
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-[76px] overflow-hidden py-12 sm:py-14 lg:py-16",
        index % 2 === 0 ? "bg-white" : "bg-gradient-to-b from-[#f4f7ff] to-white",
      )}
    >
      <Container className="relative max-w-[1480px] lg:!px-6 xl:!px-10">
        <div
          className={cn(
            "grid items-center gap-10 lg:gap-14",
            Visual && (flip ? "lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]" : "lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]"),
          )}
        >
          <div className={cn("relative", flip && "lg:order-2")}>
            <span
              className="mb-3 block select-none font-display text-[clamp(3.5rem,6vw,5.5rem)] font-extrabold leading-none text-transparent [-webkit-text-stroke:1.5px_rgba(47,107,255,0.75)]"
              aria-hidden
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <SectionTitle title={heading} align="left" className="max-w-none" />
            {paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.1 + i * 0.05}>
                <p
                  className={cn(
                    "mt-6 leading-relaxed",
                    i === 0
                      ? "border-l-4 border-[#2f6bff] pl-5 text-[18px] font-bold text-[#0d0c2b]"
                      : "text-[16px] font-medium text-[#1f2340]",
                  )}
                >
                  {p}
                </p>
              </Reveal>
            ))}
          </div>
          {Visual && (
            <Reveal className={cn(flip && "lg:order-1")} delay={0.1}>
              <Visual />
            </Reveal>
          )}
        </div>
      </Container>
    </section>
  );
}
