import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Photo } from "@/components/ui/Photo";
import { SmartShot } from "@/components/ui/SmartShot";
import { Check } from "@/components/ui/icons";
import { FocusCarousel } from "@/components/sections/FocusCarousel";
import { AbsenceRiskPanel, AnalyticsPanel } from "@/components/visuals/ClearPanels";
import type { PlatformCard } from "@/content/platformCards";
import type { BulletItem } from "@/components/ui/BulletList";
import { cn } from "@/lib/utils";

/** What goes on the image side of a split: a real dashboard capture or a site photo. */
export type SplitVisual =
  | {
      kind: "shot";
      /** File in /public/assets/reference. */
      src: string;
      alt: string;
      mock: "manpower" | "shift" | "attendance" | "leave" | "roster";
      /** Text shown in the faux address bar. */
      url: string;
    }
  | {
      kind: "photo";
      /** Basename in /public/assets/photos, without extension. */
      name: string;
      alt: string;
    }
  | {
      /** A large, readable product panel drawn in HTML (see ClearPanels). */
      kind: "panel";
      panel: "absence" | "analytics";
    };

/**
 * A Platform section laid out as a two-column "zig-zag" row: copy on one side,
 * its image on the other, alternating by `flip`. Same copy contract as
 * FeatureBody (heading, paragraphs, bullets, closing), but no divider rules —
 * rows are separated by spacing and an alternating surface tint instead.
 */
export function FeatureSplit({
  id,
  heading,
  paragraphs,
  bullets,
  closing,
  visual,
  flip = false,
  tinted = false,
  cards,
  cardTag,
}: {
  id: string;
  heading: string;
  paragraphs?: string[];
  bullets?: (BulletItem | string)[];
  closing?: string;
  visual: SplitVisual;
  /** Image on the left, copy on the right (from `lg` up). */
  flip?: boolean;
  /** White surface behind the row, for alternating bands. */
  tinted?: boolean;
  /** Points shown as a spotlight carousel under the row instead of a bullet list. */
  cards?: PlatformCard[];
  cardTag?: string;
}) {
  const headWords = heading.split(" ");
  const lastWord = headWords.pop();
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-[76px] overflow-hidden py-14 sm:py-16 lg:py-20",
        tinted && "bg-white"
      )}
    >
      <Container className="max-w-[1480px] lg:!px-6 xl:!px-10">
        <div
          className={cn(
            "grid items-center gap-10 lg:gap-12 xl:gap-16",
            cards
              ? "lg:grid-cols-2"
              : flip
                ? "lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]"
                : "lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
          )}
        >
          {/* Copy */}
          <Reveal className={cn(flip && "lg:order-2")}>
            <h2 className="text-balance font-display text-[clamp(2.2rem,4vw,3.5rem)] font-extrabold leading-[1.06] tracking-tight text-fg">
              {headWords.join(" ")}{" "}
              <span className="inline-block animate-shimmer bg-gradient-to-r from-[#e0263a] via-[#2f6bff] to-[#e0263a] bg-[length:200%_auto] bg-clip-text text-transparent">
                {lastWord}
              </span>
            </h2>
            <span
              className="mt-6 block h-[6px] w-28 rounded-full bg-gradient-to-r from-teal-400 via-teal-300 to-accent-500"
              aria-hidden
            />
            {paragraphs?.map((p, i) => (
              <p key={i} className="mt-6 text-[19.5px] leading-relaxed text-fg/85 first:mt-8">
                {p}
              </p>
            ))}
            {bullets && (
              <ul className="mt-8 space-y-[18px]">
                {bullets.map((raw, i) => {
                  const item: BulletItem = typeof raw === "string" ? { text: raw } : raw;
                  return (
                    <li key={i} className="flex gap-3.5 text-[17.5px] leading-relaxed text-fg/85">
                      <span
                        className="mt-1 grid h-[26px] w-[26px] shrink-0 place-items-center rounded-full bg-teal-400 text-white"
                        aria-hidden
                      >
                        <Check width={14} height={14} />
                      </span>
                      <span>
                        {item.lead && <strong className="font-bold text-fg">{item.lead} </strong>}
                        {item.text}
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
            {closing && (
              <p className="mt-8 border-l-4 border-accent-500 pl-5 text-[19px] font-bold leading-relaxed text-fg">
                {closing}
              </p>
            )}
          </Reveal>

          {/* Visual */}
          <Reveal delay={0.1} className={cn("relative", flip && "lg:order-1")}>
            {cards ? (
              <FocusCarousel
                cards={cards}
                tag={cardTag ?? ""}
                image={
                  visual.kind === "shot"
                    ? visual.src
                    : visual.kind === "photo"
                      ? `/assets/photos/${visual.name}.webp`
                      : ""
                }
              />
            ) : (
              <>
                {/* Offset brand-tint panel gives the image depth without blur or tilt. */}
                <span
                  className={cn(
                    "pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-teal-100 to-teal-50",
                    flip ? "-translate-x-4 translate-y-4" : "translate-x-4 translate-y-4"
                  )}
                  aria-hidden
                />
                <div className="relative">
                  {visual.kind === "panel" ? (
                    visual.panel === "absence" ? <AbsenceRiskPanel /> : <AnalyticsPanel />
                  ) : visual.kind === "shot" ? (
                    <div className="overflow-hidden rounded-2xl border border-line-strong bg-white shadow-float ring-1 ring-black/5">
                      <div className="flex items-center gap-3 border-b border-line bg-ink-800 px-4 py-2.5">
                        <div className="flex gap-1.5" aria-hidden>
                          <span className="h-2.5 w-2.5 rounded-full bg-accent-300" />
                          <span className="h-2.5 w-2.5 rounded-full bg-flag/70" />
                          <span className="h-2.5 w-2.5 rounded-full bg-risk-low/60" />
                        </div>
                        <div className="flex-1 truncate rounded-md bg-white px-3 py-1 text-center font-mono text-[11px] text-fg-faint">
                          {visual.url}
                        </div>
                      </div>
                      <SmartShot
                        src={visual.src}
                        alt={visual.alt}
                        kind={visual.mock}
                        quality={95}
                        sizes="(min-width: 1320px) 760px, (min-width: 1024px) 56vw, 100vw"
                        className="aspect-[1900/980]"
                      />
                    </div>
                  ) : (
                    <Photo
                      name={visual.name}
                      alt={visual.alt}
                      ratio="16/11"
                      className="rounded-3xl shadow-float ring-1 ring-black/5"
                      sizes="(min-width: 1320px) 760px, (min-width: 1024px) 56vw, 100vw"
                    />
                  )}
                </div>
              </>
            )}
          </Reveal>
        </div>

      </Container>
    </section>
  );
}
