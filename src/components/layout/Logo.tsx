import Image from "next/image";
import { cn } from "@/lib/utils";

// Native asset ratio (573×165 ≈ 3.47:1) — fixed intrinsic size prevents CLS.
const RATIO = 573 / 165;
const HEIGHT = 28;
const SVG = { w: 573, h: 165 };
const SRC = "/assets/brand/shifteaze-logo.svg";
// Same artwork for navy surfaces: red "Shift", navy shapes lifted to a visible blue, no white fills.
const DARK_SRC = "/assets/brand/shifteaze-logo-ondark.svg";

/**
 * ShiftEaze wordmark. Use `variant="white"` on dark surfaces; `variant="color"`
 * (default) is the two-tone mark for light surfaces — which is everywhere on
 * this site today, but the white asset ships for future dark sections/decks.
 */
export function Logo({
  className,
  variant = "color",
  height = HEIGHT,
  priority = false,
}: {
  className?: string;
  variant?: "color" | "white";
  height?: number;
  priority?: boolean;
}) {
  return (
    <Image
      src={
        variant === "white"
          ? "/assets/brand/shifteaze-logo-white.svg"
          : "/assets/brand/shifteaze-logo.svg"
      }
      alt="ShiftEaze"
      width={Math.round(height * RATIO)}
      height={height}
      priority={priority}
      className={cn("h-auto shrink-0", className)}
      style={{ height, width: "auto" }}
    />
  );
}

/** Shows one rectangle (in SVG units) of the official logo file, scaled to fill its box. */
function Crop({
  x,
  y,
  w,
  h,
  src = SRC,
  className,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  src?: string;
  className?: string;
}) {
  return (
    <span
      className={cn("relative block shrink-0 overflow-hidden", className)}
      style={{ aspectRatio: `${w} / ${h}` }}
      aria-hidden
    >
      {/* Plain <img>: cropping needs the raw file, and the optimizer would only soften it. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        draggable={false}
        className="absolute max-w-none select-none"
        style={{
          width: `${(SVG.w / w) * 100}%`,
          left: `${-(x / w) * 100}%`,
          top: `${-(y / h) * 100}%`,
        }}
      />
    </span>
  );
}

/** Just the calendar-and-workers icon from the official logo. Size it with an `h-*` class. */
export function LogoIcon({ className, onDark = false }: { className?: string; onDark?: boolean }) {
  return <Crop x={4} y={10} w={204} h={140} src={onDark ? DARK_SRC : SRC} className={className} />;
}

/**
 * Just the "ShiftEaze" lettering from the official logo (same font and colours). Size it with an `h-*` or `w-*` class.
 * Uses a copy of the logo with its near-white fills removed (the filled-in white centres of the "a" and "e"),
 * so the letters stay see-through there on any background.
 */
export function LogoWordmark({ className, onDark = false }: { className?: string; onDark?: boolean }) {
  return (
    <Crop
      x={205}
      y={52}
      w={359}
      h={74}
      src={onDark ? DARK_SRC : "/assets/brand/shifteaze-wordmark-clean.svg"}
      className={className}
    />
  );
}

/** The full logo image with its background removed (transparent PNG), in its original colours. Size with an `h-*` class. */
export function LogoFull({ className }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/assets/brand/shifteaze-logo-transparent.png"
      alt="ShiftEaze"
      width={1611}
      height={388}
      draggable={false}
      className={cn("block w-auto max-w-none select-none", className)}
    />
  );
}

/** "ShiftEaze" lettering for navy surfaces: transparent counters, red "Shift", lifted-blue "Eaze". Size with a `w-*` class. */
export function LogoWordmarkOnDark({ className }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/assets/brand/shifteaze-wordmark-actual.png"
      alt=""
      aria-hidden
      width={1034}
      height={203}
      draggable={false}
      className={cn("block h-auto max-w-none select-none", className)}
    />
  );
}
