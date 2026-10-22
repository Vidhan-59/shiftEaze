import { cn } from "@/lib/utils";

export type BulletItem = { lead?: string; text: string };

/**
 * Renders a plain bulleted list of brief copy. `lead` is the bold label a
 * bullet starts with in the source PDF (e.g. "Manual rostering:") — omit it
 * for bullets that are just a sentence (e.g. Resources' article titles).
 */
export function BulletList({
  items,
  className,
}: {
  items: (BulletItem | string)[];
  className?: string;
}) {
  return (
    <ul className={cn("space-y-2.5", className)}>
      {items.map((raw, i) => {
        const item: BulletItem = typeof raw === "string" ? { text: raw } : raw;
        return (
          <li key={i} className="flex gap-2.5 text-[14.5px] leading-relaxed text-fg-muted">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-400/60" aria-hidden />
            <span>
              {item.lead && <strong className="font-semibold text-fg">{item.lead} </strong>}
              {item.text}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
