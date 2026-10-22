"use client";

import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { usePauseOffscreen } from "@/hooks/usePauseOffscreen";
import { trustLogos } from "@/content/sections";

/** Trust strip. Replace the placeholder wordmarks with real client logos when cleared. */
export function TrustBar() {
  const row = [...trustLogos, ...trustLogos];
  const marqueeRef = useRef<HTMLDivElement>(null);
  // A 32s infinite marquee has no reason to keep running off-screen.
  usePauseOffscreen(marqueeRef);

  return (
    <section className="border-y border-line bg-ink-800/30 py-10">
      <Container>
        <p className="text-center font-mono text-[11px] uppercase tracking-[0.18em] text-fg-faint">
          Built for terminal operations at scale
        </p>
      </Container>
      <div ref={marqueeRef} className="mask-fade-x mt-7 overflow-hidden">
        {/*
          Spacing lives on the items (`mr-4`), not as a flex `gap`. With a gap
          the track measured 12·item + 11·gap while the animation translates
          -50% — half of that is 6·item + 5.5·gap, so the loop landed half a
          gap out and the strip visibly jumped 8px once every 32s. Baking the
          gap into each item makes the halves exactly equal.
        */}
        <div className="flex w-max animate-marquee items-center">
          {row.map((name, i) => (
            <span
              key={`${name}-${i}`}
              /* Second pass is the seamless-loop duplicate — hide it from AT
                 so the wordmarks aren't announced twice. */
              aria-hidden={i >= trustLogos.length}
              className="mr-4 inline-flex items-center gap-2.5 whitespace-nowrap rounded-full border border-line bg-white px-5 py-2.5 text-[14px] font-medium text-fg-muted shadow-[0_1px_2px_rgba(20,24,70,0.04)]"
              /* Placeholder logo slot — swap for an <Image> of the real mark */
            >
              <span className="h-2 w-2 rounded-sm bg-teal-400/50" aria-hidden />
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
