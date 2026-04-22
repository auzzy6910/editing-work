"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export function LiveHeroBadge() {
  const s = useQuery(api.settings.all);
  const text = s?.["hero.badge"] ?? "Taking new edits this month — Nairobi & Kenya-wide";
  const open =
    s?.["hero.slotsOpen"] === undefined ? true : s["hero.slotsOpen"] === "true";
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-robert-soft bg-canvas px-3 py-1 text-xs font-medium text-robert shadow-card">
      <span
        className={
          "h-1.5 w-1.5 rounded-full " +
          (open ? "animate-pulseDot bg-robert" : "bg-ink-muted")
        }
      />
      {text}
    </span>
  );
}

export function LiveHeroIntro() {
  const s = useQuery(api.settings.all);
  const intro =
    s?.["hero.intro"] ??
    "I'm Robert. I edit and retouch the details on your existing Kenyan documents — birth, marriage, KCPE / KCSE, passports, and degree / diploma / craft certificates. Pull the slider to see a real edit.";
  return (
    <p className="mt-6 max-w-xl text-pretty text-lg text-ink-soft">{intro}</p>
  );
}
