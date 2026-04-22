"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export function LiveCTA() {
  const settings = useQuery(api.settings.all);
  const kicker = settings?.["cta.kicker"] ?? "Your draft · next Monday";
  const title = settings?.["cta.title"] ?? "Send me your worst paragraph.";
  const body =
    settings?.["cta.body"] ??
    "I'll edit it for free so you can feel the difference before you hire me.";
  const button = settings?.["cta.button"] ?? "Start the edit →";

  return (
    <section className="mx-auto max-w-7xl px-6 pb-24">
      <div className="relative overflow-hidden rounded-xl2 bg-ink p-12 text-center text-white md:p-20">
        <div
          aria-hidden
          className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-robert/40 blur-3xl"
        />
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-robert-soft">
          {kicker}
        </p>
        <h2 className="relative mt-4 font-display text-4xl md:text-6xl">{title}</h2>
        <p className="relative mx-auto mt-4 max-w-xl text-white/70">{body}</p>
        <Link
          href="/contact"
          className="relative mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-medium text-ink transition hover:bg-robert-soft"
        >
          {button}
        </Link>
      </div>
    </section>
  );
}
