import { cn } from "@/lib/utils";

/**
 * Static ship-to-shore gantry crane silhouette — a single quiet nod to the
 * port setting, layered over the roster wall. Plain inline SVG: no
 * animation, no library, negligible weight, safe to render on the server.
 */
export function PortCrane({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 260"
      className={cn("pointer-events-none absolute", className)}
      aria-hidden
      fill="none"
    >
      <g
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M40 258 L70 62 M180 258 L150 62" />
        <path d="M50 205 L170 205 M55 155 L165 155 M60 105 L160 105" />
        <path d="M70 62 L150 62" />
        <path d="M70 62 L212 22 M150 62 L212 22" />
        <path d="M70 62 L8 84" />
        <path d="M172 32 L172 92 M152 92 L192 92" />
      </g>
    </svg>
  );
}
