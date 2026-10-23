import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Photo } from "@/components/ui/Photo";
import { SmartShot } from "@/components/ui/SmartShot";
import { Check } from "@/components/ui/icons";
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
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-[76px] overflow-hidden py-16 sm:py-20 lg:py-24",
        tinted && "bg-white"
      )}
    >
      <Container className="max-w-[1320px]">
        <div
          className={cn(
            "grid items-center gap-10 lg:gap-14 xl:gap-20",
            flip
              ? "lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]"
              : "lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
          )}
        >
          {/* Copy */}
          <Reveal className={cn(flip && "lg:order-2")}>
            <h2 className="text-balance font-display text-[clamp(1.9rem,3.4vw,2.75rem)] font-extrabold leading-[1.08] tracking-tight text-fg">
              {heading}
            </h2>
            <span
              className="mt-5 block h-[5px] w-24 rounded-full bg-gradient-to-r from-teal-400 via-teal-300 to-accent-500"
              aria-hidden
            />
            {paragraphs?.map((p, i) => (
              <p key={i} className="mt-6 text-[17px] leading-relaxed text-fg-muted first:mt-7">
                {p}
              </p>
            ))}
            {bullets && (
              <ul className="mt-7 space-y-3.5">
                {bullets.map((raw, i) => {
                  const item: BulletItem = typeof raw === "string" ? { text: raw } : raw;
                  return (
                    <li key={i} className="flex gap-3 text-[15.5px] leading-relaxed text-fg-muted">
                      <span
                        className="mt-0.5 grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full bg-teal-400 text-white"
                        aria-hidden
                      >
                        <Check width={12} height={12} />
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
              <p className="mt-7 border-l-4 border-accent-500 pl-4 text-[16.5px] font-semibold leading-relaxed text-fg">
                {closing}
              </p>
            )}
          </Reveal>

          {/* Visual */}
          <Reveal delay={0.1} className={cn("relative", flip && "lg:order-1")}>
            {/* Offset brand-tint panel gives the image depth without blur or tilt. */}
            <span
              className={cn(
                "pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-teal-100 to-teal-50",
                flip ? "-translate-x-4 translate-y-4" : "translate-x-4 translate-y-4"
              )}
              aria-hidden
            />
            <div className="relative">
              {visual.kind === "shot" ? (
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
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
