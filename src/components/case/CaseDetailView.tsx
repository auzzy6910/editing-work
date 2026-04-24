"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { DOCUMENT_TYPES, type CaseStudy } from "@/lib/types";
import { BeforeAfter } from "@/components/slider/BeforeAfter";
import { AnimatedDiff } from "@/components/diff/AnimatedDiff";
import { countryFlag } from "@/lib/utils";

export function CaseDetailView({
  initial,
  initialNext,
}: {
  initial: CaseStudy;
  initialNext: CaseStudy;
}) {
  const liveAll = useQuery(api.cases.listAll);
  const allCases: CaseStudy[] =
    (liveAll as CaseStudy[] | undefined) ?? [initial, initialNext];
  const c: CaseStudy = allCases.find((x) => x.slug === initial.slug) ?? initial;
  const idx = allCases.findIndex((x) => x.slug === c.slug);
  const next: CaseStudy =
    idx >= 0 && allCases.length > 1
      ? allCases[(idx + 1) % allCases.length]
      : initialNext;
  const isLive = liveAll !== undefined;

  const docType = DOCUMENT_TYPES.find((d) => d.id === c.documentType);
  const readGain = c.readabilityAfter - c.readabilityBefore;

  return (
    <article className="mx-auto max-w-6xl px-6 py-16">
      <div className="flex items-center justify-between">
        <Link href="/work" className="text-xs font-medium text-robert hover:underline">
          ← All work
        </Link>
        <span
          className="flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-ink-muted"
          title={isLive ? "Reactive to Convex edits" : "Loading live version from Convex…"}
        >
          <span
            className={
              "h-1.5 w-1.5 rounded-full " +
              (isLive ? "animate-pulseDot bg-robert" : "bg-ink-muted")
            }
          />
          {isLive ? "Live" : "Pre-rendered"}
        </span>
      </div>

      <header className="mt-6 grid gap-8 md:grid-cols-[1.4fr_1fr]">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-ink-muted">
            <span aria-hidden>{docType?.icon}</span>
            <span>{docType?.label}</span>
            <span className="text-robert-soft">•</span>
            <span className="capitalize">{c.editingLevel.replace("-", " ")}</span>
            <span className="hidden text-robert-soft sm:inline">•</span>
            <span className="hidden sm:inline">
              {new Date(c.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
              })}
            </span>
          </div>
          <h1 className="mt-3 font-display text-2xl leading-tight sm:text-4xl md:text-6xl">
            {c.title}
          </h1>
          <p className="mt-4 text-lg text-ink-soft">
            {c.client} ·{" "}
            <span aria-hidden>{countryFlag(c.country)}</span> {c.countryName}
          </p>
        </div>
        <MetricsPanel
          before={c.wordCountBefore}
          after={c.wordCountAfter}
          readBefore={c.readabilityBefore}
          readAfter={c.readabilityAfter}
          turnaround={c.turnaroundHours}
        />
      </header>

      {c.excerptBefore && c.excerptAfter && (
        <section className="mt-12">
          <BeforeAfter before={c.excerptBefore} after={c.excerptAfter} title={c.title} />
        </section>
      )}

      <section className="mt-12 grid gap-10 md:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-robert">
            Editor&apos;s note
          </p>
          <h2 className="mt-2 font-display text-3xl">Why this edit.</h2>
          <p className="mt-4 text-ink-soft">{c.editorsNote}</p>
          <dl className="mt-6 grid grid-cols-1 gap-4 border-t border-robert-soft/50 pt-6 text-sm sm:grid-cols-2">
            <Row term="Turnaround" value={`${Math.round(c.turnaroundHours / 24)} days`} />
            <Row
              term="Accuracy"
              value={readGain > 0 ? `+${readGain}% on original` : "Fully resolved"}
            />
            <Row term="Language" value={c.languageName} />
            <Row
              term="Family"
              value={<span className="capitalize">{c.industry.replace(/-/g, " ")}</span>}
            />
            <Row
              term="Edit"
              value={<span className="capitalize">{c.editingLevel.replace(/-/g, " ")}</span>}
            />
            <Row term="Rating" value={"★".repeat(c.rating)} />
          </dl>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-robert">
            Before / after
          </p>
          <h2 className="mt-2 font-display text-3xl">Red fixed, blue kept.</h2>
          <p className="mt-2 mb-5 text-sm text-ink-soft">Scroll to animate.</p>
          <AnimatedDiff
            key={`${c.slug}:${c.excerptAfter.length}`}
            before={c.excerptBefore}
            after={c.excerptAfter}
          />
        </div>
      </section>

      <div className="mt-12 flex flex-wrap gap-2">
        {c.tags.map((t) => (
          <span
            key={t}
            className="rounded-full border border-robert-soft bg-robert-ghost px-3 py-1 text-xs text-robert"
          >
            #{t}
          </span>
        ))}
      </div>

      <Link
        href={`/work/${next.slug}`}
        className="mt-16 flex flex-col items-start gap-4 rounded-xl2 border border-robert-soft/60 bg-canvas p-6 shadow-card transition hover:-translate-y-1 hover:shadow-cardHover sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-8"
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-robert">
            Next case
          </p>
          <p className="mt-2 font-display text-2xl">{next.title}</p>
          <p className="mt-1 text-sm text-ink-soft">
            {next.client} · {next.countryName}
          </p>
        </div>
        <span className="text-robert">→</span>
      </Link>
    </article>
  );
}

