import { cn } from "@/lib/utils";

/** Small pill badge (e.g. a page category label) used in hero bands. */
export function Tag({
  children,
  tone = "light",
  className,
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 font-mono text-[11.5px] font-medium uppercase tracking-[0.08em]",
        tone === "dark" ? "bg-white/15 text-white" : "bg-teal-50 text-teal-400",
        className
      )}
    >
      {children}
    </span>
  );
}
