import Link from "next/link";
import { ArrowRight } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

/** Page-link cards, names only (no extra copy) — used by every teaser/overview. */
export function CardGrid({
  items,
  className,
}: {
  items: { label: string; href: string }[];
  className?: string;
}) {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {items.map((it) => (
        <Link
          key={it.href}
          href={it.href}
          className="group flex items-center justify-between gap-3 rounded-xl border border-line bg-white/70 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-teal-400/30 hover:shadow-card-hover"
        >
          <span className="text-[14.5px] font-medium leading-snug text-fg">{it.label}</span>
          <ArrowRight
            width={16}
            height={16}
            className="shrink-0 text-fg-faint transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-teal-400"
          />
        </Link>
      ))}
    </div>
  );
}
