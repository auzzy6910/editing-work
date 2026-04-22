"use client";

import { useMemo, useState } from "react";
import { CASES } from "@/lib/cases";
import {
  DOCUMENT_TYPES,
  EDITING_LEVELS,
  INDUSTRIES,
  type CaseStudy,
  type DocumentType,
  type EditingLevel,
  type Industry,
} from "@/lib/types";
import { cn, countryFlag, formatNumber } from "@/lib/utils";
import { DocumentCard } from "@/components/card/DocumentCard";

type SortKey = "recent" | "biggest" | "highest" | "longest";

interface FilterState {
  q: string;
  countries: string[];
  types: DocumentType[];
  languages: string[];
  industries: Industry[];
  levels: EditingLevel[];
  turnarounds: string[];
  minWords: number;
  maxWords: number;
  year: number | "any";
  metricReadability: boolean;
  metricWordCut: boolean;
  sort: SortKey;
}

const INITIAL: FilterState = {
  q: "",
  countries: [],
  types: [],
  languages: [],
  industries: [],
  levels: [],
  turnarounds: [],
  minWords: 0,
  maxWords: 150_000,
  year: "any",
  metricReadability: false,
  metricWordCut: false,
  sort: "recent",
};

const TURNAROUNDS = [
  { id: "24", label: "24h", max: 24 },
  { id: "72", label: "3-day", max: 72 },
  { id: "168", label: "1-week", max: 168 },
  { id: "custom", label: "Custom", max: Infinity },
];

