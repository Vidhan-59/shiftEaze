"use client";

import { motion } from "framer-motion";
import { easeExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

const MARK = new Set(["guides,", "checklists", "explainers"]);

/**
 * A big, bold statement: the words rise in one after another, the key terms
 * carry a gradient and an underline that draws itself, and a dotted texture
 * with soft glows sits behind it.
 */
export function BoldIntro({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <div className={cn("relative isolate mx-auto max-w-4xl text-center", className)}>
      {/* texture + glow */}
      <div aria-hidden className="pointer-events-none absolute -inset-x-5 -inset-y-8 -z-10 lg:-inset-x-6">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(48,46,134,0.16)_1.2px,transparent_1.2px)] bg-[size:20px_20px] [mask-image:radial-gradient(70%_80%_at_50%_50%,#000,transparent)]" />
        <div className="absolute left-[8%] top-0 h-40 w-40 animate-aurora rounded-full bg-[#2f6bff]/20 blur-3xl" />
        <div className="absolute bottom-0 right-[8%] h-40 w-40 animate-aurora rounded-full bg-accent-500/15 blur-3xl [animation-delay:-8s]" />
      </div>

      <motion.p
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.045 } } }}
        className="text-balance font-display text-[clamp(1.55rem,3.2vw,2.5rem)] font-extrabold leading-[1.22] tracking-tight text-[#12153d]"
      >
        <span className="sr-only">{text}</span>
        <span aria-hidden>
          {words.map((w, i) => {
            const marked = MARK.has(w.toLowerCase());
            return (
              <span key={i} className="inline-block overflow-hidden py-[0.08em] align-bottom">
                <motion.span
                  variants={{ hidden: { y: "110%", opacity: 0 }, show: { y: 0, opacity: 1, transition: { duration: 0.7, ease: easeExpo } } }}
                  className={cn(
                    "relative inline-block",
                    marked && "bg-gradient-to-r from-[#2f6bff] via-[#5b59c9] to-[#d51f2c] bg-clip-text text-transparent",
                  )}
                >
                  {w}&nbsp;
                </motion.span>
              </span>
            );
          })}
        </span>
      </motion.p>
      <span className="mx-auto mt-7 block h-[6px] w-28 rounded-full bg-gradient-to-r from-teal-400 via-teal-300 to-accent-500" aria-hidden />
    </div>
  );
}
