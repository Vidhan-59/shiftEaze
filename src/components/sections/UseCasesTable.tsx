import Link from "next/link";
import { Container } from "@/components/ui/Container";

/** The Solutions page's "What teams use ShiftEaze for" table (brief §8 §6 Use Cases). */
export function UseCasesTable({
  id,
  heading,
  rows,
}: {
  id: string;
  heading: string;
  rows: { useCase: string; line: string; href: string }[];
}) {
  return (
    <section id={id} className="scroll-mt-[76px] border-t border-line py-14 sm:py-16">
      <Container>
        <h2 className="text-balance font-display text-[clamp(1.6rem,3.2vw,2.25rem)] font-bold leading-[1.1] tracking-tight text-fg">
          {heading}
        </h2>
        <div className="mt-6 overflow-x-auto rounded-xl border border-line">
          <table className="w-full text-[13.5px]">
            <thead>
              <tr className="border-b border-line bg-ink-850 text-left">
                <th className="px-5 py-3 font-semibold text-fg">Use case</th>
                <th className="px-5 py-3 font-semibold text-fg">In one line</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.href} className="border-b border-line last:border-b-0">
                  <td className="px-5 py-3 font-medium">
                    <Link href={r.href} className="text-teal-600 transition-colors hover:text-teal-400">
                      {r.useCase}
                    </Link>
                  </td>
                  <td className="px-5 py-3 text-fg-muted">{r.line}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  );
}
