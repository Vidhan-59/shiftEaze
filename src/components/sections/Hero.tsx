"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { HeroVisual } from "@/components/visuals/HeroVisual";
import { Aurora } from "@/components/visuals/Aurora";
import { ContainerYard } from "@/components/visuals/ContainerYard";
import { PortCrane } from "@/components/visuals/PortCrane";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { ArrowRight } from "@/components/ui/icons";
import { cta, site } from "@/content/site";
import { easeExpo } from "@/lib/motion";

const stat = [
  { value: 6000, suffix: "+", label: "Operators" },
  { value: 12, suffix: "+", label: "Terminals" },
  { value: "Nightly", suffix: "", label: "Ingestion" },
] as const;

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pb-20 pt-28 sm:pt-32 lg:pb-28"
    >
      {/* backdrop */}
      <Aurora variant="mixed" className="opacity-90" />
      <ContainerYard className="opacity-[0.62]" />
      <PortCrane className="right-[3%] top-[-6%] hidden h-[420px] w-[350px] text-teal-500 opacity-[0.16] lg:block" />
      <div className="pointer-events-none absolute inset-0 bg-blueprint" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[600px] bg-hero-glow" aria-hidden />
      {/* contrast scrim so the 3D scene never fights the headline's legibility */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#f5f7fd] via-[#f5f7fd]/85 to-transparent lg:from-[#f5f7fd] lg:via-[#f5f7fd]/70 lg:to-transparent"
        aria-hidden
      />

      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
          {/* Copy */}
          <div className="max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: easeExpo }}
              className="text-balance text-[clamp(2.4rem,5.4vw,4rem)] font-semibold leading-[1.02] tracking-tightest text-fg"
            >
              Know who&apos;ll show up
              <br className="hidden sm:block" />{" "}
              <span className="text-gradient bg-[length:200%_auto] animate-shimmer">
                before the shift starts.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: easeExpo, delay: 0.14 }}
              className="mt-6 max-w-xl text-[17.5px] leading-relaxed text-fg-muted"
            >
              {site.name} auto-builds rosters across every terminal, predicts
              no-shows before they cost you a berth, and turns workforce data
              into decisions. {site.module} makes the calls for you.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: easeExpo, delay: 0.22 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Button href={cta.primary.href} size="lg">
                {cta.primary.label}
                <ArrowRight width={17} height={17} />
              </Button>
              <Button href={cta.secondary.href} variant="secondary" size="lg">
                {cta.secondary.label}
              </Button>
            </motion.div>

            <motion.dl
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: easeExpo, delay: 0.34 }}
              className="mt-10 flex flex-wrap gap-x-9 gap-y-4 border-t border-line pt-7"
            >
              {stat.map((s) => (
                <div key={s.label}>
                  <dt className="flex items-baseline text-2xl font-semibold tracking-tight text-fg">
                    <AnimatedCounter
                      value={s.value}
                      className="tabular-nums"
                      delay={0.9}
                      duration={2}
                    />
                    <span className="text-teal-400">{s.suffix}</span>
                  </dt>
                  <dd className="mt-0.5 font-mono text-[10.5px] uppercase tracking-wider text-fg-faint">
                    {s.label}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* Visual */}
          <div className="relative lg:pl-6">
            <HeroVisual />
          </div>
        </div>
      </Container>
    </section>
  );
}
