"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import type { Id } from "../../../../convex/_generated/dataModel";
import Link from "next/link";
import { countryFlag } from "@/lib/utils";

type Row = {
  id: Id<"cases">;
  slug: string;
  title: string;
  client: string;
  country: string;
  countryName: string;
  language: string;
  languageName: string;
  documentType: string;
  industry: string;
  editingLevel: string;
  wordCountBefore: number;
  wordCountAfter: number;
  readabilityBefore: number;
  readabilityAfter: number;
  turnaroundHours: number;
  date: string;
  excerptBefore: string;
  excerptAfter: string;
  editorsNote: string;
  tags: string[];
  rating: number;
};

export function CasesTab({ token }: { token: string }) {
  const rows = useQuery(api.cases.listForAdmin, { token }) as Row[] | undefined;
  const remove = useMutation(api.cases.remove);

  if (!rows) return <p className="text-sm text-ink-muted">Loading…</p>;

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-display text-xl">
          Cases <span className="text-ink-muted">({rows.length})</span>
        </h3>
        <p className="text-xs text-ink-muted">
          Adding / deep-editing cases happens in the Convex dashboard (rich data
          with 20+ fields). Use the buttons below for quick actions.
        </p>
      </div>
      <ul className="mt-4 space-y-2">
        {rows.map((r) => {
          const wordsCut = r.wordCountBefore - r.wordCountAfter;
          return (
            <li
              key={r.id}
              className="flex flex-wrap items-center gap-4 rounded-xl2 border border-robert-soft/60 bg-canvas p-4 shadow-card"
            >
              <span className="text-2xl" aria-hidden>
                {countryFlag(r.country)}
              </span>
              <div className="min-w-[200px] flex-1">
                <Link
                  href={`/work/${r.slug}`}
                  className="font-display text-lg hover:underline"
                >
                  {r.title}
                </Link>
                <p className="mt-0.5 text-xs text-ink-muted">
                  {r.client} · {r.documentType} · {r.editingLevel}
                </p>
              </div>
              <div className="text-right text-xs text-ink-muted">
                <p>−{wordsCut.toLocaleString()} words</p>
                <p>+{r.readabilityAfter - r.readabilityBefore} readability</p>
              </div>
              <div className="flex gap-2">
                <a
                  href={`https://dashboard.convex.dev/d/precise-reindeer-603/data?table=cases&filterJson=${encodeURIComponent(
                    JSON.stringify({
                      clauses: [
                        {
                          op: "eq",
                          field: "slug",
                          value: { type: "value", value: r.slug },
                        },
                      ],
                    }),
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-robert-soft px-3 py-1 text-xs transition hover:border-robert hover:text-robert"
                >
                  Edit in Convex ↗
                </a>
                <button
                  onClick={async () => {
                    if (
                      !confirm(
                        `Delete case "${r.title}"? This removes it from the live site immediately.`,
                      )
                    )
                      return;
                    await remove({ token, id: r.id });
                  }}
                  className="rounded-full border border-edit/40 px-3 py-1 text-xs text-edit transition hover:bg-edit hover:text-white"
                >
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
