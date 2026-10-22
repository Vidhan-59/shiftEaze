import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind class names with conflict resolution. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a large integer with thin thousands separators. */
export function formatNumber(n: number) {
  return new Intl.NumberFormat("en-US").format(n);
}
