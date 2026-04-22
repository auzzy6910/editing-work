"use client";

import { useQuery } from "convex/react";
import { AnimatePresence, motion } from "framer-motion";
import { api } from "../../../convex/_generated/api";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Skeleton, SkeletonText } from "@/components/ui/Skeleton";

const FALLBACK = [
  {
    id: "f1",
    quote:
      "Robert gave my thesis a spine. My supervisor said it was the cleanest writing in the cohort.",
    who: "PhD candidate · TU Berlin",
  },
  {
    id: "f2",
    quote: "Reuters ran our release verbatim. That had never happened before.",
    who: "Gulf Climate Summit · Dubai",
  },
  {
    id: "f3",
    quote:
      "The contract went from 58 pages to 29 without losing a single enforceable clause.",
    who: "Meridian Legal · London",
  },
];

export function LiveTestimonials() {
  const live = useQuery(api.testimonials.list);
  const loading = live === undefined;
  const rows = (live && live.length > 0 ? live : FALLBACK) as {
    id: string;
    quote: string;
    who: string;
  }[];
  const isLive = live !== undefined && live.length > 0;

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <Reveal>
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
          &ldquo;He cut 10,000 words and kept every idea.&rdquo;
        </h2>
      </Reveal>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-10 grid gap-6 md:grid-cols-3"
          >
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl2 border border-robert-soft/60 bg-canvas p-8 shadow-card"
              >
                <SkeletonText lines={4} />
                <Skeleton className="mt-6 h-3 w-1/2" />
              </div>
            ))}
          </motion.div>
        ) : (
          <Stagger
            key="rows"
            className="mt-10 grid gap-6 md:grid-cols-3"
          >
            {rows.slice(0, 6).map((t) => (
              <StaggerItem key={t.id} as="article">
                <motion.blockquote
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="h-full rounded-xl2 border border-robert-soft/60 bg-canvas p-8 shadow-card"
                >
                  <p className="font-display text-xl italic leading-snug text-ink">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <footer className="mt-6 text-xs font-medium uppercase tracking-widest text-ink-muted">
                    {t.who}
                  </footer>
                </motion.blockquote>
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </AnimatePresence>
    </section>
  );
}
