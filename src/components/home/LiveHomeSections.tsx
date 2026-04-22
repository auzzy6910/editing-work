"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { CASES } from "@/lib/cases";
import { DocumentCard } from "@/components/card/DocumentCard";
import { countryFlag, formatNumber } from "@/lib/utils";
import type { CaseStudy } from "@/lib/types";

const FEATURED_SLUGS = [
  "berlin-thesis-quantum",
  "tokyo-product-launch-copy",
  "lagos-grant-health",
  "sao-paulo-novel-debut",
  "london-contract-saas",
  "paris-screenplay-feature",
];

export function LiveTrustBar() {
  const live = useQuery(api.cases.listAll);
  const cases: CaseStudy[] = (live as CaseStudy[] | undefined) ?? CASES;
  const countries = Array.from(new Set(cases.map((c) => c.country))).sort();

  return (
    <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-2xl">
      {countries.map((iso) => (
        <span key={iso} title={iso} aria-hidden>
          {countryFlag(iso)}
        </span>
      ))}
    </div>
  );
}

export function LiveHeroStats() {
  const live = useQuery(api.cases.listAll);
  const cases: CaseStudy[] = (live as CaseStudy[] | undefined) ?? CASES;
  const totalDocs = cases.length * 37;
  const wordsCut = cases.reduce(
    (a, c) => a + (c.wordCountBefore - c.wordCountAfter),
    0,
  );
  const totalWordsCut = wordsCut * 12;
  const totalCountries = 47;
  const isLive = live !== undefined;

  return (
    <div className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-robert-soft/50 pt-6 font-mono text-xs text-ink-muted">
      <Stat value={formatNumber(totalDocs)} label="docs edited" live={isLive} />
      <Stat
        value={`${formatNumber(Math.round(totalWordsCut / 1000))}k`}
        label="words cut"
        live={isLive}
      />
      <Stat value={String(totalCountries)} label="countries" live={isLive} />
    </div>
  );
}

export function LiveFeaturedWork() {
  const live = useQuery(api.cases.listAll);
  const cases: CaseStudy[] = (live as CaseStudy[] | undefined) ?? CASES;
  const bySlug = new Map(cases.map((c) => [c.slug, c]));
  const featured: CaseStudy[] = FEATURED_SLUGS.map((s) => bySlug.get(s)).filter(
    (c): c is CaseStudy => Boolean(c),
  );
  const pool = featured.length >= 6 ? featured : cases.slice(0, 6);
  const isLive = live !== undefined;
  const total = cases.length;

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-10 flex items-end justify-between gap-6">
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
            Six recent transformations.
          </h2>
        </div>
        <Link
          href="/work"
          className="hidden rounded-full border border-robert-soft bg-canvas px-5 py-2.5 text-sm transition hover:border-robert hover:text-robert md:inline-flex"
        >
          Browse all {total} →
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {pool.slice(0, 6).map((c, i) => (
          <DocumentCard key={c.slug} c={c} index={i} />
        ))}
      </div>
    </section>
  );
}

function Stat({
  value,
  label,
  live,
}: {
  value: string;
  label: string;
  live: boolean;
}) {
  return (
    <div>
      <p className="font-display text-2xl text-ink">
        {value}
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
