/** Intrinsic size of /assets/worker/worker.webp (cut-out photo, transparent background). */
const IMG = { w: 1034, h: 2880 };

/**
 * The ShiftEaze worker: a static cut-out standing beside the Platform headline.
 * Purely decorative, so it is hidden from assistive tech and does not animate.
 */
export function HeroWorker({
  className = "",
  height = 420,
}: {
  className?: string;
  /** Rendered height in css px; width follows the image's aspect ratio. */
  height?: number;
}) {
  const width = Math.round((height * IMG.w) / IMG.h);
  return (
    <div className={`pointer-events-none ${className}`} style={{ width, height }} aria-hidden>
      {/* Plain <img>: the optimizer would re-compress and soften the cut-out. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/worker/worker.webp"
        alt=""
        width={IMG.w}
        height={IMG.h}
        decoding="async"
        draggable={false}
        className="h-full w-full select-none [filter:contrast(1.04)_saturate(1.05)_drop-shadow(0_0_1.5px_rgba(255,255,255,0.45))_drop-shadow(0_20px_24px_rgba(10,8,60,0.55))]"
      />
    </div>
  );
}
