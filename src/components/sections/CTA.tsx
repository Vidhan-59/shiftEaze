import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { DemoForm } from "@/components/sections/DemoForm";
import { site } from "@/content/site";

const steps = [
  { n: "1", t: "Tell us your terminals", s: "Share how many sites, roles and shifts you run." },
  { n: "2", t: "See it on your data", s: "We stand up a scoped pilot on a representative terminal." },
  { n: "3", t: "Go live, one terminal at a time", s: "Roll out predictions and ShiftEaze Voice calling per site." },
];

export function CTA() {
  return (
    <section id="demo" className="scroll-mt-20 py-24 sm:py-28">
      <Container>
        {/* The shift change itself — the moment the whole product exists for. */}
        <figure className="relative mb-10 overflow-hidden rounded-3xl border border-line shadow-float">
          <Photo
            name="mining-operation"
            alt="Open-pit mining operation with haul trucks, excavators and workers on shift"
            ratio="21/9"
            sizes="(min-width: 1200px) 1152px, 100vw"
          />
          <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0d0c28]/85 via-[#0d0c28]/45 to-transparent px-6 pb-6 pt-16 sm:px-10 sm:pb-8">
            <p className="max-w-xl text-[15px] font-medium leading-relaxed text-white sm:text-[17px]">
              Six hundred operators, twelve sites, one shift change.
              ShiftEaze knows who&apos;s coming before the gate does.
            </p>
          </figcaption>
        </figure>

        <div className="relative overflow-hidden rounded-3xl border border-line-strong bg-white p-8 shadow-float sm:p-14">
          <div
            className="pointer-events-none absolute -inset-x-20 -top-40 h-[420px] bg-hero-glow"
            aria-hidden
          />
          {/*
            The form now collects qualifying detail, so it takes the wider
            column and the steps sit alongside as a narrower rail — at
            `items-start`, since the two columns are no longer similar heights.
          */}
          <div className="relative grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:items-start">
            <div>
              <span className="eyebrow">
                <span className="h-px w-6 bg-teal-400/70" aria-hidden />
                Book a demo
              </span>
              <h2 className="mt-4 text-[clamp(1.9rem,3.6vw,2.8rem)] font-semibold leading-[1.05] tracking-tighter text-fg">
                Get the platform that knows{" "}
                <span className="text-gradient">who&apos;ll show up.</span>
              </h2>
              <p className="mt-5 max-w-lg text-[16.5px] leading-relaxed text-fg-muted">
                See {site.name} run on a terminal like yours. Tell us how your
                operation is set up and we&apos;ll tailor the walkthrough —
                auto-rostering, the prediction pipeline and {site.module} calling
                on real shift patterns.
              </p>

              <DemoForm />
            </div>

            <div className="space-y-3 lg:sticky lg:top-28">
              {steps.map((s) => (
                <div
                  key={s.n}
                  className="glass flex items-start gap-4 rounded-xl p-5"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-teal-400/15 font-mono text-[13px] font-semibold text-teal-300">
                    {s.n}
                  </span>
                  <div>
                    <div className="text-[15px] font-medium text-fg">
                      {s.t}
                    </div>
                    <div className="mt-0.5 text-[13.5px] leading-snug text-fg-muted">
                      {s.s}
                    </div>
                  </div>
                </div>
              ))}

              <div className="rounded-xl border border-line bg-ink-850 p-5">
                <div className="text-[14px] font-medium text-fg">
                  Already a customer?
                </div>
                <p className="mt-1 text-[13.5px] leading-snug text-fg-muted">
                  Sign in to your terminal&apos;s {site.name} workspace.
                </p>
                <a
                  href={site.loginUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-[14px] font-medium text-teal-300 transition-colors hover:text-teal-400"
                >
                  Log in
                  <span aria-hidden>→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
