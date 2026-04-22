import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { NewsletterForm } from "@/components/layout/NewsletterForm";
import {
  FooterTagline,
  FooterNewsletterCopy,
  FooterContactLink,
} from "@/components/layout/FooterCopy";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-robert-soft/60 bg-snow">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <FooterTagline />
          <NewsletterForm />
          <FooterNewsletterCopy />
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
          <FooterContactLink />
        </div>
      </div>
      <div className="border-t border-robert-soft/60">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-2 px-6 py-6 text-xs text-ink-muted sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Robert Editing. All rights reserved.</p>
          <p className="font-mono">Before I touch it, it&apos;s a draft.</p>
        </div>
      </div>
    </footer>
  );
}
