"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

type From = "bottom" | "top" | "left" | "right";

const OFFSETS: Record<From, { x?: number; y?: number }> = {
  bottom: { y: 22 },
  top: { y: -22 },
  left: { x: -22 },
  right: { x: 22 },
};

/**
 * A small glass callout that flies in (from a given direction) the moment it
 * scrolls into view, then idles with a gentle drift — the same visual
 * language as the Hero's floating cards, reused further down the page so the
 * "in motion" feeling isn't limited to the first screen.
 */
export function FloatCard({
  children,
  className,
  delay = 0,
  from = "bottom",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  from?: From;
}) {
  const reduced = usePrefersReducedMotion();
  const offset = OFFSETS[from];

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "glass rounded-xl p-3.5 shadow-float",
        !reduced && "animate-drift",
        className
      )}
      style={!reduced ? { animationDelay: `${delay}s` } : undefined}
    >
      {children}
    </motion.div>
  );
}
