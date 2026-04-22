import Link from "next/link";
import { Logo } from "@/components/brand/Logo";

const NAV = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
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
          <Link
            href="/contact"
            className="hidden rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white shadow-card transition-all hover:bg-robert hover:shadow-cardHover sm:inline-flex"
          >
            Send your draft
          </Link>
        </div>
      </div>
    </header>
  );
}
