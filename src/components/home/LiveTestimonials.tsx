"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

const FALLBACK = [
  {
    quote:
      "Robert gave my thesis a spine. My supervisor said it was the cleanest writing in the cohort.",
    who: "PhD candidate · TU Berlin",
  },
  {
    quote: "Reuters ran our release verbatim. That had never happened before.",
    who: "Gulf Climate Summit · Dubai",
  },
  {
    quote:
      "The contract went from 58 pages to 29 without losing a single enforceable clause.",
    who: "Meridian Legal · London",
  },
];

export function LiveTestimonials() {
  const live = useQuery(api.testimonials.list);
  const rows = live && live.length > 0 ? live : FALLBACK;
  const isLive = live !== undefined && live.length > 0;

  const headline =
    isLive && rows[0]
      ? `“${truncate(rows[0].quote, 70)}”`
      : "“He cut 10,000 words and kept every idea.”";

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-robert">
        <span
          className={
            "h-1.5 w-1.5 rounded-full " +
            (isLive ? "animate-pulseDot bg-robert" : "bg-ink-muted")
          }
          title={isLive ? "Live from Convex" : "Static fallback"}
        />
        Testimonials
      </p>
      <h2 className="mt-2 max-w-3xl font-display text-4xl md:text-5xl">
        &ldquo;{headline.replace(/^“|”$/g, "")}&rdquo;
      </h2>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {rows.slice(0, 6).map((t, i) => (
          <blockquote
            key={("id" in t ? t.id : i) + t.who}
            className="rounded-xl2 border border-robert-soft/60 bg-canvas p-8 shadow-card"
          >
            <p className="font-display text-xl italic leading-snug text-ink">
              &ldquo;{t.quote}&rdquo;
            </p>
            <footer className="mt-6 text-xs font-medium uppercase tracking-widest text-ink-muted">
              {t.who}
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}

function truncate(s: string, max: number) {
  if (s.length <= max) return s;
  return s.slice(0, max - 1).trimEnd() + "…";
}
