"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { LogoFull } from "./Logo";
import { Button } from "@/components/ui/Button";
import { Menu, Close, ChevronDown } from "@/components/ui/icons";
import { nav, cta, site } from "@/content/site";
import { page } from "@/content/siteMap";
import { getLenis } from "@/lib/lenis";
import { cn } from "@/lib/utils";

const DIRECTION_HYSTERESIS = 24;
const HIDE_AFTER = 340;

/** The dropdown rows for a nav item with `dropdownOf` set — its page's sections, as `href#id`. */
function dropdownItems(item: (typeof nav)[number]) {
  if (!("dropdownOf" in item) || !item.dropdownOf) return [];
  const p = page(item.dropdownOf);
  const rows = p.dropdownSections ?? p.sections ?? [];
  return rows.map((s) => ({ label: s.name, href: `${p.href}#${s.id}` }));
}

/** Splits links into columns of at most four, balanced (8 -> 4+4, 9 -> 3+3+3, 5 -> 3+2). */
function toColumns<T>(rows: T[]) {
  const cols = Math.max(1, Math.ceil(rows.length / 4));
  const per = Math.ceil(rows.length / cols);
  return Array.from({ length: cols }, (_, i) => rows.slice(i * per, (i + 1) * per)).filter((c) => c.length);
}

