"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const INTERACTIVE_SELECTOR =
  "a, button, input, textarea, select, [role='button'], [data-cursor='link']";

/**
 * A small dot that continuously tracks the pointer — a decorative accent, not
 * a cursor replacement (the native cursor stays, so accessibility/usability
 * are untouched). Disabled on touch devices and under prefers-reduced-motion.
 */
export function CursorDot() {
  const reduced = usePrefersReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 900, damping: 45, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 900, damping: 45, mass: 0.35 });

  useEffect(() => {
    setEnabled(window.matchMedia("(pointer: fine)").matches);
  }, []);

  useEffect(() => {
    if (!enabled || reduced) return;

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
      setHovering(!!(e.target as Element | null)?.closest(INTERACTIVE_SELECTOR));
    };
    const onLeaveWindow = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeaveWindow);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeaveWindow);
    };
  }, [enabled, reduced, visible, x, y]);

  if (!enabled || reduced) return null;

  return (
    <motion.span
      className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full ring-2 ring-white/80"
      style={{
        x: sx,
        y: sy,
        translateX: "-50%",
        translateY: "-50%",
        opacity: visible ? 1 : 0,
        boxShadow: "0 1px 6px rgba(20,24,70,0.35)",
      }}
      animate={{
        width: hovering ? 28 : 14,
        height: hovering ? 28 : 14,
        backgroundColor: hovering ? "#d51f2c" : "#302e86",
      }}
      transition={{ type: "spring", stiffness: 420, damping: 30 }}
      aria-hidden
    />
  );
}