export function FilterConsole() {
  const [f, setF] = useState<FilterState>(INITIAL);

  const countries = useMemo(() => {
    const map = new Map<string, { iso: string; name: string; count: number }>();
    for (const c of CASES) {
      const cur = map.get(c.country);
      if (cur) cur.count++;
      else map.set(c.country, { iso: c.country, name: c.countryName, count: 1 });
    }
    return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const languages = useMemo(() => {
    const map = new Map<string, { iso: string; name: string; count: number }>();
    for (const c of CASES) {
      const cur = map.get(c.language);
      if (cur) cur.count++;
      else map.set(c.language, { iso: c.language, name: c.languageName, count: 1 });
    }
    return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const filtered = useMemo(() => filterCases(CASES, f), [f]);

  function toggle<T>(key: keyof FilterState, value: T) {
    setF((prev) => {
      const arr = prev[key] as unknown as T[];
      const next = arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
      return { ...prev, [key]: next } as FilterState;
    });
  }

  const hasActive =
    f.q !== "" ||
    f.countries.length +
      f.types.length +
      f.languages.length +
      f.industries.length +
      f.levels.length +
      f.turnarounds.length >
      0 ||
    f.minWords > 0 ||
    f.maxWords < 150_000 ||
    f.year !== "any" ||
    f.metricReadability ||
    f.metricWordCut;

  return (
    <div className="grid gap-10 lg:grid-cols-[320px_1fr]">
      {/* Side Panel */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-xl2 border border-robert-soft/60 bg-canvas p-6 shadow-card">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg">Filter console</h2>
            <span className="rounded-full bg-robert-ghost px-2.5 py-1 text-xs font-medium text-robert">
              {filtered.length} docs
            </span>
          </div>

          {/* Search */}
          <label className="mt-5 block">
            <span className="sr-only">Search cases</span>
            <input
              value={f.q}
              onChange={(e) => setF({ ...f, q: e.target.value })}
              placeholder="Search titles, clients, excerpts…"
              className="h-10 w-full rounded-full border border-robert-soft bg-snow px-4 text-sm outline-none transition focus:border-robert focus:bg-canvas focus:shadow-ring"
            />
          </label>

          <Section title="Country">
            <div className="max-h-44 space-y-1 overflow-y-auto pr-1 no-scrollbar">
              {countries.map((c) => {
                const active = f.countries.includes(c.iso);
                return (
                  <button
                    key={c.iso}
                    onClick={() => toggle("countries", c.iso)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm transition",
                      active ? "bg-robert-ghost text-ink" : "text-ink-soft hover:bg-snow",
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <span aria-hidden>{countryFlag(c.iso)}</span>
                      {c.name}
                    </span>
                    <span className="font-mono text-xs text-ink-muted">{c.count}</span>
                  </button>
                );
              })}
            </div>
          </Section>

          <Section title="Document type">
            <div className="flex flex-wrap gap-1.5">
              {DOCUMENT_TYPES.map((d) => {
                const active = f.types.includes(d.id);
                return (
                  <button
                    key={d.id}
                    onClick={() => toggle<DocumentType>("types", d.id)}
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs transition",
                      active
                        ? "border-robert bg-robert text-white"
                        : "border-robert-soft bg-canvas text-ink-soft hover:border-robert hover:text-ink",
                    )}
                  >
                    <span aria-hidden>{d.icon}</span>
                    {d.label}
                  </button>
                );
              })}
            </div>
          </Section>

          <Section title="Language">
            <div className="flex flex-wrap gap-1.5">
              {languages.map((l) => {
                const active = f.languages.includes(l.iso);
                return (
                  <button
                    key={l.iso}
                    onClick={() => toggle("languages", l.iso)}
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs uppercase tracking-widest transition",
                      active
                        ? "border-robert bg-robert text-white"
                        : "border-robert-soft bg-canvas text-ink-soft hover:border-robert",
                    )}
                  >
                    {l.iso}
                    <span className="font-mono text-[10px] opacity-60">{l.count}</span>
                  </button>
                );
              })}
            </div>
          </Section>

          <Section title="Industry">
            <div className="flex flex-wrap gap-1.5">
              {INDUSTRIES.map((i) => {
                const active = f.industries.includes(i.id);
                return (
                  <button
                    key={i.id}
                    onClick={() => toggle<Industry>("industries", i.id)}
                    className={cn(
                      "rounded-full border px-2.5 py-1 text-xs transition",
                      active
                        ? "border-robert bg-robert text-white"
                        : "border-robert-soft text-ink-soft hover:border-robert",
                    )}
                  >
                    {i.label}
                  </button>
                );
              })}
            </div>
          </Section>

          <Section title="Editing level">
            <div className="grid grid-cols-2 gap-1.5">
              {EDITING_LEVELS.map((l) => {
                const active = f.levels.includes(l.id);
                return (
                  <button
                    key={l.id}
                    onClick={() => toggle<EditingLevel>("levels", l.id)}
                    className={cn(
                      "rounded-md border px-2 py-1.5 text-xs transition",
                      active
                        ? "border-robert bg-robert text-white"
                        : "border-robert-soft text-ink-soft hover:border-robert",
                    )}
                  >
                    {l.label}
                  </button>
                );
              })}
            </div>
          </Section>

          <Section title="Turnaround">
            <div className="flex flex-wrap gap-1.5">
              {TURNAROUNDS.map((t) => {
                const active = f.turnarounds.includes(t.id);
                return (
                  <button
                    key={t.id}
                    onClick={() => toggle("turnarounds", t.id)}
                    className={cn(
                      "rounded-full border px-3 py-1 text-xs transition",
                      active ? "border-robert bg-robert text-white" : "border-robert-soft text-ink-soft",
                    )}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
          </Section>

          <Section title="Word count range">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-ink-soft">
                <span>{formatNumber(f.minWords)}</span>
                <span className="flex-1 border-t border-dashed border-robert-soft" />
                <span>{formatNumber(f.maxWords)}</span>
              </div>
              <input
                type="range"
                min={0}
                max={150_000}
                step={1_000}
                value={f.maxWords}
                onChange={(e) => setF({ ...f, maxWords: Number(e.target.value) })}
                className="w-full accent-robert"
              />
            </div>
          </Section>

          <Section title="Year">
            <div className="flex flex-wrap gap-1.5">
              {["any", 2024, 2025].map((y) => {
                const active = f.year === y;
                return (
                  <button
                    key={String(y)}
                    onClick={() => setF({ ...f, year: y as FilterState["year"] })}
                    className={cn(
                      "rounded-full border px-3 py-1 text-xs transition",
                      active ? "border-robert bg-robert text-white" : "border-robert-soft text-ink-soft",
                    )}
                  >
                    {y === "any" ? "Any" : y}
                  </button>
                );
              })}
            </div>
          </Section>

          <Section title="Improvement metrics">
            <div className="space-y-2">
              <Toggle
                label="Readability +20%"
                active={f.metricReadability}
                onClick={() => setF({ ...f, metricReadability: !f.metricReadability })}
              />
              <Toggle
                label="−15% word count"
                active={f.metricWordCut}
                onClick={() => setF({ ...f, metricWordCut: !f.metricWordCut })}
              />
            </div>
          </Section>

          <Section title="Sort by">
            <select
              value={f.sort}
              onChange={(e) => setF({ ...f, sort: e.target.value as SortKey })}
              className="h-9 w-full rounded-md border border-robert-soft bg-canvas px-2 text-sm outline-none focus:border-robert focus:shadow-ring"
            >
              <option value="recent">Most recent</option>
              <option value="biggest">Biggest transformation</option>
              <option value="highest">Highest rated</option>
              <option value="longest">Longest document</option>
            </select>
          </Section>

          {hasActive && (
            <button
              onClick={() => setF(INITIAL)}
              className="mt-4 text-xs text-robert hover:underline"
            >
              Reset filters
            </button>
          )}
        </div>
      </aside>

      {/* Grid */}
      <section>
        {filtered.length === 0 ? (
          <div className="rounded-xl2 border border-dashed border-robert-soft bg-snow p-16 text-center">
            <p className="font-display text-2xl">No matches.</p>
            <p className="mt-2 text-sm text-ink-soft">
              Try loosening a filter — or just search for a word.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {filtered.map((c, i) => (
              <DocumentCard key={c.slug} c={c} index={i} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-5 border-t border-robert-soft/50 pt-4">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-ink-muted">
        {title}
      </p>
      {children}
    </div>
  );
}

function Toggle({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-center justify-between rounded-md border px-3 py-2 text-xs transition",
        active ? "border-robert bg-robert-ghost text-ink" : "border-robert-soft text-ink-soft",
      )}
    >
      <span>{label}</span>
      <span
        className={cn(
          "ml-2 inline-block h-4 w-7 rounded-full transition",
          active ? "bg-robert" : "bg-ink/20",
        )}
      >
        <span
          className={cn(
            "block h-4 w-4 rounded-full bg-canvas shadow transition-transform",
            active ? "translate-x-3" : "translate-x-0",
          )}
        />
      </span>
    </button>
  );
}

function filterCases(cases: CaseStudy[], f: FilterState): CaseStudy[] {
  let out = cases.filter((c) => {
    if (f.q) {
      const q = f.q.toLowerCase();
      const hay =
        `${c.title} ${c.client} ${c.excerptBefore} ${c.excerptAfter} ${c.editorsNote} ${c.tags.join(" ")}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    if (f.countries.length && !f.countries.includes(c.country)) return false;
    if (f.types.length && !f.types.includes(c.documentType)) return false;
    if (f.languages.length && !f.languages.includes(c.language)) return false;
    if (f.industries.length && !f.industries.includes(c.industry)) return false;
    if (f.levels.length && !f.levels.includes(c.editingLevel)) return false;
    if (f.turnarounds.length) {
      const maxes = f.turnarounds
        .map((id) => TURNAROUNDS.find((t) => t.id === id)?.max ?? Infinity)
        .sort((a, b) => a - b);
      const within = maxes.some((m) => c.turnaroundHours <= m);
      if (!within) return false;
    }
    if (c.wordCountBefore < f.minWords || c.wordCountBefore > f.maxWords) return false;
    if (f.year !== "any" && new Date(c.date).getFullYear() !== f.year) return false;
    if (f.metricReadability && c.readabilityAfter - c.readabilityBefore < 20) return false;
    if (f.metricWordCut) {
      const cut = (c.wordCountBefore - c.wordCountAfter) / c.wordCountBefore;
      if (cut < 0.15) return false;
    }
    return true;
  });

  out = [...out].sort((a, b) => {
    switch (f.sort) {
      case "recent":
        return +new Date(b.date) - +new Date(a.date);
      case "biggest":
        return (
          (b.wordCountBefore - b.wordCountAfter) / b.wordCountBefore -
          (a.wordCountBefore - a.wordCountAfter) / a.wordCountBefore
        );
      case "highest":
        return b.rating - a.rating;
      case "longest":
        return b.wordCountBefore - a.wordCountBefore;
    }
  });
  return out;
}
