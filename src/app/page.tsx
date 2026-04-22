import Link from "next/link";
import { BeforeAfter } from "@/components/slider/BeforeAfter";
import { CASES } from "@/lib/cases";
import {
  LiveFeaturedWork,
  LiveHeroStats,
  LiveTrustBar,
} from "@/components/home/LiveHomeSections";
import {
  LiveHeroBadge,
  LiveHeroIntro,
} from "@/components/home/LiveHeroBadge";
import { LiveProcess } from "@/components/home/LiveProcess";
import { LiveTestimonials } from "@/components/home/LiveTestimonials";
import { LiveCTA } from "@/components/home/LiveCTA";

export default function Home() {
  const hero = CASES.find((c) => c.slug === "tokyo-product-launch-copy")!;

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-robert-soft/50">
        <div aria-hidden className="absolute inset-0 grid-dots opacity-50" />
        <div
          aria-hidden
          className="absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-robert/10 blur-3xl"
        />
        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-20 md:pt-28">
          <div className="grid gap-12 md:grid-cols-[1.05fr_1fr] md:items-center">
            <div>
              <LiveHeroBadge />
              <h1 className="mt-6 font-display text-5xl leading-[1.02] text-ink md:text-7xl">
                Before I touch it,
                <br />
                it&apos;s a <span className="relative inline-block">
                  draft
                  <span className="absolute inset-x-0 -bottom-1 block h-[6px] origin-left animate-inkSweep rounded-full bg-robert" />
                </span>.
              </h1>
              <LiveHeroIntro />
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/work"
                  className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-white shadow-card transition hover:bg-robert hover:shadow-cardHover"
                >
                  See the edits →
                </Link>
                <Link
                  href="/contact"
                  className="rounded-full border border-robert-soft bg-canvas px-6 py-3 text-sm font-medium text-ink transition hover:border-robert hover:text-robert"
                >
                  Send your draft
                </Link>
              </div>
              <LiveHeroStats />
            </div>

            {/* Hero slider */}
            <div>
              <BeforeAfter
                title={hero.title}
                before={hero.excerptBefore}
                after={hero.excerptAfter}
              />
              <p className="mt-3 text-center text-xs text-ink-muted">
                Drag the divider · arrow keys also work
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="border-b border-robert-soft/50 bg-snow py-10">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-ink-muted">
            Edited in 47 countries
          </p>
          <LiveTrustBar />
        </div>
      </section>

      {/* FEATURED WORK (live) */}
      <LiveFeaturedWork />

      {/* PROCESS (live) */}
      <LiveProcess />

      {/* TESTIMONIALS (live) */}
      <LiveTestimonials />

      {/* CTA (live) */}
      <LiveCTA />
    </div>
  );
}
