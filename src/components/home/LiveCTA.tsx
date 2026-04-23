"use client";

import { useQuery } from "convex/react";
import { motion } from "framer-motion";
import { api } from "../../../convex/_generated/api";
import { Reveal } from "@/components/ui/Reveal";
import { WHATSAPP_BOOK_URL } from "@/lib/utils";

export function LiveCTA() {
  const settings = useQuery(api.settings.all);
  const kicker = settings?.["cta.kicker"] ?? "Your file · next week";
  const title = settings?.["cta.title"] ?? "Tell me what you need.";
  const body =
    settings?.["cta.body"] ??
    "Share a short note with the certificate, the issue, and your deadline. I'll quote a clear fee and a realistic timeline the same day.";
  const button = settings?.["cta.button"] ?? "Book editing →";

  return (
    <section className="mx-auto max-w-7xl px-6 pb-24">
      <Reveal direction="up">
        <div className="relative overflow-hidden rounded-xl2 bg-ink p-12 text-center text-white md:p-20">
          <motion.div
            aria-hidden
            className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-robert/40 blur-3xl"
            animate={{ x: [0, 15, 0], y: [0, -10, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-robert/30 blur-3xl"
            animate={{ x: [0, -15, 0], y: [0, 10, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
          <p className="relative text-xs font-semibold uppercase tracking-[0.25em] text-robert-soft">
            {kicker}
          </p>
          <h2 className="relative mt-4 font-display text-4xl md:text-6xl">{title}</h2>
          <p className="relative mx-auto mt-4 max-w-xl text-white/70">{body}</p>
          <a
            href={WHATSAPP_BOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="relative mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-medium text-ink shadow-card transition duration-300 hover:-translate-y-0.5 hover:bg-robert-soft"
          >
            {button}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
