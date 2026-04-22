"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { CASES } from "@/lib/cases";
import { countryFlag } from "@/lib/utils";
import type { CaseStudy } from "@/lib/types";

export function LiveCountries() {
  const live = useQuery(api.cases.listAll);
  const cases: CaseStudy[] = (live as CaseStudy[] | undefined) ?? CASES;
  const isLive = live !== undefined;
  const unique = Array.from(new Set(cases.map((c) => c.country))).sort();

  return (
    <>
      <div className="mt-3 grid grid-cols-6 gap-3 text-3xl sm:grid-cols-12">
        {unique.map((iso) => (
          <span key={iso} title={iso} aria-hidden>
            {countryFlag(iso)}
          </span>
        ))}
      </div>
      <p className="mt-4 text-sm text-ink-muted">
        <span
          className={
            "mr-1.5 inline-block h-1.5 w-1.5 translate-y-[-2px] rounded-full align-middle " +
            (isLive ? "animate-pulseDot bg-robert" : "bg-ink-muted")
          }
        />
        {isLive ? `${unique.length} countries from Convex` : "Loading countries…"}. Plus
        dozens more not pictured.
      </p>
    </>
  );
}
