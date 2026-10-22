import { Container } from "@/components/ui/Container";
import { BulletList, type BulletItem } from "@/components/ui/BulletList";

/**
 * One Platform/Solutions/Industries section: an H2, its paragraph(s) in the
 * order given (grey copy, then blue copy — or blue-first where the brief
 * reverses it), then optional bullets and a closing line. `id` is the
 * section's anchor and carries the jump-nav scroll offset.
 */
export function FeatureBody({
  id,
  heading,
  paragraphs,
  bullets,
  closing,
}: {
  id: string;
  heading: string;
  paragraphs?: string[];
  bullets?: (BulletItem | string)[];
  closing?: string;
}) {
  return (
    <section id={id} className="scroll-mt-[76px] border-t border-line py-14 sm:py-16">
      <Container className="max-w-3xl">
        <h2 className="text-balance font-display text-[clamp(1.6rem,3.2vw,2.25rem)] font-bold leading-[1.1] tracking-tight text-fg">
          {heading}
        </h2>
        {paragraphs?.map((p, i) => (
          <p key={i} className="mt-5 text-[16px] leading-relaxed text-fg-muted">
            {p}
          </p>
        ))}
        {bullets && <BulletList items={bullets} className="mt-6" />}
        {closing && (
          <p className="mt-6 text-[16px] leading-relaxed text-fg-muted">{closing}</p>
        )}
      </Container>
    </section>
  );
}
