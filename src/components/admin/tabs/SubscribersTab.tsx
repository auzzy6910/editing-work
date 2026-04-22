"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import type { Id } from "../../../../convex/_generated/dataModel";

export function SubscribersTab({ token }: { token: string }) {
  const rows = useQuery(api.subscribers.listForAdmin, { token });
  const remove = useMutation(api.subscribers.remove);

  if (!rows) return <p className="text-sm text-ink-muted">Loading…</p>;

  function exportCsv() {
    if (!rows) return;
    const header = "email,source,subscribedAt\n";
    const body = rows
      .map(
        (r) =>
          `${r.email},${r.source},${new Date(r.subscribedAt).toISOString()}`,
      )
      .join("\n");
    const blob = new Blob([header + body], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "subscribers.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="font-display text-xl">
          Subscribers <span className="text-ink-muted">({rows.length})</span>
        </h3>
        <button
          type="button"
          onClick={exportCsv}
          disabled={rows.length === 0}
          className="rounded-full border border-robert-soft px-4 py-2 text-sm transition hover:border-robert hover:text-robert disabled:opacity-40"
        >
          Export CSV
        </button>
      </div>
      {rows.length === 0 ? (
        <p className="mt-6 rounded-xl2 border border-dashed border-robert-soft p-10 text-center text-sm text-ink-muted">
          Nobody has subscribed yet.
        </p>
      ) : (
        <table className="mt-6 w-full text-sm">
          <thead>
            <tr className="border-b border-robert-soft/60 text-left text-xs uppercase tracking-widest text-ink-muted">
              <th className="py-2">Email</th>
              <th className="py-2">Source</th>
              <th className="py-2">Subscribed</th>
              <th className="py-2"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b border-robert-soft/30">
                <td className="py-3">
                  <a href={`mailto:${r.email}`} className="text-robert hover:underline">
                    {r.email}
                  </a>
                </td>
                <td className="py-3 text-xs text-ink-muted">{r.source || "—"}</td>
                <td className="py-3 font-mono text-xs text-ink-muted">
                  {new Date(r.subscribedAt).toLocaleString()}
                </td>
                <td className="py-3 text-right">
                  <button
                    onClick={async () => {
                      if (!confirm(`Remove ${r.email}?`)) return;
                      await remove({ token, id: r.id as Id<"subscribers"> });
                    }}
                    className="rounded-full border border-edit/40 px-3 py-1 text-xs text-edit transition hover:bg-edit hover:text-white"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
