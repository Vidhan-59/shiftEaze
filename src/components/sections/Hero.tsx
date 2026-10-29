"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { Container } from "@/components/ui/Container";
import { FillButton } from "@/components/ui/FillButton";
import { Photo } from "@/components/ui/Photo";
import { HeroArtwork } from "@/components/visuals/HeroArtwork";
import { HeroVisual } from "@/components/visuals/HeroVisual";
import { Check } from "@/components/ui/icons";
import { usePauseOffscreen } from "@/hooks/usePauseOffscreen";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cta } from "@/content/site";
import { hero } from "@/content/home";
import { easeExpo } from "@/lib/motion";

/** Counts up to `value` and shows it unformatted, so "6000" stays "6000". */
function CountUp({ value, delay }: { value: number; delay: number }) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const n = useMotionValue(reduced ? value : 0);
  const text = useTransform(n, (v) => String(Math.round(v)));

  useEffect(() => {
    if (!inView || reduced) return;
    const c = animate(n, value, { duration: 1.8, delay, ease: easeExpo });
    return c.stop;
  }, [inView, reduced, n, value, delay]);

  return (
    <span ref={ref} className="inline-grid tabular-nums">
      <span aria-hidden className="invisible col-start-1 row-start-1">
        {value}
      </span>
      <motion.span className="col-start-1 row-start-1 justify-self-start">{text}</motion.span>
    </span>
  );
}

