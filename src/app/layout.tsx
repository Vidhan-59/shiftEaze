import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/content/site";

// Render every page on the server for each request (SSR) rather than pre-building
// it at deploy time. Set once here so all routes below inherit it. Required by
// the SEO team: crawlers always get server-rendered HTML.
export const dynamic = "force-dynamic";

/** Google Tag Manager container (Google Analytics is configured inside GTM). */
const GTM_ID = "GTM-PP5KW4L3";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "700"],
});

// Display face for headlines — a grotesk with genuine, slightly irregular
// character instead of the razor-neutral default, without tipping into
// condensed-poster territory.
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://${site.domain}`),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "ShiftEaze",
    "manpower management software",
    "shift management software",
    "workforce management",
    "port & terminal operations",
    "attendance prediction",
    "shift scheduling AI",
    "automated attendance calling",
  ],
  openGraph: {
    type: "website",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  icons: { icon: "/favicon.svg" },
  // Google Search Console ownership verification (renders <meta name="google-site-verification">).
  verification: { google: "EoWYQtGuYWtDRUHfb2ecTui1vxl5hTn8eOa-e1fhcvs" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f5f7fd",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${mono.variable} ${bricolage.variable}`}
    >
      <head>
        {/* Google Tag Manager: standard loader. It sets up dataLayer, sends gtm.start, then loads gtm.js async. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
      </head>
      {/*
        suppressHydrationWarning here only ignores mismatched *attributes* on
        this element (not children) — needed because browser extensions like
        Grammarly inject data-gr-* attributes onto <body> before React
        hydrates, which otherwise logs a false-positive hydration error.
      */}
      <body className="min-h-screen antialiased" suppressHydrationWarning>
        {/* Google Tag Manager (noscript fallback) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/*
          Targets <main>, not the hero. It used to point at `#top` — the very
          top of the page, above the navbar — so "skip to content" skipped
          nothing. `tabIndex={-1}` makes <main> focusable so focus genuinely
          lands there; SmoothScroll special-cases this link so its scroll
          hijacking doesn't swallow the focus move.
        */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-teal-400 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <SmoothScroll>
          <Navbar />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
