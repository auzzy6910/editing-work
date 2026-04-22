import Link from "next/link";
import { Logo } from "@/components/brand/Logo";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-robert-soft/60 bg-snow">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-md text-sm text-ink-soft">
            Robert edits documents in 47 countries. Academic papers, manuscripts,
            contracts, speeches, screenplays — anything that has to be read and
            remembered.
          </p>
          <form className="mt-6 flex max-w-md items-center gap-2">
            <input
              type="email"
              placeholder="you@domain.com"
              aria-label="Email address"
              className="h-11 flex-1 rounded-full border border-robert-soft bg-canvas px-4 text-sm outline-none transition focus:border-robert focus:shadow-ring"
            />
            <button
              type="button"
              className="h-11 rounded-full bg-ink px-5 text-sm font-medium text-white transition hover:bg-robert"
            >
              Subscribe
            </button>
          </form>
          <p className="mt-2 text-xs text-ink-muted">
            The Red Pen Digest — one email a month. No fluff.
          </p>
        </div>
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-ink-muted">
            Sitemap
          </p>
          <ul className="space-y-2 text-sm">
            {[
              ["/work", "Work"],
              ["/services", "Services"],
              ["/about", "About"],
              ["/contact", "Contact"],
            ].map(([href, label]) => (
              <li key={href}>
                <Link className="text-ink-soft hover:text-robert" href={href}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-ink-muted">
            Elsewhere
          </p>
          <ul className="space-y-2 text-sm">
            <li>
              <a className="text-ink-soft hover:text-robert" href="#">
                LinkedIn
              </a>
            </li>
            <li>
              <a className="text-ink-soft hover:text-robert" href="#">
                X / Twitter
              </a>
            </li>
            <li>
              <a className="text-ink-soft hover:text-robert" href="mailto:hello@robertediting.example">
                hello@robertediting.example
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-robert-soft/60">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-2 px-6 py-6 text-xs text-ink-muted sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Robert Editing. All rights reserved.</p>
          <p className="font-mono">
            Before I touch it, it&apos;s a draft.
          </p>
        </div>
      </div>
    </footer>
  );
}
