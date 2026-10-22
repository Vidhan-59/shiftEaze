import type { Metadata } from "next";

/**
 * Builds a page's title/description/canonical/Open Graph from the same
 * values (restructure brief §5.2) — avoids four near-duplicate fields per
 * page.tsx. Not used by /pricing, whose existing metadata is left alone.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path },
  };
}
