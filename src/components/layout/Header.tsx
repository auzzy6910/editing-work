"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { WHATSAPP_BOOK_URL } from "@/lib/utils";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-robert-soft/60 bg-canvas/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Logo />
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-robert-ghost hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={WHATSAPP_BOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white shadow-card transition-all hover:bg-robert hover:shadow-cardHover sm:inline-flex"
          >
            Book editing
          </a>
          {/* Mobile menu button */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="relative flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-robert-ghost md:hidden"
          >
            <span className="sr-only">{open ? "Close" : "Menu"}</span>
            <span
              className={cn(
                "absolute h-0.5 w-5 rounded-full bg-ink transition-all duration-300",
                open ? "rotate-45" : "-translate-y-1.5",
              )}
            />
            <span
              className={cn(
                "absolute h-0.5 w-5 rounded-full bg-ink transition-all duration-300",
                open ? "opacity-0" : "opacity-100",
              )}
            />
            <span
              className={cn(
                "absolute h-0.5 w-5 rounded-full bg-ink transition-all duration-300",
                open ? "-rotate-45" : "translate-y-1.5",
              )}
            />
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      <div
        className={cn(
          "overflow-hidden border-t border-robert-soft/60 bg-canvas/95 backdrop-blur-lg transition-all duration-300 md:hidden",
          open ? "max-h-80" : "max-h-0 border-t-0",
        )}
      >
        <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-4 py-3 text-base font-medium text-ink-soft transition-colors hover:bg-robert-ghost hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={WHATSAPP_BOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-ink px-5 py-3 text-center text-sm font-medium text-white shadow-card transition-all hover:bg-robert hover:shadow-cardHover"
          >
            Book editing
          </a>
        </nav>
      </div>
    </header>
  );
}
