import Link from "next/link";
import { BeforeAfter } from "@/components/slider/BeforeAfter";
import { DocumentCard } from "@/components/card/DocumentCard";
import { CASES } from "@/lib/cases";
import { countryFlag, formatNumber } from "@/lib/utils";

const COUNTRIES = Array.from(new Set(CASES.map((c) => c.country)));

const FEATURED_SLUGS = [
  "berlin-thesis-quantum",
  "tokyo-product-launch-copy",
  "lagos-grant-health",
  "sao-paulo-novel-debut",
  "london-contract-saas",
  "paris-screenplay-feature",
];

export default function Home() {
  const featured = FEATURED_SLUGS.map((s) => CASES.find((c) => c.slug === s)!).filter(Boolean);
  const hero = CASES.find((c) => c.slug === "tokyo-product-launch-copy")!;

  const totalDocs = CASES.length * 37;
  const totalWordsCut = CASES.reduce((a, c) => a + (c.wordCountBefore - c.wordCountAfter), 0) * 12;
  const totalCountries = 47;

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
              <span className="inline-flex items-center gap-2 rounded-full border border-robert-soft bg-canvas px-3 py-1 text-xs font-medium text-robert shadow-card">
                <span className="h-1.5 w-1.5 animate-pulseDot rounded-full bg-robert" />
                Accepting drafts for Q3 — 2 slots
              </span>
              <h1 className="mt-6 font-display text-5xl leading-[1.02] text-ink md:text-7xl">
                Before I touch it,
                <br />
                it&apos;s a <span className="relative inline-block">
                  draft
                  <span className="absolute inset-x-0 -bottom-1 block h-[6px] origin-left animate-inkSweep rounded-full bg-robert" />
                </span>.
              </h1>
              <p className="mt-6 max-w-xl text-pretty text-lg text-ink-soft">
                I&apos;m Robert. I edit documents — academic, legal, creative,
                corporate — in <strong className="text-ink">{totalCountries} countries</strong> and{" "}
                <strong className="text-ink">11 languages</strong>. Pull the slider to see how.
              </p>
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
              <div className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-robert-soft/50 pt-6 font-mono text-xs text-ink-muted">
                <Stat value={formatNumber(totalDocs)} label="docs edited" />
                <Stat value={`${formatNumber(Math.round(totalWordsCut / 1000))}k`} label="words cut" />
                <Stat value={String(totalCountries)} label="countries" />
              </div>
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
            Edited in {totalCountries} countries
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-2xl">
            {COUNTRIES.map((iso) => (
              <span key={iso} title={iso} aria-hidden>
                {countryFlag(iso)}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED WORK */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-robert">
              Featured work
            </p>
            <h2 className="mt-2 font-display text-4xl md:text-5xl">Six recent transformations.</h2>
          </div>
          <Link
            href="/work"
            className="hidden rounded-full border border-robert-soft bg-canvas px-5 py-2.5 text-sm transition hover:border-robert hover:text-robert md:inline-flex"
          >
            Browse all 12 →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((c, i) => (
            <DocumentCard key={c.slug} c={c} index={i} />
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="border-y border-robert-soft/50 bg-snow py-24">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-robert">Process</p>
          <h2 className="mt-2 max-w-2xl font-display text-4xl md:text-5xl">
            Four steps. One promise: nothing gets <em>worse</em>.
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {[
              ["01", "Intake", "You send the draft, audience, deadline. I reply within 24 hours with a scope."],
              ["02", "Audit", "A page-one read with 3–5 structural notes before I touch a comma."],
              ["03", "Rewrite", "Line-by-line edits in tracked changes. You see every decision."],
              ["04", "Polish", "Proofread, spellcheck, a final read aloud. Then back to you, signed."],
            ].map(([num, title, body]) => (
              <div key={num} className="rounded-xl2 border border-robert-soft/60 bg-canvas p-6 shadow-card">
                <p className="font-mono text-sm text-robert">{num}</p>
                <h3 className="mt-3 font-display text-2xl">{title}</h3>
                <p className="mt-2 text-sm text-ink-soft">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-robert">Testimonials</p>
        <h2 className="mt-2 max-w-3xl font-display text-4xl md:text-5xl">
          &ldquo;He cut 10,000 words and kept every idea.&rdquo;
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            [
              "Robert gave my thesis a spine. My supervisor said it was the cleanest writing in the cohort.",
              "PhD candidate · TU Berlin",
            ],
            [
              "Reuters ran our release verbatim. That had never happened before.",
              "Gulf Climate Summit · Dubai",
            ],
            [
              "The contract went from 58 pages to 29 without losing a single enforceable clause.",
              "Meridian Legal · London",
            ],
          ].map(([quote, who]) => (
            <blockquote
              key={who}
              className="rounded-xl2 border border-robert-soft/60 bg-canvas p-8 shadow-card"
            >
              <p className="font-display text-xl italic leading-snug text-ink">&ldquo;{quote}&rdquo;</p>
              <footer className="mt-6 text-xs font-medium uppercase tracking-widest text-ink-muted">
                {who}
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-xl2 bg-ink p-12 text-center text-white md:p-20">
          <div
            aria-hidden
            className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-robert/40 blur-3xl"
          />
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-robert-soft">
            Your draft · next Monday
          </p>
          <h2 className="relative mt-4 font-display text-4xl md:text-6xl">
            Send me your worst paragraph.
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-white/70">
            I&apos;ll edit it for free so you can feel the difference before you hire me.
          </p>
          <Link
            href="/contact"
            className="relative mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-medium text-ink transition hover:bg-robert-soft"
          >
            Start the edit →
          </Link>
        </div>
      </section>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-display text-2xl text-ink">{value}</p>
      <p className="mt-1 uppercase tracking-widest">{label}</p>
    </div>
  );
}
