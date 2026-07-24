import Image from "next/image";
import { cn } from "@/lib/utils";

// Native asset ratio (573×165 ≈ 3.47:1) — fixed intrinsic size prevents CLS.
const RATIO = 573 / 165;
const HEIGHT = 28;

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
