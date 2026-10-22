import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "center",
  className,
  as = "h2",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
  /**
   * Defaults to h2 (every call site but Pricing uses this as a section
   * heading below the page's real H1). Pricing has no H1 of its own
   * anywhere on the page — this lets it pass "h1" without duplicating the
   * heading markup or touching any of its content.
   */
  as?: "h1" | "h2";
}) {
  const Heading = as;
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <Reveal>
          <span
            className={cn(
              "eyebrow",
              align === "center" && "justify-center"
            )}
          >
            <span className="h-px w-6 bg-teal-400/70" aria-hidden />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <Heading className="mt-4 text-balance text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.05] tracking-tighter text-fg">
          {title}
        </Heading>
      </Reveal>
      {lead && (
        <Reveal delay={0.1}>
          <p
            className={cn(
              "mt-5 text-[17px] leading-relaxed text-fg-muted",
              align === "center" && "mx-auto"
            )}
          >
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  );
}
