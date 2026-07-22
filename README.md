# ShiftEaze — product website

Marketing + product site for **ShiftEaze**, a shift-based workforce management
platform for port & terminal operations, with the **ShiftEaze Voice** AI-calling
add-on.

Built as a high-polish, motion-rich single page: auto-rostering, a two-stage
attendance-prediction pipeline, live workforce dashboards, a product-tour band,
and the ShiftEaze Voice call-automation module.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** — custom **light** design system (navy + red brand tokens)
- **Framer Motion** — component/entrance/hover animation, pointer tilt, counters
- **GSAP + ScrollTrigger** — the pinned/scrubbed "How the AI works" sequence
- **Lenis** — page-wide smooth scrolling (synced to ScrollTrigger)
- `next/font` (Inter + JetBrains Mono), `next/image` for screenshots, native
  `<video>` for the product tour

Everything honors `prefers-reduced-motion`: Lenis, the aurora backdrop, the
pointer tilt and all decorative loops are disabled, and scroll sequences fall
back to static, in-view reveals.

## Brand & theme

Light "operations-desk" surface with the ShiftEaze palette from the logo:

- **Navy** `#262261 → #302e86` — primary brand accent (defined under the `teal-*`
  token scale so the whole codebase inherits it without a rename).
- **Red** `#d51f2c` — energetic secondary (`accent-*` scale) + live/signal markers.

Design tokens live in `tailwind.config.ts`; recipes (`.glass`, `.text-gradient`,
`.bg-blueprint`, `.aurora-blob`) live in `src/app/globals.css`.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build && npm start   # production
npm run typecheck            # tsc --noEmit
npm run lint
```

> Requires Node 18.17+. If you hit a stale-chunk error in dev, delete `.next`
> and restart (`rm -rf .next && npm run dev`).

## Add the real screenshots & video

- **Dashboards:** drop PNGs into
  [`public/assets/reference/`](public/assets/reference/README.md) with the
  documented filenames — they replace the animated mocks automatically.
- **Product tour:** drop `product-overview.mp4` into
  [`public/assets/video/`](public/assets/video/README.md) — it replaces the
  animated live-preview fallback automatically.
- **Logo:** the mark is rendered as vector in `components/layout/Logo.tsx`; edit
  there if you want to fine-tune it against the source artwork.

## Project structure

```
src/
├── app/
│   ├── layout.tsx          # fonts, metadata, SmoothScroll + nav/footer shell
│   ├── page.tsx            # section composition
│   └── globals.css         # design tokens, base layer, reduced-motion
├── components/
│   ├── layout/             # Navbar, Footer, Logo
│   ├── sections/           # Hero, TrustBar, ProblemSolution, Features,
│   │                       # HowItWorks, DashboardShowcase, MotionShowcase,
│   │                       # ShiftEaze (Voice), Metrics, CTA
│   ├── ui/                 # Button, Container, SectionHeading, Reveal,
│   │                       # AnimatedCounter, BrowserFrame, SmartShot, icons
│   ├── visuals/            # HeroVisual, Aurora, DashboardMock, FeatureAccents,
│   │                       # PipelineGraph, CallFlow, ProductVideo
│   └── providers/          # SmoothScroll (Lenis + ScrollTrigger)
├── content/                # site.ts, sections.ts — all copy lives here
├── hooks/                  # usePrefersReducedMotion
└── lib/                    # utils (cn), motion (shared variants)
```

Copy is centralized in `src/content/*` so it can be edited without touching
layout or motion code. Placeholder metrics are marked `[FILL IN]`.

## Notes for launch

- Replace `[FILL IN]` metrics in `src/content/sections.ts` with verified figures.
- Swap the placeholder wordmarks in `TrustBar` for real client logos.
- Point the demo form (`CTA.tsx`) at your CRM / form endpoint.
- Add an OG image and confirm `metadataBase` in `layout.tsx` (`shifteaze.com`).
