"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

const COMMON_ITEMS = [
  "Correcting misspelled names",
  "Changing date of birth / date of issue",
  "Changing place (location, sub-county, ward)",
  "Updating parents' or spouse's details",
  "Name others",
];

const FALLBACK = [
  {
    slug: "birth-certificate",
    icon: "🧾",
    name: "Birth Certificate",
    price: "",
    body: "Editing and retouching of birth-certificate details — we clean up mistakes on your existing certificate so it reads exactly how it should.",
    items: COMMON_ITEMS,
  },
  {
    slug: "marriage-certificate",
    icon: "💍",
    name: "Marriage Certificate",
    price: "",
    body: "Editing and retouching of marriage-certificate details — names, dates, places and witness lines corrected on your existing certificate.",
    items: COMMON_ITEMS,
  },
  {
    slug: "kcpe-kcse",
    icon: "🎓",
    name: "KCPE & KCSE Certificates",
    price: "",
    body: "Editing and retouching of KCPE / KCSE certificate details — corrections to name spellings, index numbers and other particulars.",
    items: COMMON_ITEMS,
  },
  {
    slug: "travel-document",
    icon: "🛂",
    name: "Travel Documents",
    price: "",
    body: "Editing and retouching of passport and travel-document details — name, date-of-birth and place-of-issue fixes on your existing document.",
    items: COMMON_ITEMS,
  },
  {
    slug: "degree-diploma-craft",
    icon: "📜",
    name: "Degree, Diploma & Craft Certificates",
    price: "",
    body: "Editing and retouching of degree, diploma and craft certificate details — names, dates and particulars cleaned up on your existing certificate.",
    items: COMMON_ITEMS,
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
        {numberWord(count)} {count === 1 ? "document" : "documents"} we edit and retouch.
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-ink-soft">
        We only edit the information on your existing certificate — names, dates, places
        and other details. Send a clear scan, I clean it up so it reads exactly as it should.
        No applications, no replacements, no government submissions — pure editing and
        retouching work.
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
        <h3 className="font-display text-3xl md:text-4xl">Not sure what&apos;s fixable?</h3>
        <p className="mt-3 max-w-2xl text-white/70">
          Share a clear scan of your certificate and point out what needs editing. I&apos;ll
          tell you — honestly — whether the detail can be cleanly edited and retouched on
          the scan or not.
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
