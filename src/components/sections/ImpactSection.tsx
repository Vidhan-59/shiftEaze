"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { FillButton } from "@/components/ui/FillButton";
import { Chart, Check, Shield } from "@/components/ui/icons";
import { usePauseOffscreen } from "@/hooks/usePauseOffscreen";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { easeExpo } from "@/lib/motion";
import { impact } from "@/content/home";
import { DEMO_CTA_LABEL } from "@/content/config";
import { cn } from "@/lib/utils";

const TONES = {
  dark: {
    card: "border-teal-400 text-white shadow-float",
    label: "text-white",
    pill: "bg-white/15 text-white",
    track: "bg-white/20",
    fill: "bg-white",
    badgeOn: "border-transparent bg-white text-teal-500",
    badgeOff: "border-white/40 bg-white/10 text-white",
    ring: "bg-white/70",
    active: "border-white/30 bg-white/[0.17]",
    idle: "border-transparent bg-white/[0.07] hover:bg-white/[0.12]",
    text: "text-white",
    spot: "rgba(255,255,255,0.14)",
  },
  light: {
    card: "border-line-strong text-fg shadow-card",
    label: "text-accent-500",
    pill: "bg-teal-50 text-teal-400",
    track: "bg-teal-100",
    fill: "bg-teal-400",
    badgeOn: "border-transparent bg-teal-400 text-white",
    badgeOff: "border-teal-200 bg-white text-teal-400",
    ring: "bg-teal-400",
    active: "border-teal-100 bg-teal-50",
    idle: "border-transparent bg-white/80 backdrop-blur-sm hover:border-teal-100",
    text: "text-fg/90",
    spot: "rgba(48,46,134,0.10)",
  },
} as const;

/**
 * One outcomes column. A spotlight walks down the list on its own (the timeline
 * filling behind it); hovering a row takes over. Photo backdrop and a small live
 * graphic in the header keep the panel from reading as a plain checklist.
 */
