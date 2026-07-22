"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";
import { Menu, Close } from "@/components/ui/icons";
import { nav, cta } from "@/content/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      setHidden(y > last && y > 340 && !open);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: hidden ? -90 : 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled
          ? "border-b border-line bg-white/80 shadow-[0_6px_24px_-16px_rgba(20,24,70,0.35)] backdrop-blur-xl"
          : "border-b border-transparent"
      )}
    >
      <nav
        className="container-page flex h-[68px] items-center justify-between"
        aria-label="Primary"
      >
        <a href="#top" className="rounded-md" aria-label="ShiftEaze home">
          <Logo />
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="relative rounded-md px-3 py-2 text-[14px] text-fg-muted transition-colors after:absolute after:bottom-0.5 after:left-3 after:right-3 after:h-px after:origin-left after:scale-x-0 after:bg-teal-400 after:transition-transform after:duration-300 hover:text-fg hover:after:scale-x-100"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#demo"
            className="relative hidden text-[14px] text-fg-muted transition-colors after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:origin-left after:scale-x-0 after:bg-teal-400 after:transition-transform after:duration-300 hover:text-fg hover:after:scale-x-100 sm:block"
          >
            Sign in
          </a>
          <Button href={cta.primary.href} size="md" className="hidden sm:inline-flex">
            {cta.primary.label}
          </Button>
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-lg border border-line text-fg transition-all duration-200 hover:border-teal-400/40 hover:bg-teal-500/[0.06] active:scale-95 md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-line bg-white/95 backdrop-blur-xl md:hidden"
          >
            <div className="container-page flex flex-col gap-1 py-4">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-[15px] font-medium text-fg-muted hover:bg-teal-500/[0.05] hover:text-fg"
                >
                  {item.label}
                </a>
              ))}
              <Button
                href={cta.primary.href}
                size="lg"
                className="mt-3 w-full"
                onClick={() => setOpen(false)}
              >
                {cta.primary.label}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
