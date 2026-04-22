"use client";

import { useQuery } from "convex/react";
import { AnimatePresence, motion } from "framer-motion";
import { api } from "../../../convex/_generated/api";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Skeleton, SkeletonText } from "@/components/ui/Skeleton";

const FALLBACK = [
  {
    id: "f1",
    number: "01",
    title: "Intake",
    body: "You send the draft, audience, deadline. I reply within 24 hours with a scope.",
  },
  {
    id: "f2",
    number: "02",
    title: "Audit",
    body: "A page-one read with 3–5 structural notes before I touch a comma.",
  },
  {
    id: "f3",
    number: "03",
    title: "Rewrite",
    body: "Line-by-line edits in tracked changes. You see every decision.",
  },
  {
    id: "f4",
    number: "04",
    title: "Polish",
    body: "Proofread, spellcheck, a final read aloud. Then back to you, signed.",
  },
];

export function LiveProcess() {
  const live = useQuery(api.processSteps.list);
  const loading = live === undefined;
  const rows = (live && live.length > 0 ? live : FALLBACK) as {
    id: string;
    number: string;
    title: string;
    body: string;
  }[];

  return (
    <section className="border-y border-robert-soft/50 bg-snow py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-robert">
            Process
          </p>
          <h2 className="mt-2 max-w-2xl font-display text-4xl md:text-5xl">
            {rows.length} steps. One promise: nothing gets <em>worse</em>.
          </h2>
        </Reveal>
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-12 grid gap-6 md:grid-cols-4"
            >
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-xl2 border border-robert-soft/60 bg-canvas p-6 shadow-card"
                >
                  <Skeleton className="h-3 w-8" />
                  <Skeleton className="mt-3 h-6 w-24" />
                  <SkeletonText className="mt-3" lines={2} />
                </div>
              ))}
            </motion.div>
          ) : (
            <Stagger
              key="rows"
              className="mt-12 grid gap-6"
              gap={0.06}
            >
              <div
                className="grid gap-6"
                style={{
                  gridTemplateColumns: `repeat(${Math.min(Math.max(rows.length, 1), 4)}, minmax(0, 1fr))`,
                }}
              >
                {rows.map((s) => (
                  <StaggerItem key={s.id}>
                    <motion.div
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.3 }}
                      className="rounded-xl2 border border-robert-soft/60 bg-canvas p-6 shadow-card"
                    >
                      <p className="font-mono text-sm text-robert">{s.number}</p>
                      <h3 className="mt-3 font-display text-2xl">{s.title}</h3>
                      <p className="mt-2 text-sm text-ink-soft">{s.body}</p>
                    </motion.div>
                  </StaggerItem>
                ))}
              </div>
            </Stagger>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
