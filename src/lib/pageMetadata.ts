import type { Metadata } from "next";

/**
 * Builds a page's title/description/canonical/Open Graph from the same
 * values (restructure brief §5.2) — avoids four near-duplicate fields per
 * page.tsx. The title is used exactly as given (`absolute`) so the root
 * layout's " · ShiftEaze" template is not appended a second time.
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
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path },
  };
}
