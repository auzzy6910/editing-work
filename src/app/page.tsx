"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { CASES } from "@/lib/cases";
import { WHATSAPP_BOOK_URL } from "@/lib/utils";
import {
  LiveFeaturedWork,
  LiveHeroStats,
  LiveTrustBar,
} from "@/components/home/LiveHomeSections";
import {
  LiveHeroBadge,
  LiveHeroIntro,
} from "@/components/home/LiveHeroBadge";
import { Reveal } from "@/components/ui/Reveal";
import { Skeleton } from "@/components/ui/Skeleton";
import {
  LazyProcess,
  LazyTestimonials,
  LazyCTA,
} from "@/components/home/LazyHomeSections";

// The BeforeAfter slider is interactive-only — ship it in its own chunk
// so the critical path stays small.
const BeforeAfter = dynamic(
  () =>
    import("@/components/slider/BeforeAfter").then((m) => ({
      default: m.BeforeAfter,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-xl2 border border-robert-soft/60 bg-canvas p-6 shadow-card">
        <Skeleton className="h-[320px] w-full" />
      </div>
    ),
  },
);

export default function Home() {
  const hero =
    CASES.find((c) => c.slug === "nairobi-birth-cert-correction") ?? CASES[0];

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-robert-soft/50">
        <div aria-hidden className="absolute inset-0 grid-dots opacity-50" />
        <motion.div
          aria-hidden
          className="absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-robert/10 blur-3xl"
          animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-20 md:pt-28">
          <div className="grid gap-12 md:grid-cols-[1.05fr_1fr] md:items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <LiveHeroBadge />
              <h1 className="mt-6 font-display text-5xl leading-[1.02] text-ink md:text-7xl">
                Your paperwork,
                <br />
                handled like a{" "}
                <span className="relative inline-block">
                  pro
                  <span className="absolute inset-x-0 -bottom-1 block h-[6px] origin-left animate-inkSweep rounded-full bg-robert" />
                </span>
                .
              </h1>
              <LiveHeroIntro />
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/work"
                  className="group relative overflow-hidden rounded-full bg-ink px-6 py-3 text-sm font-medium text-white shadow-card transition duration-300 hover:-translate-y-0.5 hover:bg-robert hover:shadow-cardHover"
                >
                  <span className="relative z-10">See recent cases →</span>
                </Link>
                <a
                  href={WHATSAPP_BOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-robert-soft bg-canvas px-6 py-3 text-sm font-medium text-ink transition duration-300 hover:-translate-y-0.5 hover:border-robert hover:text-robert"
                >
                  Book editing
                </a>
              </div>
              <LiveHeroStats />
            </motion.div>

            {/* Hero slider */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <BeforeAfter
                title={hero.title}
                before={hero.excerptBefore}
                after={hero.excerptAfter}
              />
              <p className="mt-3 text-center text-xs text-ink-muted">
                Drag the divider · see the correction in context
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="border-b border-robert-soft/50 bg-snow py-10">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-ink-muted">
              Editing Kenyan certificates · 47 counties · same-day replies
            </p>
          </Reveal>
          <LiveTrustBar />
        </div>
      </section>

      {/* FEATURED WORK — above-fold-ish, load eagerly but animate in */}
      <LiveFeaturedWork />

      {/* Below-the-fold sections lazy-load when scrolled into view */}
      <LazyProcess />
      <LazyTestimonials />
      <LazyCTA />
    </div>
  );
}
