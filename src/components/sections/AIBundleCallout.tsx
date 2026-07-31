import { Reveal } from "@/components/ui/Reveal";
import { aiBundle } from "@/content/pricing";

/**
 * The buy-up argument, laid out as arithmetic rather than persuasion: adding
 * every AI module to Professional costs more than Enterprise includes them for.
 * Sits between the comparison table and the FAQ.
 */
export function AIBundleCallout() {
  return (
    <Reveal>
      <div className="mt-20 overflow-hidden rounded-2xl border border-teal-400/30 bg-teal-400/[0.05]">
        <div className="grid gap-8 p-7 sm:p-10 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
          <div>
            <span className="eyebrow">
              <span className="h-px w-6 bg-teal-400/70" aria-hidden />
              Bundle economics
            </span>
            <h3 className="mt-4 text-[clamp(1.35rem,2.4vw,1.85rem)] font-semibold leading-tight tracking-tight text-fg">
              {aiBundle.headline}
            </h3>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-fg-muted">
              {aiBundle.body}
            </p>
          </div>

          {/* The maths, itemised — a CFO should be able to check it at a glance. */}
          <div className="rounded-xl border border-line bg-white p-5 sm:p-6">
            <table className="w-full text-[13.5px]">
              <caption className="sr-only">
                Cost of adding every AI module to Professional, compared with
                Enterprise
              </caption>
              <tbody>
                {aiBundle.lines.map((l) => (
                  <tr key={l.label}>
                    <th
                      scope="row"
                      className="py-1.5 pr-3 text-left font-normal text-fg-muted"
                    >
                      {l.label}
                    </th>
                    <td className="py-1.5 text-right font-medium tabular-nums text-fg">
                      {l.value}
                    </td>
                  </tr>
                ))}
                <tr className="border-t border-line-strong">
                  <th
                    scope="row"
                    className="pt-3 pr-3 text-left text-[14px] font-semibold text-fg"
                  >
                    {aiBundle.total.label}
                  </th>
                  <td className="pt-3 text-right text-[16px] font-semibold tabular-nums text-fg">
                    {aiBundle.total.value}
                  </td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    className="pt-1.5 pr-3 text-left font-normal text-fg-muted"
                  >
                    {aiBundle.compare.label}
                  </th>
                  <td className="pt-1.5 text-right font-medium tabular-nums text-teal-300">
                    {aiBundle.compare.value}
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="mt-4 rounded-lg bg-teal-400/10 px-3.5 py-2.5 text-center font-mono text-[11px] font-semibold uppercase tracking-wider text-teal-300">
              {aiBundle.saving}
            </div>
            <p className="mt-3 text-center text-[11.5px] text-fg-faint">
              Per operator, per month, at the entry Enterprise band.
            </p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
