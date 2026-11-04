import { Fragment } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PolicyToc } from "@/components/sections/PolicyToc";
import type { PolicyBlock, PolicySection } from "@/content/privacyPolicy";

const LINK = /\[([^\]]+)\]\(([^)]+)\)/g;
const linkClass = "font-semibold text-[#2f6bff] underline decoration-[#2f6bff]/30 underline-offset-4 transition-colors hover:text-[#302e86] hover:decoration-[#302e86]";

/** Plain text with [label](href) links; internal hrefs use next/link. */
function Rich({ text }: { text: string }) {
  const out: React.ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(LINK)) {
    const [whole, label, href] = m;
    out.push(text.slice(last, m.index));
    out.push(
      href.startsWith("/") ? (
        <Link key={m.index} href={href} className={linkClass}>
          {label}
        </Link>
      ) : (
        <a key={m.index} href={href} className={linkClass}>
          {label}
        </a>
      ),
    );
    last = (m.index ?? 0) + whole.length;
  }
  out.push(text.slice(last));
  return (
    <>
      {out.map((n, i) => (
        <Fragment key={i}>{n}</Fragment>
      ))}
    </>
  );
}

function Block({ block }: { block: PolicyBlock }) {
  switch (block.type) {
    case "p":
      return (
        <p className="text-[16px] leading-relaxed text-fg-muted">
          <Rich text={block.text} />
        </p>
      );
    case "h":
      return <h3 className="pt-2 font-display text-[18px] font-extrabold leading-snug text-fg">{block.text}</h3>;
    case "ul":
      return (
        <ul className="space-y-2.5">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3 text-[16px] leading-relaxed text-fg-muted">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-400/60" aria-hidden />
              <span>
                <Rich text={item} />
              </span>
            </li>
          ))}
        </ul>
      );
    case "table":
      return (
        <div className="overflow-x-auto rounded-2xl border border-line-strong bg-white shadow-card">
          <table className="w-full min-w-[34rem] border-collapse text-left text-[15px] leading-relaxed">
            <thead>
              <tr className="bg-[#eaf0ff]">
                {block.head.map((h) => (
                  <th key={h} scope="col" className="px-4 py-3 font-mono text-[12px] font-bold uppercase tracking-wider text-[#302e86]">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row[0]} className="border-t border-line align-top">
                  {row.map((cell, i) => (
                    <td key={i} className={i === 0 ? "px-4 py-3.5 font-semibold text-fg" : "px-4 py-3.5 text-fg-muted"}>
                      <Rich text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "contact":
      return (
        <dl className="divide-y divide-line overflow-hidden rounded-2xl border border-line-strong bg-white shadow-card">
          {block.rows.map((r) => (
            <div key={r.label} className="grid gap-1 px-5 py-4 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-4">
              <dt className="text-[15px] font-semibold text-fg">{r.label}</dt>
              <dd className="text-[15px] text-fg-muted">
                <Rich text={r.value} />
              </dd>
            </div>
          ))}
        </dl>
      );
  }
}

/** A long legal document: sticky "On this page" list beside numbered sections. */
export function PolicyDocument({ sections }: { sections: PolicySection[] }) {
  return (
    <section className="bg-white py-12 sm:py-14 lg:py-16">
      <Container className="max-w-[1280px]">
        <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-8 lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] lg:gap-14">
          <PolicyToc items={sections.map((s) => ({ id: s.id, label: s.nav }))} />
          <div className="max-w-3xl space-y-14">
            {sections.map((s, i) => (
              <article key={s.id} id={s.id} className="scroll-mt-[100px]">
                <h2 className="flex items-baseline gap-4 text-balance font-display text-[clamp(1.5rem,3vw,2rem)] font-bold leading-[1.15] tracking-tight text-fg">
                  <span className="font-mono text-[clamp(1rem,2vw,1.25rem)] font-bold text-[#2f6bff]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.title}
                </h2>
                <div className="mt-6 space-y-5">
                  {s.blocks.map((b, j) => (
                    <Block key={j} block={b} />
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
