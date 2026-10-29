"use client";

import { useEffect, useRef, useState } from "react";
import { usePauseOffscreen } from "@/hooks/usePauseOffscreen";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const GAP = 14;

/**
 * Endless strip of cards gliding to the right at a constant speed (px per second),
 * independent of card size. Children render three times so the loop never shows a seam;
 * the repeats are hidden from assistive tech and keyboard focus.
 */
export function MarqueeTrack({
  children,
  speed = 70,
  label,
}: {
  children: React.ReactNode;
  /** Pixels per second. */
  speed?: number;
  label?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLDivElement>(null);
  const dupA = useRef<HTMLDivElement>(null);
  const dupB = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const [setW, setSetW] = useState(0);
  usePauseOffscreen(rootRef);

  useEffect(() => {
    const el = setRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setSetW(el.offsetWidth));
    ro.observe(el);
    setSetW(el.offsetWidth);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    dupA.current?.setAttribute("inert", "");
    dupB.current?.setAttribute("inert", "");
  }, []);

  const animated = !reduced && setW > 0;

  return (
    <div
      ref={rootRef}
      className="motion-always overflow-hidden py-6"
      aria-label={label}
    >
      <div
        className="flex w-max hover:[animation-play-state:paused]"
        style={
          {
            "--set": `${setW}px`,
            animation: animated ? `marquee-right ${setW / speed}s linear infinite` : undefined,
          } as React.CSSProperties
        }
      >
        <div ref={setRef} className="flex shrink-0" style={{ gap: GAP, paddingRight: GAP }}>
          {children}
        </div>
        <div ref={dupA} aria-hidden className="flex shrink-0" style={{ gap: GAP, paddingRight: GAP }}>
          {children}
        </div>
        <div ref={dupB} aria-hidden className="flex shrink-0" style={{ gap: GAP, paddingRight: GAP }}>
          {children}
        </div>
      </div>
    </div>
  );
}
