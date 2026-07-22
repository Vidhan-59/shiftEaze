"use client";

import { useEffect, useState } from "react";

/**
 * SSR-safe reduced-motion hook. Defaults to `true` on the server so decorative
 * animations never flash before the client resolves the real preference.
 */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}
