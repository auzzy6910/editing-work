"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

const FALLBACK = [
  {
    number: "01",
    title: "Intake",
    body: "You send the draft, audience, deadline. I reply within 24 hours with a scope.",
  },
  {
    number: "02",
    title: "Audit",
    body: "A page-one read with 3–5 structural notes before I touch a comma.",
  },
  {
    number: "03",
    title: "Rewrite",
    body: "Line-by-line edits in tracked changes. You see every decision.",
  },
  {
    number: "04",
    title: "Polish",
    body: "Proofread, spellcheck, a final read aloud. Then back to you, signed.",
  },
];

export function LiveProcess() {
  const live = useQuery(api.processSteps.list);
  const rows = live && live.length > 0 ? live : FALLBACK;

  return (
    <section className="border-y border-robert-soft/50 bg-snow py-24">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-robert">
          Process
        </p>
        <h2 className="mt-2 max-w-2xl font-display text-4xl md:text-5xl">
          {rows.length} steps. One promise: nothing gets <em>worse</em>.
        </h2>
        <div
          className="mt-12 grid gap-6"
          style={{
            gridTemplateColumns: `repeat(${Math.min(Math.max(rows.length, 1), 4)}, minmax(0, 1fr))`,
          }}
        >
          {rows.map((s) => (
            <div
              key={("id" in s ? s.id : s.number) + s.title}
              className="rounded-xl2 border border-robert-soft/60 bg-canvas p-6 shadow-card"
            >
              <p className="font-mono text-sm text-robert">{s.number}</p>
              <h3 className="mt-3 font-display text-2xl">{s.title}</h3>
              <p className="mt-2 text-sm text-ink-soft">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
