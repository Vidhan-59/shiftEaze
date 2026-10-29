"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Sticky chip bar under a page hero. Highlights the section currently in view
 * and scrolls to a section on click (the target carries its own scroll-margin).
 */
export function JumpNav({ items, label }: { items: { id: string; name: string }[]; label: string }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label={label} className="sticky top-[58px] z-30 border-b border-line bg-white/85 backdrop-blur-lg">
      <div className="container-page">
        <ul data-lenis-prevent-horizontal className="no-scrollbar flex gap-2 overflow-x-auto py-3">
          {items.map((i) => (
            <li key={i.id} className="shrink-0">
              <a
                href={`#${i.id}`}
                className={cn(
                  "block rounded-full border px-3.5 py-1.5 text-[13px] font-semibold transition-all duration-300",
                  active === i.id
                    ? "border-[#2f6bff] bg-[#2f6bff] text-white shadow-[0_8px_20px_-8px_rgba(47,107,255,0.8)]"
                    : "border-line-strong bg-white text-fg-muted hover:border-[#2f6bff]/50 hover:text-fg",
                )}
              >
                {i.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
