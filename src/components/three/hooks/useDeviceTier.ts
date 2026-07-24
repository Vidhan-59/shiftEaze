"use client";

import { useState } from "react";

export type DeviceTier = "low" | "high";

/**
 * One-shot device capability check. Because the 3D layer is always mounted via
 * `next/dynamic({ ssr:false })`, `window` exists at first render, so the lazy
 * initializer resolves synchronously with no hydration flash or grid rebuild.
 */
export function useDeviceTier(): DeviceTier {
  const [tier] = useState<DeviceTier>(() => {
    if (typeof window === "undefined") return "high";
    const coarse = window.matchMedia?.("(pointer: coarse)").matches ?? false;
    const narrow = window.innerWidth < 768;
    const fewCores = (navigator.hardwareConcurrency ?? 8) <= 4;
    return coarse || narrow || fewCores ? "low" : "high";
  });
  return tier;
}
