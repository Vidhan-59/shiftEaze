"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { SmartShot } from "@/components/ui/SmartShot";
import { Carousel } from "@/components/ui/Carousel";
import { FloatCard } from "@/components/ui/FloatCard";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { dashboards } from "@/content/sections";
import { cn } from "@/lib/utils";

const KIND = {
  manpower: "manpower",
  shift: "shift",
  attendance: "attendance",
  leave: "leave",
} as const;

export function DashboardShowcase() {
  const [active, setActive] = useState(0);
  const current = dashboards[active];

  return (
    <section id="dashboards" className="scroll-mt-20 py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Live dashboards"
          title={
            <>
              The whole operation,{" "}
              <span className="text-fg-muted">on one screen.</span>
            </>
          }
          lead="Every dashboard reads from the same live stream powering the predictions — manpower, shift attendance, trends and leave, per terminal, in real time."
        />

        {/* Tabs */}
        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {dashboards.map((d, i) => (
            <button
              key={d.id}
              onClick={() => setActive(i)}
              aria-pressed={i === active}
              className={cn(
                "rounded-full border px-4 py-2 text-[13.5px] font-medium transition-all duration-300",
                i === active
                  ? "border-teal-500/40 bg-teal-500/12 text-teal-300 shadow-[0_2px_10px_-4px_rgba(48,46,134,0.4)]"
                  : "border-line bg-white text-fg-muted hover:border-line-strong hover:text-fg"
              )}
            >
              {d.tab}
            </button>
          ))}
        </div>

        {/* Frame */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto mt-8 max-w-5xl"
        >
          <div
            className="pointer-events-none absolute -inset-x-10 -top-10 bottom-10 -z-10 bg-hero-glow opacity-60"
            aria-hidden
          />
          <BrowserFrame url={`app.shifteaze.com/dashboards/${current.id}`}>
            <Carousel
              active={active}
              onChange={setActive}
              autoplay
              interval={5500}
              arrows
              dots={false}
              labels={dashboards.map((d) => d.tab)}
              slides={dashboards.map((d, i) => (
                <SmartShot
                  key={d.id}
                  src={d.src}
                  alt={d.alt}
                  kind={KIND[d.id as keyof typeof KIND]}
                  priority={i === 0}
                />
              ))}
            />

            {/* live status chip overlay */}
            <div className="pointer-events-none absolute right-4 top-4 z-10 hidden items-center gap-1.5 rounded-full border border-line bg-white/85 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-teal-300 shadow-sm backdrop-blur sm:flex">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-teal-400/70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-teal-300" />
              </span>
              streaming
            </div>
          </BrowserFrame>

          {/* Floating live-stat callout — scroll-triggered, matches the Hero's floating cards */}
          <FloatCard
            delay={0.2}
            from="bottom"
            className="absolute -bottom-6 -left-4 z-10 w-44 sm:-left-8"
          >
            <div className="flex items-baseline gap-1 text-xl font-semibold tabular-nums text-fg">
              <AnimatedCounter value={6000} duration={1.6} />
              <span className="text-teal-400">+</span>
            </div>
            <div className="mt-0.5 font-mono text-[9.5px] uppercase tracking-wider text-fg-faint">
              Operators tracked live
            </div>
          </FloatCard>

          {/*
            All captions are stacked in one grid cell so this paragraph is
            always as tall as the longest of them. Rendering only the active
            caption meant its height tracked whichever blurb was showing, and
            the carousel swaps every 5.5s forever — so each rotation that
            crossed a line-wrap boundary shunted every section below this one
            (Metrics, Pricing, FAQ, CTA, footer) down and back up again.
          */}
          <div className="mx-auto mt-5 grid max-w-2xl">
            {dashboards.map((d) => (
              <p
                key={d.id}
                className="col-start-1 row-start-1 text-center text-[15px] leading-relaxed text-fg-muted transition-opacity duration-300"
                style={{ opacity: d.id === current.id ? 1 : 0 }}
                aria-hidden={d.id !== current.id}
              >
                <span className="font-medium text-fg">{d.title}.</span>{" "}
                {d.blurb}
              </p>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
