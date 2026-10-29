import Link from "next/link";
import { ArrowRight } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

const TONES = {
  // White pill with a navy arrow block (no red), for the primary action on navy.
  solid: {
    shell: "bg-white",
    fill: "bg-[#302e86]",
    arrow: "text-white",
    label: "text-teal-500",
    labelHover: "text-white",
  },
  // Brand navy pill (the ShiftEaze logo blue) with a white arrow block, for light surfaces.
  brand: {
    shell: "bg-[#302e86]",
    fill: "bg-white",
    arrow: "text-[#302e86]",
    label: "text-white",
    labelHover: "text-[#302e86]",
  },
  // White pill with a navy arrow block, for use on blue surfaces (no red).
  navy: {
    shell: "bg-white",
    fill: "bg-[#302e86]",
    arrow: "text-white",
    label: "text-[#302e86]",
    labelHover: "text-white",
  },
  // Brand navy pill (ShiftEaze logo blue) with a white arrow block: the default primary action.
  blue: {
    shell: "bg-[#302e86]",
    fill: "bg-white",
    arrow: "text-[#302e86]",
    label: "text-white",
    labelHover: "text-[#302e86]",
  },
  // Outlined pill with a white arrow block.
  outline: {
    shell: "shadow-[inset_0_0_0_1.5px_rgba(255,255,255,0.6)]",
    fill: "bg-white",
    arrow: "text-teal-500",
    label: "text-white",
    labelHover: "text-teal-500",
  },
} as const;

/**
 * Pill button with an arrow block on the left. On hover the block grows across the
 * whole pill while the label rolls up and swaps to its inverted-colour copy.
 */
export function FillButton({
  href,
  children,
  tone = "solid",
  className,
}: {
  href: string;
  children: string;
  tone?: keyof typeof TONES;
  className?: string;
}) {
  const t = TONES[tone];
  return (
    <Link
      href={href}
      className={cn(
        "group relative inline-flex h-[56px] items-center rounded-full p-[5px] pr-7 text-[15.5px] font-semibold tracking-tight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white",
        t.shell,
        className
      )}
    >
      <span
        className={cn(
          "absolute inset-y-[5px] left-[5px] w-[46px] rounded-full transition-[width] duration-500 ease-[cubic-bezier(0.7,0,0.2,1)] group-hover:w-[calc(100%-10px)]",
          t.fill
        )}
        aria-hidden
      />
      <span className={cn("relative z-10 grid h-[46px] w-[46px] shrink-0 place-items-center", t.arrow)} aria-hidden>
        <ArrowRight width={17} height={17} />
      </span>
      <span className="relative z-10 block h-[1.5em] overflow-hidden pl-4 leading-[1.5em]">
        <span className="block transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.2,1)] group-hover:-translate-y-[1.5em]">
          <span className={cn("block", t.label)}>{children}</span>
          <span className={cn("block", t.labelHover)} aria-hidden>
            {children}
          </span>
        </span>
      </span>
    </Link>
  );
}
