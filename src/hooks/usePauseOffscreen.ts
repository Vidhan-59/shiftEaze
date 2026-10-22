"use client";

import { useEffect, type RefObject } from "react";

/**
 * Freeze every CSS animation inside `ref` while it is scrolled out of view or
 * the tab is in the background.
 *
 * Decorative loops (`infinite` keyframes) otherwise run for the entire life of
 * the page. Several here are not cheap — the aurora blobs animate `scale` on a
 * 70px-blurred layer, which re-rasterises each frame, and the headline shimmer
 * repaints a gradient-clipped text fill — so leaving them running behind the
 * fold costs real battery and steals frames from scrolling.
 *
 * Drives a data attribute rather than React state on purpose: the pairing CSS
 * rule in globals.css does the work, so toggling costs no re-render.
 */
export function usePauseOffscreen(ref: RefObject<HTMLElement>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let onscreen = true;
    const sync = () => {
      el.dataset.animPaused = !onscreen || document.hidden ? "true" : "false";
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        onscreen = entry.isIntersecting;
        sync();
      },
      { threshold: 0 }
    );
    io.observe(el);
    document.addEventListener("visibilitychange", sync);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [ref]);
}
