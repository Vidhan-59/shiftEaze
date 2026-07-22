"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, animate as animateValue } from "framer-motion";
import type { PanInfo } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { ArrowLeft, ArrowRight } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

const SPRING = { type: "spring", stiffness: 320, damping: 34 } as const;

/**
 * Generic slide carousel — drag/swipe, arrow nav, dot nav and optional
 * autoplay (paused on hover, disabled under prefers-reduced-motion). Can run
 * fully controlled (pass `active` + `onChange`, e.g. synced to external tabs)
 * or uncontrolled (omit both, it tracks its own index).
 */
export function Carousel({
  slides,
  active,
  onChange,
  autoplay = true,
  interval = 5500,
  className,
  arrows = true,
  dots = true,
  labels,
}: {
  slides: React.ReactNode[];
  active?: number;
  onChange?: (i: number) => void;
  autoplay?: boolean;
  interval?: number;
  className?: string;
  arrows?: boolean;
  dots?: boolean;
  labels?: string[];
}) {
  const reduced = usePrefersReducedMotion();
  const n = slides.length;
  const [internal, setInternal] = useState(0);
  const index = active ?? internal;
  const [paused, setPaused] = useState(false);
  const [width, setWidth] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const goTo = (i: number) => {
    const wrapped = ((i % n) + n) % n;
    if (active === undefined) setInternal(wrapped);
    onChange?.(wrapped);
  };

  // Keep the track's transform in sync with the active index (and re-measure).
  useEffect(() => {
    animateValue(x, -index * width, reduced ? { duration: 0 } : SPRING);
  }, [index, width, reduced, x]);

  useEffect(() => {
    if (!autoplay || reduced || paused || n <= 1) return;
    const t = setInterval(() => goTo(index + 1), interval);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay, reduced, paused, index, interval, n, width]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (!width) return;
    const projected = -index * width + info.offset.x;
    const nearest = Math.min(n - 1, Math.max(0, Math.round(-projected / width)));
    goTo(nearest);
  };

  return (
    <div
      ref={wrapRef}
      className={cn("relative overflow-hidden", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div
        className="flex"
        style={{ x }}
        drag={n > 1 && width > 0 ? "x" : false}
        dragConstraints={{ left: -(n - 1) * width, right: 0 }}
        dragElastic={0.12}
        dragMomentum={false}
        onDragEnd={onDragEnd}
      >
        {slides.map((s, i) => (
          <div key={i} className="shrink-0" style={{ width: width || "100%" }}>
            {s}
          </div>
        ))}
      </motion.div>

      {arrows && n > 1 && (
        <>
          <button
            onClick={() => goTo(index - 1)}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-line bg-white/90 text-fg shadow-card backdrop-blur transition-all duration-200 hover:scale-110 hover:border-teal-400/40 hover:text-teal-400"
          >
            <ArrowLeft width={16} height={16} />
          </button>
          <button
            onClick={() => goTo(index + 1)}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-line bg-white/90 text-fg shadow-card backdrop-blur transition-all duration-200 hover:scale-110 hover:border-teal-400/40 hover:text-teal-400"
          >
            <ArrowRight width={16} height={16} />
          </button>
        </>
      )}

      {dots && n > 1 && (
        <div className="mt-5 flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={labels?.[i] ?? `Go to slide ${i + 1}`}
              aria-current={i === index}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === index
                  ? "w-6 bg-teal-400"
                  : "w-1.5 bg-line-strong hover:bg-teal-400/40"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