/** Splits "6000+ operators" into its leading number and the rest, when there is one. */
function parseStat(s: string) {
  const m = s.match(/^(\d+)(\+?)(.*)$/);
  return m ? { num: Number(m[1]), plus: m[2], rest: m[3] } : null;
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  // Halts every decorative CSS loop in the hero once it's scrolled past.
  usePauseOffscreen(sectionRef);
  const reduced = usePrefersReducedMotion();

  const headWords = hero.headline.split(" ");
  const lastWord = headWords.pop() as string;

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-teal-400 pb-16 lg:pb-20">
      {/* Container-port photo, tinted navy and faded into the section colour so it blends with the hero */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Photo
          name="terminal-aerial"
          alt=""
          ratio="fill"
          priority
          sizes="100vw"
          className="h-full bg-teal-400"
          imgClassName="object-center"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-transparent" />
      </div>

      <Container className="relative z-10 max-w-[1600px] lg:!px-8 xl:!px-14">
        {/* First screen: copy, artwork and intro all fit one viewport */}
        <div className="flex flex-col justify-center pt-24 lg:h-[100svh] lg:min-h-[560px] lg:pb-4 lg:pt-[72px]">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr] xl:gap-16">
          {/* Copy */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: easeExpo, delay: 0.1 }}
              className="font-mono text-[13px] font-bold uppercase tracking-[0.14em] text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]"
            >
              {hero.h1}
            </motion.h1>

            {/* Headline: each word rises out of a mask, the last one shimmers and gets underlined */}
            <p className="mt-[2.2svh] text-balance font-display drop-shadow-[0_2px_14px_rgba(0,0,0,0.5)] text-[clamp(2rem,min(4.3vw,6.6svh),3.9rem)] font-extrabold leading-[1.02] tracking-tight text-white">
              {headWords.map((w, i) => (
                <span key={i} className="inline-block overflow-hidden py-[0.08em] align-bottom">
                  <motion.span
                    className="inline-block"
                    initial={{ y: "110%", rotate: 4 }}
                    animate={{ y: 0, rotate: 0 }}
                    transition={{ duration: 0.8, ease: easeExpo, delay: 0.25 + i * 0.09 }}
                  >
                    {w}&nbsp;
                  </motion.span>
                </span>
              ))}
              <span className="relative inline-block">
                <span className="inline-block overflow-hidden py-[0.08em] align-bottom">
                  <motion.span
                    className="inline-block animate-shimmer bg-gradient-to-r from-[#ff5468] via-[#4db8ff] to-[#ff5468] bg-[length:200%_auto] bg-clip-text text-transparent"
                    initial={{ y: "110%", rotate: 4 }}
                    animate={{ y: 0, rotate: 0 }}
                    transition={{ duration: 0.8, ease: easeExpo, delay: 0.25 + headWords.length * 0.09 }}
                  >
                    {lastWord}
                  </motion.span>
                </span>
                <svg
                  className="pointer-events-none absolute -bottom-1 left-0 h-[0.28em] w-full"
                  viewBox="0 0 200 12"
                  preserveAspectRatio="none"
                  fill="none"
                  aria-hidden
                >
                  <motion.path
                    d="M2 8 C 40 1, 80 11, 120 5 S 180 3, 198 7"
                    stroke="#ff5468"
                    strokeWidth="4"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.9, ease: easeExpo, delay: 0.25 + headWords.length * 0.09 + 0.5 }}
                  />
                </svg>
              </span>
            </p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: easeExpo, delay: 0.9 }}
              className="mt-[2.2svh] max-w-2xl text-[clamp(15px,2.4svh,17px)] font-semibold leading-relaxed text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.85)]"
            >
              {hero.text}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: easeExpo, delay: 1.0 }}
              className="mt-[2.6svh] flex flex-wrap items-center gap-4"
            >
              <FillButton href={cta.primary.href} tone="blue" className="shadow-[0_14px_34px_-12px_rgba(48,46,134,0.8)] ring-2 ring-white/70">
                {cta.primary.label}
              </FillButton>
            </motion.div>

            {/* Trust strip: numbers count up */}
            <div className="mt-[3svh] grid gap-2.5 border-t border-white/20 pt-[2.6svh] sm:grid-cols-2">
              {hero.trustStrip.map((t, i) => {
                const stat = parseStat(t);
                return (
                  <motion.div
                    key={t}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: easeExpo, delay: 1.1 + i * 0.1 }}
                    whileHover={reduced ? undefined : { y: -4 }}
                    className="flex items-center gap-3.5 rounded-2xl border border-white/25 bg-black/50 px-4 py-2.5 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.6)] backdrop-blur-md transition-colors hover:border-[#4db8ff] hover:bg-black/60"
                  >
                    {stat ? (
                      <span className="font-display text-[30px] font-extrabold leading-none text-white">
                        <CountUp value={stat.num} delay={1.2 + i * 0.1} />
                        {stat.plus}
                      </span>
                    ) : (
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#ff5468] text-white">
                        <Check width={16} height={16} />
                      </span>
                    )}
                    <span className="text-[14px] font-bold leading-snug text-white">
                      {stat ? stat.rest.trim() : t}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Visual: slides in; kept free of 3D transforms so text stays pin-sharp */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: easeExpo, delay: 0.4 }}
          >
            <HeroArtwork />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeExpo, delay: 1.3 }}
          className="mt-[3svh]"
        >
          <p className="rounded-r-2xl border-l-4 border-[#4db8ff] bg-black/60 py-3 pl-5 pr-5 text-[clamp(13px,2.2svh,15px)] font-semibold leading-snug text-white backdrop-blur-md">
            {hero.intro}
          </p>
        </motion.div>
        </div>

        {/* Interactive 3D dashboard with drag to rotate */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: easeExpo, delay: 0.1 }}
          className="mt-20"
        >
          <div className="flex flex-col items-center">
            <div className="mb-10 text-center">
              <div className="inline-flex items-center gap-2.5 rounded-full border border-white/30 bg-black/35 px-4 py-2 shadow-[0_8px_24px_-10px_rgba(0,0,0,0.6)] backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 animate-pulse-ring rounded-full bg-[#ff5468]" />
                  <span className="relative h-2 w-2 rounded-full bg-[#ff5468]" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-widest text-white">
                  Interactive Demo
                </span>
              </div>
              <motion.p
                className="mx-auto mt-4 w-fit rounded-full bg-black/35 px-4 py-1.5 text-[13px] font-semibold uppercase tracking-wider text-white backdrop-blur-md"
                animate={reduced ? undefined : { y: [0, 4, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                Tap any shift to change the roster
              </motion.p>
            </div>
            <HeroVisual />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
