"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { HomeHeroPreview } from "@/components/sections/HomeHeroPreview";
import { HeroVisual } from "@/components/visuals/HeroVisual";
import { ArrowRight } from "@/components/ui/icons";
import { usePauseOffscreen } from "@/hooks/usePauseOffscreen";
import { cta } from "@/content/site";
import { hero } from "@/content/home";
import { easeExpo } from "@/lib/motion";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  // Halts every decorative loop in the hero once it's scrolled past — the
  // headline shimmer especially, which repaints gradient-clipped text each
  // frame and would otherwise run for the whole session.
  usePauseOffscreen(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-teal-400 pb-16 pt-28 sm:pt-32 lg:pb-20"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_85%_0%,rgba(255,255,255,0.12),transparent),radial-gradient(50%_50%_at_0%_100%,rgba(255,255,255,0.06),transparent)]"
        aria-hidden
      />

      <Container className="relative z-10">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
          {/* Copy */}
          <div className="max-w-2xl">
            {/* The page's single H1, shown in the existing small-heading style
                directly above the large hero headline (brief: Home § Hero). */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: easeExpo }}
              className="font-mono text-[13px] font-medium uppercase tracking-[0.14em] text-teal-100"
            >
              {hero.h1}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: easeExpo, delay: 0.08 }}
              className="mt-5 text-balance font-display text-[clamp(2.6rem,5.6vw,4.3rem)] font-extrabold leading-[0.98] tracking-tight text-white"
            >
              {hero.headline}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: easeExpo, delay: 0.14 }}
              className="mt-6 max-w-xl text-[17.5px] leading-relaxed text-teal-50/90"
            >
              {hero.text}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: easeExpo, delay: 0.22 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Button
                href={cta.primary.href}
                size="lg"
                className="bg-white text-teal-400 shadow-none hover:bg-teal-50 hover:text-teal-500"
              >
                {cta.primary.label}
                <ArrowRight width={17} height={17} />
              </Button>
            </motion.div>

            <div className="mt-10 flex flex-wrap gap-2 border-t border-white/15 pt-7">
              {hero.trustStrip.map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-white/15 bg-white/10 px-3 py-1.5 text-[12.5px] text-white/80"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Visual: a "live" preview of the site's own header + hero, in a
              browser-frame (Beew/5U-style, self-referential). */}
          <div className="lg:pl-6">
            <BrowserFrame>
              <HomeHeroPreview />
            </BrowserFrame>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: easeExpo }}
          className="mt-14 max-w-3xl text-[15.5px] leading-relaxed text-teal-50/80"
        >
          {hero.intro}
        </motion.p>

        <div className="mt-10">
          <HeroVisual />
        </div>
      </Container>
    </section>
  );
}
