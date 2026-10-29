import Link from "next/link";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

/**
 * Platform-style section heading: the last word carries the animated
 * red-to-blue gradient, followed by a short accent bar and an optional lead.
 * `tone="dark"` is for the navy bands.
 */
export function SectionTitle({
  title,
  lead,
  href,
  align = "center",
  tone = "light",
  accent = "red",
  className,
}: {
  title: string;
  lead?: string;
  align?: "center" | "left";
  tone?: "light" | "dark";
  /** Accent colour on the dark tone. */
  accent?: "red" | "blue";
  /** Makes the heading a link. */
  href?: string;
  className?: string;
}) {
  const words = title.split(" ");
  const last = words.pop();
  const dark = tone === "dark";
  const blue = accent === "blue";
  return (
    <div className={cn("max-w-3xl", align === "center" ? "mx-auto text-center" : "text-left", className)}>
      <Reveal>
        <h2
          className={cn(
            "text-balance font-display text-[clamp(2rem,4.2vw,3.4rem)] font-extrabold leading-[1.06] tracking-tight",
            dark ? "text-white" : "text-fg"
          )}
        >
          {href ? (
            <Link href={href} className="block">
            {words.join(" ")}{" "}
            <span
              className={cn(
                "inline-block animate-shimmer bg-gradient-to-r bg-[length:200%_auto] bg-clip-text text-transparent",
                dark
                  ? blue
                    ? "from-[#4db8ff] via-[#a6d8ff] to-[#4db8ff]"
                    : "from-[#ff5468] via-[#4db8ff] to-[#ff5468]"
                  : "from-[#e0263a] via-[#2f6bff] to-[#e0263a]"
              )}
            >
              {last}
            </span>
            </Link>
          ) : (
            <>
            {words.join(" ")}{" "}
            <span
              className={cn(
                "inline-block animate-shimmer bg-gradient-to-r bg-[length:200%_auto] bg-clip-text text-transparent",
                dark
                  ? blue
                    ? "from-[#4db8ff] via-[#a6d8ff] to-[#4db8ff]"
                    : "from-[#ff5468] via-[#4db8ff] to-[#ff5468]"
                  : "from-[#e0263a] via-[#2f6bff] to-[#e0263a]"
              )}
            >
              {last}
            </span>
            </>
          )}
        </h2>
        <span
          className={cn(
            "mt-6 block h-[6px] w-28 rounded-full",
            align === "center" && "mx-auto",
            dark
              ? blue
                ? "bg-gradient-to-r from-white via-[#2f6bff] to-transparent"
                : "bg-gradient-to-r from-white via-[#ff3b4e] to-transparent"
              : "bg-gradient-to-r from-teal-400 via-teal-300 to-accent-500"
          )}
          aria-hidden
        />
      </Reveal>
      {lead && (
        <Reveal delay={0.1}>
          <p
            className={cn(
              "mt-6 text-[18px] leading-relaxed",
              align === "center" && "mx-auto max-w-2xl",
              dark ? "text-teal-100" : "text-fg-muted"
            )}
          >
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  );
}
