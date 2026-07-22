import { cn } from "@/lib/utils";

/**
 * Ambient, softly-drifting color field for the light theme. Pure CSS so it can
 * render in a server component and it freezes automatically under
 * prefers-reduced-motion (the global media query halts the keyframes).
 */
export function Aurora({
  className,
  variant = "brand",
}: {
  className?: string;
  variant?: "brand" | "accent" | "mixed";
}) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden
    >
      <div
        className="aurora-blob animate-aurora h-[46vw] w-[46vw] max-h-[560px] max-w-[560px]"
        style={{
          top: "-14%",
          left: "-6%",
          background:
            variant === "accent"
              ? "radial-gradient(circle, rgba(213,31,44,0.22), transparent 68%)"
              : "radial-gradient(circle, rgba(48,46,134,0.26), transparent 68%)",
          animationDelay: "-2s",
        }}
      />
      <div
        className="aurora-blob animate-aurora h-[42vw] w-[42vw] max-h-[520px] max-w-[520px]"
        style={{
          top: "-8%",
          right: "-8%",
          background:
            variant === "brand"
              ? "radial-gradient(circle, rgba(75,73,171,0.22), transparent 68%)"
              : "radial-gradient(circle, rgba(213,31,44,0.20), transparent 68%)",
          animationDelay: "-9s",
        }}
      />
      <div
        className="aurora-blob animate-aurora h-[36vw] w-[36vw] max-h-[440px] max-w-[440px]"
        style={{
          bottom: "-18%",
          left: "36%",
          background: "radial-gradient(circle, rgba(48,46,134,0.16), transparent 70%)",
          animationDelay: "-14s",
        }}
      />
    </div>
  );
}
