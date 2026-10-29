"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Photo } from "@/components/ui/Photo";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/icons";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { usePauseOffscreen } from "@/hooks/usePauseOffscreen";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { easeExpo } from "@/lib/motion";
import { problem } from "@/content/home";
import { cn } from "@/lib/utils";

type Row = { lead: string; text: string };

const TONES = {
  navy: {
    label: "text-teal-400",
    bar: "from-teal-400 via-[#4b49ab] to-teal-400",
    fill: "bg-teal-400",
    track: "bg-teal-100",
    badgeOn: "border-transparent bg-teal-400 text-white",
    badgeOff: "border-teal-200 bg-white text-teal-400",
    ring: "bg-teal-400",
    active: "border-teal-100 bg-teal-50",
    hover: "hover:border-teal-100",
    pill: "bg-teal-50 text-teal-400",
    spot: "rgba(48,46,134,0.10)",
  },
  red: {
    label: "text-accent-500",
    bar: "from-accent-500 via-[#ff5468] to-accent-500",
    fill: "bg-accent-500",
    track: "bg-accent-100",
    badgeOn: "border-transparent bg-accent-500 text-white",
    badgeOff: "border-accent-200 bg-white text-accent-500",
    ring: "bg-accent-500",
    active: "border-accent-100 bg-accent-50",
    hover: "hover:border-accent-100",
    pill: "bg-accent-50 text-accent-500",
    spot: "rgba(213,31,44,0.09)",
  },
} as const;

/**
 * One column of pain points. A spotlight walks down the list on its own (each gap
 * "surfacing" in turn, the timeline filling behind it); hovering takes over manually.
 */
function ProblemCard({
  label,
  rows,
  tone,
  photo,
  delay = 0,
}: {
  label: string;
  rows: Row[];
  tone: keyof typeof TONES;
  photo: string;
  delay?: number;
}) {
  const t = TONES[tone];
  const reduced = usePrefersReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { amount: 0.35 });
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    if (reduced || !inView || hovered !== null) return;
    const id = setInterval(() => setActive((a) => (a + 1) % rows.length), 2300 + delay * 1000);
    return () => clearInterval(id);
  }, [reduced, inView, hovered, rows.length, delay]);

  // Reduced motion: no walking spotlight, show the whole timeline complete.
  const shown = hovered ?? (reduced ? rows.length - 1 : active);
  const progress = rows.length > 1 ? shown / (rows.length - 1) : 1;

  // Cursor-following glow, written straight to CSS vars so moving the mouse never re-renders.
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <Reveal delay={delay} className="h-full">
      <div
        ref={cardRef}
        onPointerMove={onMove}
        className="group/card relative h-full overflow-hidden rounded-3xl border border-line-strong bg-white p-7 shadow-card transition-shadow duration-500 hover:shadow-float sm:p-9"
      >
        {/* Backdrop photo, washed out so the copy stays crisp */}
        <Photo
          name={photo}
          alt=""
          ratio="fill"
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="absolute inset-0 !bg-transparent"
          imgClassName="transition-transform duration-[1600ms] ease-out group-hover/card:scale-105"
        />
        {/* Light wash, strongest under the label */}
        <span
          className="absolute inset-0 bg-gradient-to-b from-white/[0.85] via-white/[0.22] to-white/[0.06]"
          aria-hidden
        />
        <span
          className={cn(
            "absolute inset-x-0 top-0 h-[5px] animate-shimmer bg-gradient-to-r bg-[length:200%_auto]",
            t.bar
          )}
          aria-hidden
        />
        <span
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
          style={{
            background: `radial-gradient(420px circle at var(--mx, 50%) var(--my, 0%), ${t.spot}, transparent 65%)`,
          }}
          aria-hidden
        />

        <div className="relative flex items-center justify-between gap-4">
          <h3 className={cn("font-mono text-[13px] font-bold uppercase tracking-[0.18em]", t.label)}>
            {label}
          </h3>
          <span className={cn("rounded-full px-3 py-1 font-mono text-[12px] font-bold tabular-nums", t.pill)}>
            {String(shown + 1).padStart(2, "0")} / {String(rows.length).padStart(2, "0")}
          </span>
        </div>

        <RevealGroup className="relative mt-6" gap={0.08}>
          {/* Timeline: a track with a fill that follows the active item */}
          <span
            className={cn("absolute bottom-9 left-[31px] top-9 w-[2px] rounded-full", t.track)}
            aria-hidden
          />
          <motion.span
            className={cn("absolute bottom-9 left-[31px] top-9 w-[2px] origin-top rounded-full", t.fill)}
            initial={false}
            animate={{ scaleY: progress }}
            transition={{ duration: 0.7, ease: easeExpo }}
            aria-hidden
          />

          <div className="space-y-2.5">
            {rows.map((r, i) => {
              const isActive = i === shown;
              const reached = i <= shown;
              return (
                <RevealItem key={r.lead}>
                  <div
                    onPointerEnter={() => setHovered(i)}
                    onPointerLeave={() => {
                      setHovered(null);
                      setActive(i);
                    }}
                    className={cn(
                      "relative flex gap-4 rounded-2xl border border-transparent p-3.5 transition-all duration-500",
                      isActive
                        ? cn(t.active, "translate-x-1.5 shadow-card")
                        : cn("bg-white/80 backdrop-blur-sm", t.hover)
                    )}
                  >
                    <span
                      className={cn(
                        "relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 font-mono text-[13px] font-bold transition-all duration-500",
                        reached ? t.badgeOn : t.badgeOff,
                        isActive && "scale-110"
                      )}
                      aria-hidden
                    >
                      {isActive && !reduced && (
                        <span className={cn("absolute inset-0 animate-pulse-ring rounded-full", t.ring)} />
                      )}
                      <span className="relative">{String(i + 1).padStart(2, "0")}</span>
                    </span>
                    <p className="text-[16.5px] leading-relaxed text-fg/85">
                      <strong className="font-bold text-fg">{r.lead}</strong> {r.text}
                    </p>
                  </div>
                </RevealItem>
              );
            })}
          </div>
        </RevealGroup>
      </div>
    </Reveal>
  );
}

export function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  usePauseOffscreen(sectionRef);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-12 sm:py-14 lg:py-16">
      {/* Ambient colour: navy on the operations side, red on the worker side */}
      <span
        className="pointer-events-none absolute -left-40 top-1/4 h-[460px] w-[460px] animate-aurora rounded-full bg-teal-100/60 blur-3xl"
        aria-hidden
      />
      <span
        className="pointer-events-none absolute -right-40 top-1/3 h-[460px] w-[460px] animate-aurora rounded-full bg-accent-100/40 blur-3xl [animation-delay:-9s]"
        aria-hidden
      />

      <Container className="relative max-w-[1480px] lg:!px-6 xl:!px-10">
        <SectionTitle title={problem.heading} lead={problem.intro} />

        <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-8">
          <ProblemCard label="For the operations team" rows={problem.forOperations} tone="red" photo="control-room" />
          <ProblemCard label="For the worker" rows={problem.forWorker} tone="red" photo="yard-operator-call" delay={0.1} />
        </div>

        <div className="mt-12 flex justify-center">
          <Button href="/platform" variant="secondary" size="lg">
            See How ShiftEaze Fixes This
            <ArrowRight width={16} height={16} />
          </Button>
        </div>
      </Container>
    </section>
  );
}
