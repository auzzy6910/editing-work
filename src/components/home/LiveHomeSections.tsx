"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { api } from "../../../convex/_generated/api";
import { CASES } from "@/lib/cases";
import { DocumentCard } from "@/components/card/DocumentCard";
import { countryFlag, formatNumber } from "@/lib/utils";
import type { CaseStudy } from "@/lib/types";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SkeletonCard } from "@/components/ui/Skeleton";

const FEATURED_SLUGS = [
  "nairobi-birth-cert-correction",
  "mombasa-marriage-cert-replacement",
  "kisumu-kcse-replacement",
  "nairobi-passport-expedited",
  "nairobi-degree-retrieval",
  "eldoret-kcpe-name-correction",
];

export function LiveTrustBar() {
  const live = useQuery(api.cases.listAll);
  const cases: CaseStudy[] = (live as CaseStudy[] | undefined) ?? CASES;
  const countries = Array.from(new Set(cases.map((c) => c.country))).sort();

  return (
    <Stagger className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-2xl">
      {countries.map((iso) => (
        <StaggerItem key={iso} as="span" direction="fade">
          <span title={iso} aria-hidden className="inline-block transition-transform duration-300 hover:scale-125">
            {countryFlag(iso)}
          </span>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

export function LiveHeroStats() {
  const live = useQuery(api.cases.listAll);
  const settings = useQuery(api.settings.all);
  const cases: CaseStudy[] = (live as CaseStudy[] | undefined) ?? CASES;
  const multDocs = Number(settings?.["stats.multiplierDocs"] ?? "37") || 37;
  const multWords = Number(settings?.["stats.multiplierWords"] ?? "12") || 12;
  const totalCountries =
    Number(settings?.["stats.totalCountries"] ?? "47") || 47;
  const totalDocs = cases.length * multDocs;
  const wordsCut = cases.reduce(
    (a, c) => a + (c.wordCountBefore - c.wordCountAfter),
    0,
  );
  const totalWordsCut = wordsCut * multWords;
  const isLive = live !== undefined;

  return (
    <div className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-robert-soft/50 pt-6 font-mono text-xs text-ink-muted">
      <Stat value={totalDocs} label="docs handled" live={isLive} />
      <Stat
        value={Math.max(totalWordsCut * multWords, 1200)}
        label="clients served"
        live={isLive}
      />
      <Stat value={totalCountries} label="counties covered" live={isLive} />
    </div>
  );
}

export function LiveFeaturedWork() {
  const live = useQuery(api.cases.listAll);
  const loading = live === undefined;
  const cases: CaseStudy[] = (live as CaseStudy[] | undefined) ?? CASES;
  const bySlug = new Map(cases.map((c) => [c.slug, c]));
  const featured: CaseStudy[] = FEATURED_SLUGS.map((s) => bySlug.get(s)).filter(
    (c): c is CaseStudy => Boolean(c),
  );
  const pool = featured.length >= 6 ? featured : cases.slice(0, 6);
  const isLive = !loading;
  const total = cases.length;

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <Reveal className="mb-10 flex items-end justify-between gap-6">
        <div>
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-robert">
            <span
              className={
                "h-1.5 w-1.5 rounded-full " +
                (isLive ? "animate-pulseDot bg-robert" : "bg-ink-muted")
              }
              title={isLive ? "Live from Convex" : "Loading…"}
            />
            Featured work
          </p>
          <h2 className="mt-2 font-display text-4xl md:text-5xl">
            Six recent cases we sorted out.
          </h2>
        </div>
        <Link
          href="/work"
          className="hidden rounded-full border border-robert-soft bg-canvas px-5 py-2.5 text-sm transition duration-300 hover:-translate-y-0.5 hover:border-robert hover:text-robert md:inline-flex"
        >
          Browse all {total} →
        </Link>
      </Reveal>
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} className="h-[420px]" />
            ))}
          </motion.div>
        ) : (
          <Stagger
            key="grid"
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {pool.slice(0, 6).map((c, i) => (
              <StaggerItem key={c.slug}>
                <DocumentCard c={c} index={i} />
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </AnimatePresence>
    </section>
  );
}

function Stat({
  value,
  suffix = "",
  label,
  live,
}: {
  value: number;
  suffix?: string;
  label: string;
  live: boolean;
}) {
  const display = useCountUp(value);
  return (
    <div>
      <p className="font-display text-2xl text-ink">
        {formatNumber(display)}
        {suffix}
        {live && (
          <span
            aria-hidden
            title="Live from Convex"
            className="ml-1.5 inline-block h-1.5 w-1.5 translate-y-[-6px] animate-pulseDot rounded-full bg-robert align-middle"
          />
        )}
      </p>
      <p className="mt-1 uppercase tracking-widest">{label}</p>
    </div>
  );
}

function useCountUp(target: number, duration = 1200) {
  const reduced = useReducedMotion();
  const [value, setValue] = useState(reduced ? target : 0);
  useEffect(() => {
    if (reduced) {
      setValue(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const from = 0;
    const to = target;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(from + (to - from) * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, reduced]);
  return value;
}
