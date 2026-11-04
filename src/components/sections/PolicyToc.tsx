"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type TocItem = { id: string; label: string };

/**
 * "On this page" list for a long legal page: a collapsible card on phones and
 * a sticky side list from `lg`, with the section being read highlighted.
 */
export function PolicyToc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        const seen = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (seen[0]) setActive(seen[0].target.id);
      },
      { rootMargin: "-96px 0px -60% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  const list = (
    <ol className="space-y-0.5">
      {items.map((it, i) => (
        <li key={it.id}>
          <a
            href={`#${it.id}`}
            aria-current={active === it.id ? "true" : undefined}
            className={cn(
              "flex items-baseline gap-3 rounded-xl px-3 py-2 text-[14.5px] font-semibold leading-snug transition-colors",
              active === it.id ? "bg-[#eaf0ff] text-[#302e86]" : "text-fg-muted hover:bg-[#f4f7ff] hover:text-fg",
            )}
          >
            <span className="w-5 shrink-0 font-mono text-[12px] font-bold text-[#2f6bff]">{String(i + 1).padStart(2, "0")}</span>
            {it.label}
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <>
      <details className="rounded-2xl border border-line-strong bg-white p-2 shadow-card lg:hidden">
        <summary className="cursor-pointer list-none px-3 py-2 font-display text-[16px] font-extrabold text-fg">
          On this page
        </summary>
        <nav aria-label="On this page" className="mt-1">
          {list}
        </nav>
      </details>
      <aside className="hidden lg:block lg:self-stretch">
        <nav aria-label="On this page" className="sticky top-28 rounded-3xl border border-line-strong bg-white p-3 shadow-card">
          <div className="px-3 pb-2 pt-2 font-mono text-[11.5px] font-bold uppercase tracking-[0.16em] text-[#2f6bff]">
            On this page
          </div>
          {list}
        </nav>
      </aside>
    </>
  );
}
