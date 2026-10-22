import { cn } from "@/lib/utils";

/** Browser-chrome mockup: traffic-light dots + a URL bar, wraps a preview. */
export function BrowserFrame({
  url = "shifteaze.com",
  live = true,
  children,
  className,
}: {
  url?: string;
  live?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-white/15 bg-white/[0.04] shadow-[0_30px_80px_-20px_rgba(10,10,40,0.55)]",
        className
      )}
    >
      <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.03] px-4 py-2.5">
        <div className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        </div>
        <div className="flex-1 truncate rounded-md bg-white/[0.06] px-3 py-1 text-center font-mono text-[11px] text-white/50">
          {url}
        </div>
        {live && (
          <span className="hidden items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-widest text-teal-300 sm:inline-flex">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-pulse rounded-full bg-teal-400/70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-teal-300" />
            </span>
            Live
          </span>
        )}
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}
