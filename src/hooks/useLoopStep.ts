"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * A looping step counter 0..n-1 that advances every `ms` while `running`.
 * Under reduced motion it rests on step `rest` (default 0) and never advances.
 * Returns [step, setStep] so hover / focus can take over.
 */
export function useLoopStep(n: number, ms: number, running = true, rest = 0) {
  const reduced = usePrefersReducedMotion();
  const [step, setStep] = useState(rest);

  useEffect(() => {
    if (reduced || !running) return;
    const id = setInterval(() => setStep((s) => (s + 1) % n), ms);
    return () => clearInterval(id);
  }, [reduced, running, n, ms]);

  return [reduced ? rest : step, setStep] as const;
}
