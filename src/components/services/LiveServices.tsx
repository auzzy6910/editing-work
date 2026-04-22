"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

const FALLBACK = [
  {
    slug: "birth-certificate",
    icon: "🧾",
    name: "Birth Certificate",
    price: "from KES 3,500",
    body: "New applications, corrections and replacements via Sheria House.",
    items: ["New registrations", "Corrections", "Lost-copy replacements"],
  },
];

export function LiveServices() {
  const live = useQuery(api.services.list);
  const rows = live && live.length > 0 ? live : FALLBACK;
  const isLive = live !== undefined && live.length > 0;
  const count = rows.length;

  return (
    <div className="mx-auto max-w-7xl px-6 py-24">
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-robert">
        <span
          className={
            "h-1.5 w-1.5 rounded-full " +
            (isLive ? "animate-pulseDot bg-robert" : "bg-ink-muted")
          }
          title={isLive ? "Live from Convex" : "Static fallback"}
        />
        Services
      </p>
      <h1 className="mt-2 max-w-3xl font-display text-5xl md:text-7xl leading-[1.05]">
        {numberWord(count)} {count === 1 ? "document" : "documents"} I handle, end to end.
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-ink-soft">
        Every case starts with a free consultation — I tell you honestly what it will take,
        what it will cost at the cashier, and how soon it can be ready.
      </p>

      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {rows.map((s) => (
          <div
            key={("id" in s ? s.id : s.slug) + s.name}
            className="flex flex-col rounded-xl2 border border-robert-soft/60 bg-canvas p-6 shadow-card"
          >
            <div className="text-3xl" aria-hidden>
              {s.icon}
            </div>
            <h2 className="mt-4 font-display text-2xl">{s.name}</h2>
            <p className="mt-1 font-mono text-xs text-robert">{s.price}</p>
            <p className="mt-3 text-sm text-ink-soft">{s.body}</p>
            <ul className="mt-4 space-y-1 text-sm text-ink-soft">
              {s.items.map((it: string) => (
                <li key={it} className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-robert" />
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-xl2 bg-ink p-10 text-white md:p-14">
        <h3 className="font-display text-3xl md:text-4xl">Not sure what you need?</h3>
        <p className="mt-3 max-w-2xl text-white/70">
          Share the certificate and the issue. I&apos;ll tell you — honestly — whether you can
          do it yourself on eCitizen or whether it&apos;s worth hiring me.
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-medium text-ink transition hover:bg-robert-soft"
        >
          Ask a question →
        </Link>
      </div>
    </div>
  );
}

function numberWord(n: number) {
  const words = [
    "Zero",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
  ];
  return words[n] ?? String(n);
}