function ImpactPanel({
  label,
  items,
  dark,
  photo,
  deco,
  delay = 0,
}: {
  label: string;
  items: string[];
  dark?: boolean;
  photo: string;
  deco: "bars" | "ring";
  delay?: number;
}) {
  const t = TONES[dark ? "dark" : "light"];
  const reduced = usePrefersReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { amount: 0.35 });
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    if (reduced || !inView || hovered !== null) return;
    const id = setInterval(() => setActive((a) => (a + 1) % items.length), 2400 + delay * 1000);
    return () => clearInterval(id);
  }, [reduced, inView, hovered, items.length, delay]);

  const shown = hovered ?? (reduced ? items.length - 1 : active);
  const progress = items.length > 1 ? shown / (items.length - 1) : 1;

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
        className={cn(
          "group/card relative h-full overflow-hidden rounded-3xl border p-6 transition-shadow duration-500 hover:shadow-float sm:p-8",
          dark ? "bg-teal-500" : "bg-white",
          t.card
        )}
      >
        <Photo
          name={photo}
          alt=""
          ratio="fill"
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="absolute inset-0 !bg-transparent"
          imgClassName="transition-transform duration-[1600ms] ease-out group-hover/card:scale-105"
        />
        <span
          className={cn(
            "absolute inset-0",
            dark
              ? "bg-gradient-to-br from-teal-400/[0.93] via-teal-500/[0.88] to-teal-600/[0.94]"
              : "bg-gradient-to-b from-white/[0.94] via-white/[0.84] to-white/[0.7]"
          )}
          aria-hidden
        />
        {/* Soft colour bleeding in from the corners */}
        <span
          className={cn(
            "pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl",
            dark ? "bg-[#2f6bff]/40" : "bg-[#2f6bff]/15"
          )}
          aria-hidden
        />
        <span
          className={cn(
            "pointer-events-none absolute -bottom-28 -left-24 h-72 w-72 rounded-full blur-3xl",
            dark ? "bg-accent-500/30" : "bg-accent-500/10"
          )}
          aria-hidden
        />
        <span
          className="absolute inset-x-0 top-0 h-[5px] animate-shimmer bg-gradient-to-r from-[#e0263a] via-[#2f6bff] to-[#e0263a] bg-[length:200%_auto]"
          aria-hidden
        />
        <span
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
          style={{ background: `radial-gradient(420px circle at var(--mx, 50%) var(--my, 0%), ${t.spot}, transparent 65%)` }}
          aria-hidden
        />

        <div className="relative flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <span
              className={cn(
                "grid h-11 w-11 shrink-0 place-items-center rounded-2xl",
                dark ? "bg-white/15 text-white" : "bg-teal-400 text-white"
              )}
            >
              {dark ? <Chart width={20} height={20} /> : <Shield width={20} height={20} />}
            </span>
            <h3 className={cn("truncate font-mono text-[13px] font-bold uppercase tracking-[0.18em]", t.label)}>{label}</h3>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            {deco === "bars" ? (
              <span className="hidden h-10 items-end gap-1 sm:flex" aria-hidden>
                {[0.4, 0.65, 0.5, 0.85, 1].map((h, i) => (
                  <motion.i
                    key={i}
                    className="block w-1.5 rounded-t-sm bg-white/80"
                    initial={{ height: h * 36 }}
                    animate={inView && !reduced ? { height: [6, h * 38, h * 22, h * 38] } : { height: h * 36 }}
                    transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.16, ease: "easeInOut" }}
                  />
                ))}
              </span>
            ) : (
              <span className="relative hidden h-11 w-11 sm:block" aria-hidden>
                <svg viewBox="0 0 44 44" className="h-full w-full -rotate-90">
                  <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(48,46,134,0.14)" strokeWidth="4.5" />
                  <motion.circle
                    cx="22"
                    cy="22"
                    r="18"
                    fill="none"
                    stroke="#2f6bff"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 1 }}
                    animate={inView && !reduced ? { pathLength: [0.15, 1] } : { pathLength: 1 }}
                    transition={{ duration: 2.2, repeat: Infinity, repeatType: "reverse", ease: easeExpo }}
                  />
                </svg>
                <span className="absolute inset-0 grid place-items-center text-[#2f6bff]">
                  <Check width={15} height={15} />
                </span>
              </span>
            )}
            <span className={cn("rounded-full px-3 py-1 font-mono text-[12px] font-bold tabular-nums", t.pill)}>
              {String(shown + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        <RevealGroup className="relative mt-6" gap={0.08}>
          <span className={cn("absolute bottom-7 left-[27px] top-7 w-[2px] rounded-full", t.track)} aria-hidden />
          <motion.span
            className={cn("absolute bottom-7 left-[27px] top-7 w-[2px] origin-top rounded-full", t.fill)}
            initial={false}
            animate={{ scaleY: progress }}
            transition={{ duration: 0.7, ease: easeExpo }}
            aria-hidden
          />
          <div className="space-y-2.5">
            {items.map((text, i) => {
              const isActive = i === shown;
              const reached = i <= shown;
              return (
                <RevealItem key={text}>
                  <div
                    onPointerEnter={() => setHovered(i)}
                    onPointerLeave={() => {
                      setHovered(null);
                      setActive(i);
                    }}
                    className={cn(
                      "relative flex items-center gap-4 rounded-2xl border p-3 transition-all duration-500",
                      isActive ? cn(t.active, "translate-x-1.5 shadow-card") : t.idle
                    )}
                  >
                    <span
                      className={cn(
                        "relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 transition-all duration-500",
                        reached ? t.badgeOn : t.badgeOff,
                        isActive && "scale-110"
                      )}
                      aria-hidden
                    >
                      {isActive && !reduced && <span className={cn("absolute inset-0 animate-pulse-ring rounded-full", t.ring)} />}
                      <Check width={14} height={14} className="relative" />
                    </span>
                    <p className={cn("text-[16.5px] font-medium leading-snug", t.text)}>{text}</p>
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

export function ImpactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  usePauseOffscreen(sectionRef);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white py-12 sm:py-14 lg:py-16">
      <span
        className="pointer-events-none absolute -left-40 top-1/4 h-[420px] w-[420px] animate-aurora rounded-full bg-teal-100/60 blur-3xl"
        aria-hidden
      />
      <span
        className="pointer-events-none absolute -right-40 top-1/3 h-[420px] w-[420px] animate-aurora rounded-full bg-accent-100/40 blur-3xl [animation-delay:-9s]"
        aria-hidden
      />
      <Container className="relative max-w-[1480px] lg:!px-6 xl:!px-10">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          <ImpactPanel label="For operations:" items={impact.forOperations} dark photo="control-room" deco="bars" />
          <ImpactPanel label="For workers:" items={impact.forWorkers} photo="factory-assembly" deco="ring" delay={0.1} />
        </div>

        <Reveal className="mt-10 flex justify-center">
          <FillButton href="/request-demo" tone="blue" className="shadow-[0_14px_34px_-12px_rgba(48,46,134,0.8)] ring-2 ring-[#302e86]">
            {DEMO_CTA_LABEL}
          </FillButton>
        </Reveal>
      </Container>
    </section>
  );
}
