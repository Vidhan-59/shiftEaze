import { cn } from "@/lib/utils";

/**
 * Static, zero-WebGL fallback for the hero scene. Shown while the 3D chunk
 * loads and permanently for `prefers-reduced-motion` users. On-brand soft
 * navy + maroon glow so its absence isn't noticeable. No three.js imports —
 * safe to render on the server / pull into the dynamic `loading` slot.
 */
export function HeroPoster({ className }: { className?: string }) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0", className)}
      aria-hidden
      style={{
        background:
          "radial-gradient(58% 55% at 70% 30%, rgba(48,46,134,0.16), transparent 70%), radial-gradient(34% 34% at 86% 60%, rgba(213,31,44,0.09), transparent 70%)",
      }}
    />
  );
}
