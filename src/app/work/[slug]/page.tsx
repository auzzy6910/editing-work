import Link from "next/link";
import { notFound } from "next/navigation";
import { CASES } from "@/lib/cases";
import { DOCUMENT_TYPES } from "@/lib/types";
import { BeforeAfter } from "@/components/slider/BeforeAfter";
import { AnimatedDiff } from "@/components/diff/AnimatedDiff";
import { countryFlag, formatNumber } from "@/lib/utils";

export function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const c = CASES.find((x) => x.slug === params.slug);
  if (!c) return { title: "Not found" };
  return { title: `${c.title} — Robert Editing`, description: c.editorsNote };
}

export default function CasePage({ params }: { params: { slug: string } }) {
  const c = CASES.find((x) => x.slug === params.slug);
  if (!c) notFound();
  const idx = CASES.findIndex((x) => x.slug === c.slug);
  const next = CASES[(idx + 1) % CASES.length];
  const docType = DOCUMENT_TYPES.find((d) => d.id === c.documentType);

  const wordsCut = c.wordCountBefore - c.wordCountAfter;
  const wordsCutPct = Math.round((wordsCut / c.wordCountBefore) * 100);
  const readGain = c.readabilityAfter - c.readabilityBefore;

  return (
    <article className="mx-auto max-w-6xl px-6 py-16">
      <Link href="/work" className="text-xs font-medium text-robert hover:underline">
        ← All work
      </Link>

      <header className="mt-6 grid gap-8 md:grid-cols-[1.4fr_1fr]">
        <div>
          <div className="flex items-center gap-2 text-xs text-ink-muted">
            <span aria-hidden>{docType?.icon}</span>
            <span>{docType?.label}</span>
            <span className="text-robert-soft">•</span>
            <span className="capitalize">{c.editingLevel.replace("-", " ")}</span>
            <span className="text-robert-soft">•</span>
            <span>{new Date(c.date).toLocaleDateString("en-US", { year: "numeric", month: "long" })}</span>
          </div>
          <h1 className="mt-3 font-display text-4xl leading-tight md:text-6xl">{c.title}</h1>
          <p className="mt-4 text-lg text-ink-soft">
            {c.client} · <span aria-hidden>{countryFlag(c.country)}</span> {c.countryName}
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

      {/* Split before / after */}
      <section className="mt-12">
        <BeforeAfter before={c.excerptBefore} after={c.excerptAfter} title={c.title} />
      </section>

      {/* Animated diff */}
      <section className="mt-12 grid gap-10 md:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-robert">Editor&apos;s note</p>
          <h2 className="mt-2 font-display text-3xl">Why this edit.</h2>
          <p className="mt-4 text-ink-soft">{c.editorsNote}</p>
          <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-robert-soft/50 pt-6 text-sm">
            <Row term="Words cut" value={`−${formatNumber(wordsCut)} (${wordsCutPct}%)`} />
            <Row term="Readability gain" value={`+${readGain} Flesch`} />
            <Row term="Language" value={c.languageName} />
            <Row term="Industry" value={<span className="capitalize">{c.industry}</span>} />
            <Row term="Turnaround" value={`${Math.round(c.turnaroundHours / 24)} days`} />
            <Row term="Rating" value={"★".repeat(c.rating)} />
          </dl>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-robert">Diff view</p>
          <h2 className="mt-2 font-display text-3xl">Red cut, blue kept.</h2>
          <p className="mt-2 mb-5 text-sm text-ink-soft">Scroll to animate.</p>
          <AnimatedDiff before={c.excerptBefore} after={c.excerptAfter} />
        </div>
      </section>

      {/* Tags */}
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

      {/* Next */}
      <Link
        href={`/work/${next.slug}`}
        className="mt-16 flex items-center justify-between gap-6 rounded-xl2 border border-robert-soft/60 bg-canvas p-8 shadow-card transition hover:-translate-y-1 hover:shadow-cardHover"
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
      <dd className="mt-1 font-mono text-sm text-ink">{value}</dd>
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
  const readPct = Math.min(100, Math.max(0, readAfter));
  return (
    <div className="rounded-xl2 border border-robert-soft/60 bg-canvas p-6 shadow-card">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-robert">Metrics</p>
      <div className="mt-4 flex items-center gap-5">
        <ReadabilityDial from={readBefore} to={readAfter} />
        <div className="text-sm">
          <p className="font-display text-3xl text-ink">{readAfter}</p>
          <p className="text-ink-muted">Flesch score</p>
          <p className="mt-1 font-mono text-xs text-robert">
            +{readAfter - readBefore} from {readBefore}
          </p>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-3 border-t border-robert-soft/50 pt-4 text-xs">
        <div>
          <p className="text-ink-muted">Before</p>
          <p className="mt-1 font-mono text-sm">{formatNumber(before)}w</p>
        </div>
        <div>
          <p className="text-ink-muted">After</p>
          <p className="mt-1 font-mono text-sm text-robert">{formatNumber(after)}w</p>
        </div>
        <div>
          <p className="text-ink-muted">Turnaround</p>
          <p className="mt-1 font-mono text-sm">{Math.round(turnaround / 24)}d</p>
        </div>
      </div>
      <span className="sr-only">Readability went from {readBefore} to {readPct}.</span>
    </div>
  );
}

function ReadabilityDial({ from, to }: { from: number; to: number }) {
  const r = 34;
  const c = 2 * Math.PI * r;
  const pctTo = Math.min(100, Math.max(0, to));
  const pctFrom = Math.min(100, Math.max(0, from));
  const offTo = c * (1 - pctTo / 100);
  const offFrom = c * (1 - pctFrom / 100);
  return (
    <svg viewBox="0 0 80 80" width={80} height={80} className="shrink-0 -rotate-90">
      <circle cx="40" cy="40" r={r} stroke="#EEF4FF" strokeWidth="8" fill="none" />
      <circle
        cx="40"
        cy="40"
        r={r}
        stroke="#0A1F44"
        strokeOpacity="0.25"
        strokeWidth="8"
        fill="none"
        strokeDasharray={c}
        strokeDashoffset={offFrom}
        strokeLinecap="round"
      />
      <circle
        cx="40"
        cy="40"
        r={r}
        stroke="#1E6BFF"
        strokeWidth="8"
        fill="none"
        strokeDasharray={c}
        strokeDashoffset={offTo}
        strokeLinecap="round"
      />
    </svg>
  );
}
