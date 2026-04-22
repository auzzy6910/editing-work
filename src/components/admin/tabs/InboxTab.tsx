"use client";

import { useMemo, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { cn } from "@/lib/utils";
import type { Id } from "../../../../convex/_generated/dataModel";

const STATUS_OPTIONS = ["new", "replied", "archived"] as const;
type Status = (typeof STATUS_OPTIONS)[number];

export function InboxTab({ token }: { token: string }) {
  const result = useQuery(api.contact.listForAdmin, { token });
  const setStatus = useMutation(api.contact.setStatus);
  const toggleStar = useMutation(api.contact.toggleStarred);
  const remove = useMutation(api.contact.remove);

  const [filter, setFilter] = useState<"all" | Status | "starred">("all");
  const [busyId, setBusyId] = useState<string | null>(null);

  const visible = useMemo(() => {
    if (!result?.ok) return [];
    if (filter === "all") return result.items;
    if (filter === "starred") return result.items.filter((m) => m.starred);
    return result.items.filter((m) => m.status === filter);
  }, [result, filter]);

  const counts = useMemo(() => {
    if (!result?.ok) return { all: 0, new: 0, replied: 0, archived: 0, starred: 0 };
    const c = { all: result.items.length, new: 0, replied: 0, archived: 0, starred: 0 };
    for (const m of result.items) {
      if (m.starred) c.starred++;
      if (m.status === "new") c.new++;
      else if (m.status === "replied") c.replied++;
      else if (m.status === "archived") c.archived++;
    }
    return c;
  }, [result]);

  if (!result) return <p className="text-sm text-ink-muted">Loading inbox…</p>;
  if (!result.ok)
    return (
      <p className="rounded-lg bg-edit/10 p-4 text-sm text-edit">
        Token rejected. Sign out and re-enter.
      </p>
    );

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <Chip
          label={`All (${counts.all})`}
          active={filter === "all"}
          onClick={() => setFilter("all")}
        />
        <Chip
          label={`New (${counts.new})`}
          active={filter === "new"}
          onClick={() => setFilter("new")}
        />
        <Chip
          label={`Replied (${counts.replied})`}
          active={filter === "replied"}
          onClick={() => setFilter("replied")}
        />
        <Chip
          label={`Archived (${counts.archived})`}
          active={filter === "archived"}
          onClick={() => setFilter("archived")}
        />
        <Chip
          label={`Starred (${counts.starred})`}
          active={filter === "starred"}
          onClick={() => setFilter("starred")}
        />
      </div>

      {visible.length === 0 && (
        <div className="mt-8 rounded-xl2 border border-dashed border-robert-soft p-10 text-center">
          <p className="font-display text-xl">Nothing here.</p>
          <p className="mt-2 text-sm text-ink-muted">
            Submissions from the contact form appear in real time.
          </p>
        </div>
      )}

      <ul className="mt-6 space-y-4">
        {visible.map((m) => (
          <li
            key={m.id}
            className="rounded-xl2 border border-robert-soft/60 bg-canvas p-5 shadow-card"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={async () => {
                      setBusyId(m.id);
                      await toggleStar({ token, id: m.id as Id<"contacts"> });
                      setBusyId(null);
                    }}
                    className="text-lg leading-none"
                    title={m.starred ? "Unstar" : "Star"}
                  >
                    {m.starred ? "★" : "☆"}
                  </button>
                  <p className="font-display text-lg">{m.name}</p>
                  <StatusPill status={(m.status ?? "new") as Status} />
                </div>
                <a
                  href={`mailto:${m.email}`}
                  className="text-sm text-robert hover:underline"
                >
                  {m.email}
                </a>
              </div>
              <div className="flex flex-col items-end gap-2">
                <time className="font-mono text-xs text-ink-muted">
                  {new Date(m.submittedAt).toLocaleString()}
                </time>
                <div className="flex flex-wrap gap-1.5">
                  {STATUS_OPTIONS.map((s) => (
                    <button
                      key={s}
                      disabled={busyId === m.id || m.status === s}
                      onClick={async () => {
                        setBusyId(m.id);
                        await setStatus({
                          token,
                          id: m.id as Id<"contacts">,
                          status: s,
                        });
                        setBusyId(null);
                      }}
                      className={cn(
                        "rounded-full border px-2.5 py-0.5 text-[11px] uppercase tracking-widest transition",
                        m.status === s
                          ? "border-robert bg-robert-ghost text-robert"
                          : "border-robert-soft text-ink-soft hover:border-robert hover:text-robert",
                      )}
                    >
                      {s}
                    </button>
                  ))}
                  <button
                    onClick={async () => {
                      if (!confirm(`Delete message from ${m.name}?`)) return;
                      setBusyId(m.id);
                      await remove({ token, id: m.id as Id<"contacts"> });
                      setBusyId(null);
                    }}
                    className="rounded-full border border-edit/40 px-2.5 py-0.5 text-[11px] uppercase tracking-widest text-edit transition hover:bg-edit hover:text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              {m.documentType && <Tag label="Doc" value={m.documentType} />}
              {m.language && <Tag label="Lang" value={m.language} />}
              {m.approximateWordCount && (
                <Tag label="Words" value={m.approximateWordCount} />
              )}
            </div>
            <p className="mt-4 whitespace-pre-wrap rounded-lg bg-snow p-4 text-sm leading-relaxed text-ink">
              {m.message}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Chip({
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
        "rounded-full border px-3 py-1 text-xs transition",
        active
          ? "border-robert bg-robert text-white"
          : "border-robert-soft bg-canvas text-ink-soft hover:border-robert hover:text-robert",
      )}
    >
      {label}
    </button>
  );
}

function StatusPill({ status }: { status: Status }) {
  const color =
    status === "new"
      ? "bg-robert text-white"
      : status === "replied"
        ? "bg-keep/20 text-keep"
        : "bg-ink-muted/10 text-ink-muted";
  return (
    <span
      className={cn(
        "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest",
        color,
      )}
    >
      {status}
    </span>
  );
}

function Tag({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-robert-soft bg-robert-ghost px-3 py-1 text-robert">
      <span className="text-[10px] uppercase tracking-widest text-ink-muted">
        {label}
      </span>
      {value}
    </span>
  );
}
