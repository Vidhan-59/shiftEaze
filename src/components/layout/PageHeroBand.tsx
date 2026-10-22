import { Breadcrumbs } from "./Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";

/**
 * The dark navy hero band at the top of every inner page (everything except
 * Home and Pricing — see ADR in the redesign plan). Carries the page's
 * breadcrumb, a category tag, the single H1, and an optional sub-line.
 */
export function PageHeroBand({
  pageKey,
  tag,
  h1,
  subline,
}: {
  pageKey: string;
  tag: string;
  h1: string;
  subline?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-teal-400 pb-14 pt-28 sm:pb-16 sm:pt-32">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_85%_0%,rgba(255,255,255,0.10),transparent)]"
        aria-hidden
      />
      <div className="relative">
        <Breadcrumbs pageKey={pageKey} tone="dark" />
        <Container className="mt-6 max-w-3xl">
          <Tag tone="dark">{tag}</Tag>
          <h1 className="mt-4 text-balance font-display text-[clamp(2.25rem,5vw,3.5rem)] font-extrabold leading-[1.02] tracking-tight text-white">
            {h1}
          </h1>
          {subline && (
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-teal-100">{subline}</p>
          )}
        </Container>
      </div>
    </section>
  );
}
