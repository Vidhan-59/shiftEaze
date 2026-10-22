import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { howItWorks } from "@/content/home";

function Flow({ label, steps }: { label: string; steps: string[] }) {
  return (
    <div>
      <span className="text-[13px] font-semibold text-fg">{label}</span>
      <div className="mt-3 flex flex-wrap items-center gap-x-2.5 gap-y-2">
        {steps.map((s, i) => (
          <span key={s} className="flex items-center gap-2.5">
            <span className="rounded-md border border-line bg-white/70 px-3 py-1.5 text-[13px] text-fg-muted">
              {s}
            </span>
            {i < steps.length - 1 && <span className="text-fg-faint" aria-hidden>→</span>}
          </span>
        ))}
      </div>
    </div>
  );
}

export function HowItWorksStrip() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <Reveal className="space-y-8">
          <Flow label="On the app (operator):" steps={[...howItWorks.app]} />
          <Flow label="On the portal (management):" steps={[...howItWorks.portal]} />
        </Reveal>
        <p className="mt-8 text-center text-[15px] font-medium text-fg-muted">
          {howItWorks.closing}
        </p>
      </Container>
    </section>
  );
}
