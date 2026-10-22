import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/icons";

/**
 * The single end-of-page button most subpages get (brief section 8's
 * per-page "Button | Goes to | Note" row) — deliberately just a button, not
 * the larger titled CTA band, since most subpages give no heading/lead copy
 * for one.
 */
export function EndOfPageCTA({
  label,
  href,
  caption,
}: {
  label: string;
  href: string;
  caption?: string;
}) {
  return (
    <section className="border-t border-line py-14 sm:py-16">
      <Container>
        <div className="flex flex-wrap items-center gap-4">
          <Button href={href} size="lg">
            {label}
            <ArrowRight width={17} height={17} />
          </Button>
          {caption && <span className="text-[14px] text-fg-muted">{caption}</span>}
        </div>
      </Container>
    </section>
  );
}
