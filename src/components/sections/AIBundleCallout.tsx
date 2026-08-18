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
      <p className="mx-auto mt-12 max-w-lg border-t border-white/10 pt-6 text-center font-mono text-[10.5px] uppercase tracking-widest text-teal-100/50"></p>
    </Reveal>
  );
}
