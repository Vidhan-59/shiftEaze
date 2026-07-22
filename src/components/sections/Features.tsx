"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { SmartShot } from "@/components/ui/SmartShot";
import { FloatCard } from "@/components/ui/FloatCard";
import { Check } from "@/components/ui/icons";
import { pillars, type Pillar } from "@/content/sections";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";
import {
  RosterAccent,
  PredictionAccent,
  AnalyticsAccent,
} from "@/components/visuals/FeatureAccents";

const KIND_MAP = {
  "auto-rostering": "roster",
  "attendance-prediction": "shift",
  "workforce-analytics": "manpower",
} as const;

const BADGE_COPY: Record<
  Pillar["visual"],
  { label: string; value: string; tone: "teal" | "risk" }
> = {
  roster: { label: "Resolved this cycle", value: "128/128", tone: "teal" },
  prediction: { label: "Risk flagged early", value: "91%", tone: "risk" },
  analytics: { label: "Terminals live", value: "12+", tone: "teal" },
};

function Accent({ kind }: { kind: Pillar["visual"] }) {
  if (kind === "roster") return <RosterAccent />;
  if (kind === "prediction") return <PredictionAccent />;
  return <AnalyticsAccent />;
}

function ParallaxVisual({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [26, -26]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

function FeatureBlock({ pillar, flip }: { pillar: Pillar; flip: boolean }) {
  const badge = BADGE_COPY[pillar.visual];
  return (
    <div
      id={pillar.id}
      className="grid scroll-mt-24 items-center gap-10 lg:grid-cols-2 lg:gap-16"
    >
      {/* Copy */}
      <Reveal className={cn(flip && "lg:order-2")}>
        <div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm text-teal-400/60">
              {pillar.index}
            </span>
            <span className="eyebrow">
              <span className="h-px w-6 bg-teal-400/70" aria-hidden />
              {pillar.eyebrow}
            </span>
          </div>
          <h3 className="mt-4 text-[clamp(1.6rem,3vw,2.25rem)] font-semibold leading-[1.08] tracking-tighter text-fg">
            {pillar.title}
          </h3>
          <p className="mt-4 text-[16.5px] leading-relaxed text-fg-muted">
            {pillar.lead}
          </p>

          <ul className="mt-6 space-y-3">
            {pillar.points.map((pt) => (
              <li key={pt} className="flex gap-3">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-teal-400/15 text-teal-300">
                  <Check width={12} height={12} />
                </span>
                <span className="text-[15px] leading-snug text-fg-muted">
                  {pt}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-7 rounded-xl border border-line bg-ink-800/40 p-5">
            <div className="font-mono text-[10.5px] uppercase tracking-wider text-teal-300">
              {pillar.differentiator.label}
            </div>
            <p className="mt-2 text-[14.5px] leading-relaxed text-fg-muted">
              {pillar.differentiator.text}
            </p>
          </div>
        </div>
      </Reveal>

      {/* Visual */}
      <Reveal delay={0.1} className={cn(flip && "lg:order-1")}>
        <ParallaxVisual className="group relative transition-transform duration-500 hover:-translate-y-1">
          <BrowserFrame url={`app.shifteaze.com/${pillar.id}`}>
            <SmartShot
              src={pillar.screenshot.src}
              alt={pillar.screenshot.alt}
              kind={KIND_MAP[pillar.id as keyof typeof KIND_MAP]}
            />
          </BrowserFrame>
          <p className="mt-3 px-1 text-[13px] text-fg-faint">
            {pillar.screenshot.caption}
          </p>

          {/* Supporting interactive accent */}
          <div className="glass mt-4 rounded-xl p-5">
            <Accent kind={pillar.visual} />
          </div>

          {/* Floating proof badge — scroll-triggered, matches the Hero's floating cards */}
          <FloatCard
            delay={0.15}
            from={flip ? "left" : "right"}
            className={cn(
              "absolute top-4 z-10 w-[9.5rem]",
              flip ? "-left-4 sm:-left-6" : "-right-4 sm:-right-6"
            )}
          >
            <div
              className={cn(
                "text-xl font-semibold tabular-nums",
                badge.tone === "risk" ? "text-risk-high" : "text-teal-400"
              )}
            >
              {badge.value}
            </div>
            <div className="mt-0.5 font-mono text-[9.5px] uppercase tracking-wider text-fg-faint">
              {badge.label}
            </div>
          </FloatCard>
        </ParallaxVisual>
      </Reveal>
    </div>
  );
}

export function Features() {
  return (
    <section id="platform" className="scroll-mt-20 py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="The platform"
          title={
            <>
              Three integrated pillars,{" "}
              <span className="text-fg-muted">one source of truth.</span>
            </>
          }
          lead="Rostering, prediction and analytics read from the same live workforce stream — so what you plan, what you predict and what you measure never drift apart."
        />

        <div className="mt-20 space-y-24 lg:space-y-32">
          {pillars.map((p, i) => (
            <FeatureBlock key={p.id} pillar={p} flip={i % 2 === 1} />
          ))}
        </div>
      </Container>
    </section>
  );
}
