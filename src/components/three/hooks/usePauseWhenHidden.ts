"use client";

import { RefObject, useEffect, useState } from "react";

/**
 * Returns `true` when the referenced element is scrolled offscreen OR the tab
 * is backgrounded — used to flip R3F's `frameloop` to "never" so no frames
 * (and no per-instance work) run when nobody's looking. These transitions are
 * rare, so driving them through React state is fine.
 */
export function usePauseWhenHidden(ref: RefObject<HTMLElement>): boolean {
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let onscreen = true;
    let hidden = typeof document !== "undefined" && document.hidden;
    const sync = () => setPaused(!onscreen || hidden);

    const io = new IntersectionObserver(
      ([entry]) => {
        onscreen = entry.isIntersecting;
        sync();
      },
      { threshold: 0.05 }
    );
    io.observe(el);

    const onVisibility = () => {
      hidden = document.hidden;
      sync();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [ref]);

  return paused;
}
