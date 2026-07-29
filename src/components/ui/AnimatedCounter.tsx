"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  useInView,
  useMotionValue,
  useTransform,
  motion,
} from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { formatNumber } from "@/lib/utils";



/**
 * Counts up to `value` when scrolled into view. If `value` is a string
 * (e.g. a "[FILL IN]" placeholder), it renders verbatim with no animation.
 * `delay` (seconds) defers the start — useful when the counter sits inside a
 * fade-in so the count is still visibly running once it's actually on screen.
 */
export function AnimatedCounter({
  value,
  className,
  delay = 0,
  duration = 1.8,
}: {
  value: number | string;
  className?: string;
  delay?: number;
  duration?: number;
}) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => formatNumber(Math.round(v)));

  useEffect(() => {
    if (typeof value !== "number") return;
    if (!inView) return;
    if (reduced) {
      count.set(value);
      return;
    }
    const controls = animate(count, value, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
    });
    return controls.stop;
  }, [inView, value, reduced, count, delay, duration]);

  if (typeof value === "string") {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }

  /*
   * Counting 0 → 6,000 grows the string from one character to five. Even with
   * `tabular-nums` the element widens as it runs, which can re-wrap a flex row
   * of stats and shift the section's height mid-count. So the final value is
   * also rendered, invisible and un-removed from layout, to hold the full
   * width from the very first frame; the live value is overlaid on top.
   */
  return (
    <span ref={ref} className={className} style={{ display: "inline-grid" }}>
      <span aria-hidden className="invisible col-start-1 row-start-1">
        {formatNumber(value)}
      </span>
      <motion.span className="col-start-1 row-start-1 justify-self-start">
        {rounded}
      </motion.span>
    </span>
  );
}
