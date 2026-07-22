import { cn } from "@/lib/utils";

/** Realistic macOS-style browser chrome used to frame dashboard screenshots. */
export function BrowserFrame({
  url = "app.shifteaze.com",
  live = true,
  className,
  children,
}: {
  url?: string;
  live?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-line-strong bg-ink-850 shadow-float transition-shadow duration-500 group-hover:shadow-glow",
        className
      )}
    >
      <div className="flex items-center gap-3 border-b border-line bg-ink-800/80 px-4 py-3">
        <div className="flex gap-2" aria-hidden>
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]/80" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]/80" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]/80" />
        </div>
        <div className="ml-2 flex h-7 flex-1 items-center gap-2 truncate rounded-md border border-line bg-ink-900/70 px-3 font-mono text-[11.5px] text-fg-faint">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-fg-faint"
            aria-hidden
          >
            <rect x="4" y="10" width="16" height="10" rx="2" />
            <path d="M8 10V7a4 4 0 0 1 8 0v3" />
          </svg>
          {url}
        </div>
        {live && (
          <span className="hidden items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-widest text-teal-300 sm:inline-flex">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-teal-400/70" />
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