function Row({ term, value }: { term: string; value: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-widest text-ink-muted">{term}</dt>
      <dd className="mt-1 font-medium text-ink">{value}</dd>
    </div>
  );
}

function MetricsPanel({
  before,
  after,
  readBefore,
  readAfter,
  turnaround,
}: {
  before: number;
  after: number;
  readBefore: number;
  readAfter: number;
  turnaround: number;
}) {
  const cut = before - after;
  return (
    <div className="rounded-xl2 border border-robert-soft/60 bg-canvas p-6 shadow-card">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-robert">
        Outcome
      </p>
      <div className="mt-4 flex flex-col items-center gap-6 sm:flex-row">
        <ReadabilityDial before={readBefore} after={readAfter} />
        <div className="w-full flex-1">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-xs uppercase tracking-widest text-ink-muted">Turnaround</p>
              <p className="mt-1 font-mono text-2xl text-ink">{Math.round(turnaround / 24)}d</p>
              <p className="text-xs text-ink-muted">working days</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-robert">Accuracy</p>
              <p className="mt-1 font-mono text-2xl text-robert">{readAfter}%</p>
              <p className="text-xs text-ink-muted">on delivery</p>
            </div>
          </div>
          <p className="mt-3 text-xs text-edit">
            {cut > 0 ? `${cut} detail(s) corrected` : "Document obtained & delivered"}
          </p>
        </div>
      </div>
    </div>
  );
}

function ReadabilityDial({ before, after }: { before: number; after: number }) {
  const r = 42;
  const c = 2 * Math.PI * r;
  const beforePct = Math.max(0, Math.min(100, before));
  const afterPct = Math.max(0, Math.min(100, after));
  return (
    <svg width={120} height={120} viewBox="0 0 120 120" aria-hidden>
      <circle cx={60} cy={60} r={r} fill="none" stroke="#EEF3FB" strokeWidth={10} />
      <circle
        cx={60}
        cy={60}
        r={r}
        fill="none"
        stroke="#0A1F44"
        strokeOpacity={0.25}
        strokeWidth={10}
        strokeDasharray={c}
        strokeDashoffset={c - (c * beforePct) / 100}
        transform="rotate(-90 60 60)"
        strokeLinecap="round"
      />
      <circle
        cx={60}
        cy={60}
        r={r}
        fill="none"
        stroke="#1E6BFF"
        strokeWidth={10}
        strokeDasharray={c}
        strokeDashoffset={c - (c * afterPct) / 100}
        transform="rotate(-90 60 60)"
        strokeLinecap="round"
      />
      <text
        x={60}
        y={57}
        textAnchor="middle"
        className="font-display"
        fontSize={22}
        fill="#0A1F44"
      >
        {after}
      </text>
      <text
        x={60}
        y={76}
        textAnchor="middle"
        fontSize={10}
        fill="#6B7A97"
      >
        read.
      </text>
    </svg>
  );
}
