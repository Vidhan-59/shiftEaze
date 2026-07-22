import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/content/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", lg: "2rem" },
      screens: { "2xl": "1200px" },
    },
    extend: {
      colors: {
        /**
         * Light "operations-desk" surface scale.
         * ink-950 is white (used as text-on-accent); numbers climb into cooler
         * light greys used for cards, tracks and section fills.
         */
        ink: {
          950: "#ffffff",
          900: "#ffffff",
          850: "#f8faff",
          800: "#eef2fb",
          700: "#e3e9f6",
          600: "#d6deef",
          500: "#c4cee6",
        },
        line: "rgba(31,35,92,0.12)",
        "line-strong": "rgba(31,35,92,0.20)",
        /**
         * Signature brand accent — the deep ShiftEaze navy from the logo.
         * (Kept under the `teal` key so the whole codebase inherits the brand
         * without a rename; every `teal-*` renders as navy.)
         */
        teal: {
          50: "#eef0fb",
          100: "#dcddf6",
          200: "#bcbdec",
          300: "#4b49ab",
          400: "#302e86",
          500: "#262261",
          600: "#1f1c52",
          700: "#181643",
          800: "#131136",
          900: "#0d0c28",
        },
        // ShiftEaze red — the energetic secondary from the logo wordmark.
        accent: {
          50: "#fdeff0",
          100: "#fbd9dc",
          200: "#f5b0b6",
          300: "#ee7f89",
          400: "#e64c5a",
          500: "#d51f2c",
          600: "#b3121f",
          700: "#8f0e18",
        },
        // Live/data signal — brand red, used sparingly for pulses & markers.
        signal: "#e11d2b",
        // Semantic risk colors, tuned for a light surface.
        risk: {
          high: "#dc2626",
          med: "#d97706",
          low: "#0f9d58",
        },
        fg: {
          DEFAULT: "#14163a",
          muted: "#535a7c",
          faint: "#868cac",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.045em",
        tighter: "-0.03em",
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      maxWidth: {
        prose: "42rem",
      },
      boxShadow: {
        card: "0 1px 2px 0 rgba(20,24,70,0.05), 0 14px 30px -14px rgba(20,24,70,0.16)",
        "card-hover":
          "0 2px 4px 0 rgba(20,24,70,0.06), 0 26px 50px -20px rgba(20,24,70,0.24)",
        glow: "0 0 0 1px rgba(48,46,134,0.16), 0 10px 34px -8px rgba(48,46,134,0.32)",
        float:
          "0 26px 60px -26px rgba(20,24,70,0.28), 0 6px 16px -8px rgba(20,24,70,0.12)",
      },
      backgroundImage: {
        "grid-fade":
          "radial-gradient(circle at 50% 0%, rgba(48,46,134,0.09), transparent 55%)",
        "hero-glow":
          "radial-gradient(60% 50% at 50% 0%, rgba(48,46,134,0.12), transparent 70%)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.7)", opacity: "0.6" },
          "70%": { transform: "scale(2.2)", opacity: "0" },
          "100%": { opacity: "0" },
        },
        shimmer: { to: { backgroundPosition: "200% center" } },
        drift: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "bar-grow": {
          from: { transform: "scaleY(0.3)" },
          to: { transform: "scaleY(1)" },
        },
        marquee: { to: { transform: "translateX(-50%)" } },
        // New ambient effects for the light theme.
        aurora: {
          "0%,100%": { transform: "translate3d(0,0,0) scale(1)" },
          "33%": { transform: "translate3d(3%,-4%,0) scale(1.08)" },
          "66%": { transform: "translate3d(-3%,3%,0) scale(0.96)" },
        },
        "spin-slow": { to: { transform: "rotate(360deg)" } },
        "gradient-x": {
          "0%,100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both",
        "pulse-ring": "pulse-ring 2.4s cubic-bezier(0.16,1,0.3,1) infinite",
        shimmer: "shimmer 6s linear infinite",
        drift: "drift 6s ease-in-out infinite",
        marquee: "marquee 32s linear infinite",
        aurora: "aurora 18s ease-in-out infinite",
        "spin-slow": "spin-slow 22s linear infinite",
        "gradient-x": "gradient-x 8s ease infinite",
      },
    },
  },
  plugins: [],
};

export default config;