export function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<Record<string, boolean>>({});
  const anchor = useRef(0);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  // Touch has no hover, so on tablets the first tap on a parent link opens its
  // submenu and only a second tap navigates. Records whether that submenu was
  // already open when a touch/pen press began (null for mouse presses).
  const touchWasOpen = useRef<boolean | null>(null);

  const closeAll = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setOpenDropdown(null);
    setOpen(false);
    if (typeof document !== "undefined" && document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  const handleMouseEnter = (label: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  // Close menus when route/pathname changes
  useEffect(() => {
    closeAll();
  }, [pathname]);

  // Global listeners: Escape key, click outside header, and window resize
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeAll();
      }
    };
    // pointerdown, not click: iOS Safari doesn't fire click on plain page
    // content, so a tap outside would otherwise never close the dropdown.
    const onDocPointerDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target?.closest("header")) {
        setOpenDropdown(null);
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 1280) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDocPointerDown);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDocPointerDown);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useMotionValueEvent(scrollY, "change", (y) => {
    if (y < HIDE_AFTER || open) {
      anchor.current = y;
      setHidden(false);
      return;
    }
    const diff = y - anchor.current;
    if (diff > DIRECTION_HYSTERESIS) {
      anchor.current = y;
      setHidden(true);
    } else if (diff < -DIRECTION_HYSTERESIS) {
      anchor.current = y;
      setHidden(false);
    }
  });

  useEffect(() => {
    if (!open) return;
    const body = document.body;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    const prevOverflow = body.style.overflow;
    const prevPad = body.style.paddingRight;

    body.style.overflow = "hidden";
    if (gap > 0) body.style.paddingRight = `${gap}px`;
    getLenis()?.stop();

    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPad;
      getLenis()?.start();
    };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: hidden ? -90 : 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      style={{ willChange: "transform", transform: "translateZ(0)" }}
      className="fixed inset-x-0 top-0 z-50 isolate border-b border-line bg-white shadow-[0_6px_24px_-16px_rgba(20,24,70,0.35)] transition-colors duration-300"
    >
      <nav
        className="mx-auto flex h-[72px] w-[94%] max-w-[1560px] items-center justify-between lg:w-[92%] min-[1500px]:w-[80%]"
        aria-label="Primary"
      >
        <Link
          href="/"
          className="flex items-center gap-1 rounded-md transition-transform duration-300 hover:scale-[1.03]"
          aria-label="ShiftEaze home"
          onClick={closeAll}
        >
          <LogoFull className="h-9 lg:h-10 xl:h-12" />
        </Link>

        <ul className="hidden items-center gap-0.5 xl:flex min-[1400px]:gap-1">
          {nav.map((item) => {
            const rows = dropdownItems(item);
            const hasDropdown = rows.length > 0;
            const isOpen = openDropdown === item.label;
            const linkClass =
              "relative flex items-center gap-1 whitespace-nowrap rounded-md px-2 py-2 text-[13.5px] text-fg-muted transition-colors xl:px-2.5 xl:text-[15px] min-[1400px]:px-3 after:absolute after:bottom-0.5 after:left-2 after:right-2 after:h-px after:origin-left after:scale-x-0 after:bg-teal-400 after:transition-transform after:duration-300 hover:text-fg hover:after:scale-x-100";

            return (
              <li
                key={item.label}
                className={cn(hasDropdown && "relative")}
                onMouseEnter={() => hasDropdown && handleMouseEnter(item.label)}
                onMouseLeave={() => hasDropdown && handleMouseLeave()}
                onFocus={() => hasDropdown && handleMouseEnter(item.label)}
                onBlur={(e) => {
                  if (hasDropdown && !e.currentTarget.contains(e.relatedTarget)) {
                    setOpenDropdown(null);
                  }
                }}
              >
                <Link
                  href={item.href}
                  className={linkClass}
                  aria-expanded={hasDropdown ? isOpen : undefined}
                  onPointerDown={(e) => {
                    touchWasOpen.current = e.pointerType === "mouse" ? null : isOpen;
                  }}
                  onClick={(e) => {
                    const firstTouchTap = hasDropdown && touchWasOpen.current === false;
                    touchWasOpen.current = null;
                    if (firstTouchTap) {
                      e.preventDefault();
                      handleMouseEnter(item.label);
                      return;
                    }
                    closeAll();
                  }}
                >
                  {item.label}
                  {hasDropdown && (
                    <ChevronDown
                      width={14}
                      height={14}
                      className={cn("transition-transform duration-200", isOpen && "rotate-180")}
                    />
                  )}
                </Link>

                {hasDropdown && (
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        key="sub"
                        initial={{ clipPath: "inset(0 100% 0 0 round 16px)", opacity: 0 }}
                        animate={{ clipPath: "inset(0 0% 0 0 round 16px)", opacity: 1 }}
                        exit={{ clipPath: "inset(0 100% 0 0 round 16px)", opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className={cn("absolute top-full z-10 pt-2", item.label === "Company" || item.label === "Resources" ? "right-0" : "left-0")}
                      >
                        <div className="flex w-max gap-1 rounded-2xl border border-line bg-white p-2 shadow-[0_22px_44px_-18px_rgba(20,24,70,0.38)]">
                          {toColumns(rows).map((col, ci) => (
                            <ul key={ci} className="flex w-[215px] flex-col">
                              {col.map((r) => (
                                <li key={r.href}>
                                  <Link
                                    href={r.href}
                                    onClick={closeAll}
                                    className="block rounded-lg px-3 py-2 text-[13px] font-medium leading-snug text-fg-muted transition-colors duration-200 hover:bg-[#302e86]/[0.07] hover:text-[#302e86]"
                                  >
                                    {r.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          {/* Real app login — external, so it opens in a new tab. */}
          <a
            href={site.loginUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeAll}
            className="relative hidden whitespace-nowrap px-1 text-[15px] font-medium text-fg-muted transition-colors after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:origin-left after:scale-x-0 after:bg-teal-400 after:transition-transform after:duration-300 hover:text-fg hover:after:scale-x-100 xl:block"
          >
            Log in
          </a>
          <Button
            href={cta.primary.href}
            size="md"
            className="hidden whitespace-nowrap sm:inline-flex"
            onClick={closeAll}
          >
            {cta.primary.label}
          </Button>
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-lg border border-line text-fg transition-all duration-200 hover:border-teal-400/40 hover:bg-teal-500/[0.06] active:scale-95 xl:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-line bg-white/95 backdrop-blur-xl xl:hidden"
          >
            <div data-lenis-prevent className="container-page max-h-[calc(100dvh-72px)] overflow-y-auto py-4">
              <div className="flex flex-col gap-1">
                {nav.map((item) => {
                  const rows = dropdownItems(item);
                  const hasDropdown = rows.length > 0;
                  const expanded = !!mobileExpanded[item.label];

                  if (!hasDropdown) {
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={closeAll}
                        className="rounded-lg px-3 py-3 text-[15px] font-medium text-fg-muted hover:bg-teal-500/[0.05] hover:text-fg"
                      >
                        {item.label}
                      </Link>
                    );
                  }

                  return (
                    <div key={item.label}>
                      <div className="flex items-center justify-between rounded-lg px-3 py-1">
                        <Link
                          href={item.href}
                          onClick={closeAll}
                          className="flex-1 py-2 text-[15px] font-medium text-fg-muted hover:text-fg"
                        >
                          {item.label}
                        </Link>
                        <button
                          type="button"
                          onClick={() =>
                            setMobileExpanded((m) => ({ ...m, [item.label]: !m[item.label] }))
                          }
                          aria-expanded={expanded}
                          aria-label={`Toggle ${item.label} submenu`}
                          className="grid h-9 w-9 shrink-0 place-items-center text-fg-faint"
                        >
                          <ChevronDown
                            width={15}
                            height={15}
                            className={cn("transition-transform duration-200", expanded && "rotate-180")}
                          />
                        </button>
                      </div>
                      <AnimatePresence initial={false}>
                        {expanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden pl-3"
                          >
                            {rows.map((r) => (
                              <Link
                                key={r.href}
                                href={r.href}
                                onClick={closeAll}
                                className="block rounded-lg px-3 py-2.5 text-[14px] text-fg-muted hover:bg-teal-500/[0.05] hover:text-fg"
                              >
                                {r.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              <a
                href={site.loginUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeAll}
                className="mt-2 block rounded-lg border border-line px-3 py-3 text-center text-[15px] font-medium text-fg-muted hover:bg-teal-500/[0.05] hover:text-fg"
              >
                Log in
              </a>
              <Button
                href={cta.primary.href}
                size="lg"
                className="mt-2 w-full"
                onClick={closeAll}
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
