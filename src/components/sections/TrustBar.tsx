import { Container } from "@/components/ui/Container";
import { trustLogos } from "@/content/sections";

/** Trust strip. Replace the placeholder wordmarks with real client logos when cleared. */
export function TrustBar() {
  const row = [...trustLogos, ...trustLogos];

  return (
    <section className="border-y border-line bg-ink-800/30 py-10">
      <Container>
        <p className="text-center font-mono text-[11px] uppercase tracking-[0.18em] text-fg-faint">
          Built for terminal operations at scale
        </p>
      </Container>
      <div className="mask-fade-x mt-7 overflow-hidden">
        <div className="flex w-max animate-marquee items-center gap-4">
          {row.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="inline-flex items-center gap-2.5 whitespace-nowrap rounded-full border border-line bg-white px-5 py-2.5 text-[14px] font-medium text-fg-muted shadow-[0_1px_2px_rgba(20,24,70,0.04)]"
              /* Placeholder logo slot — swap for an <Image> of the real mark */
            >
              <span className="h-2 w-2 rounded-sm bg-teal-400/50" aria-hidden />
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
