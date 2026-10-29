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
    <section className="py-14 sm:py-16">
      <Container>
        <div className="flex justify-center">
          <Button href={href} size="lg" className="h-[68px] gap-3 px-11 text-[19px]">
            {label}
            <ArrowRight width={22} height={22} />
          </Button>
        </div>
      </Container>
    </section>
  );
}
