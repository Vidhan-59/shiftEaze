import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { page } from "@/content/siteMap";
import { cn } from "@/lib/utils";

/**
 * Flat `Home › {page.name}` trail — every v3 page sits one level under Home.
 * `tone="dark"` is for use inside a navy hero band (`PageHeroBand`, or
 * Pricing's own thin breadcrumb strip); the wrapping section owns the
 * top-of-page padding that clears the fixed header, not this component.
 */
export function Breadcrumbs({
  pageKey,
  tone = "light",
}: {
  pageKey: string;
  tone?: "light" | "dark";
}) {
  const p = page(pageKey);

  return (
    <nav aria-label="Breadcrumb">
      <Container>
        <ol
          className={cn(
            "flex flex-wrap items-center gap-1.5 text-[13px]",
            tone === "dark" ? "text-white/60" : "text-fg-faint"
          )}
        >
          <li>
            <Link
              href="/"
              className={cn(
                "transition-colors",
                tone === "dark" ? "hover:text-white" : "hover:text-fg-muted"
              )}
            >
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className={tone === "dark" ? "text-white/85" : "text-fg-muted"}>
            {p.name}
          </li>
        </ol>
      </Container>
    </nav>
  );
}
