"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import type { Id } from "../../../../convex/_generated/dataModel";
import { cn } from "@/lib/utils";

type Row = {
  id: Id<"processSteps">;
  number: string;
  title: string;
  body: string;
  order: number;
  active: boolean;
};

type Draft = Omit<Row, "id"> & { id?: Id<"processSteps"> };

const BLANK: Draft = {
  number: "",
  title: "",
  body: "",
  order: 100,
  active: true,
};

export function ProcessTab({ token }: { token: string }) {
  const rows = useQuery(api.processSteps.listAllAdmin, { token }) as
    | Row[]
    | undefined;
  const create = useMutation(api.processSteps.create);
  const update = useMutation(api.processSteps.update);
  const remove = useMutation(api.processSteps.remove);
  const [draft, setDraft] = useState<Draft>(BLANK);
  const [saving, setSaving] = useState(false);

  async function save() {
    if (!draft.title.trim()) return;
    setSaving(true);
    try {
      const payload = {
        number: draft.number,
        title: draft.title,
        body: draft.body,
        order: draft.order,
        active: draft.active,
      };
      if (draft.id) {
        await update({ token, id: draft.id, ...payload });
      } else {
        await create({ token, ...payload });
      }
      setDraft(BLANK);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <div>
        <h3 className="font-display text-xl">
          Process steps{" "}
          {rows && <span className="text-ink-muted">({rows.length})</span>}
        </h3>
        {!rows && <p className="mt-2 text-sm text-ink-muted">Loading…</p>}
        <ul className="mt-4 space-y-3">
          {rows?.map((r) => (
            <li
              key={r.id}
              className="rounded-xl2 border border-robert-soft/60 bg-canvas p-5 shadow-card"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-sm text-robert">{r.number}</p>
                  <p className="mt-1 font-display text-xl">{r.title}</p>
                  <p className="mt-2 text-sm text-ink-soft">{r.body}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest",
                      r.active
                        ? "bg-robert text-white"
                        : "bg-ink-muted/10 text-ink-muted",
                    )}
                  >
                    {r.active ? "Active" : "Hidden"}
                  </span>
                  <span className="font-mono text-xs text-ink-muted">
                    order: {r.order}
                  </span>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => setDraft(r)}
                  className="rounded-full border border-robert-soft px-3 py-1 text-xs transition hover:border-robert hover:text-robert"
                >
                  Edit
                </button>
                <button
                  onClick={async () => {
                    if (!confirm("Delete this step?")) return;
                    await remove({ token, id: r.id });
                  }}
                  className="rounded-full border border-edit/40 px-3 py-1 text-xs text-edit transition hover:bg-edit hover:text-white"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          save();
        }}
        className="sticky top-24 self-start rounded-xl2 border border-robert-soft/60 bg-snow p-5"
      >
        <h4 className="font-display text-lg">
          {draft.id ? "Edit step" : "New step"}
        </h4>
        <Label text="Number (e.g. 01)">
          <input
            value={draft.number}
            onChange={(e) => setDraft({ ...draft, number: e.target.value })}
            className="h-10 w-full rounded-lg border border-robert-soft bg-canvas px-3 text-sm outline-none focus:border-robert"
          />
        </Label>
        <Label text="Title">
          <input
            required
            value={draft.title}
            onChange={(e) => setDraft({ ...draft, title: e.target.value })}
            className="h-10 w-full rounded-lg border border-robert-soft bg-canvas px-3 text-sm outline-none focus:border-robert"
          />
        </Label>
        <Label text="Body">
          <textarea
            rows={3}
            value={draft.body}
            onChange={(e) => setDraft({ ...draft, body: e.target.value })}
            className="w-full rounded-lg border border-robert-soft bg-canvas px-3 py-2 text-sm outline-none focus:border-robert"
          />
        </Label>
        <div className="mt-3 flex gap-3">
          <Label text="Order" compact>
            <input
              type="number"
              value={draft.order}
              onChange={(e) =>
                setDraft({ ...draft, order: Number(e.target.value) })
              }
              className="h-10 w-full rounded-lg border border-robert-soft bg-canvas px-3 text-sm outline-none focus:border-robert"
            />
          </Label>
          <Label text="Active" compact>
            <input
              type="checkbox"
              checked={draft.active}
              onChange={(e) => setDraft({ ...draft, active: e.target.checked })}
              className="mt-3 h-5 w-5"
            />
          </Label>
        </div>
        <div className="mt-4 flex gap-2">
          <button
            type="submit"
            disabled={saving}
            className={cn(
              "h-10 flex-1 rounded-full bg-ink px-4 text-sm font-medium text-white transition",
              saving ? "opacity-60" : "hover:bg-robert",
            )}
          >
            {saving ? "Saving…" : draft.id ? "Update" : "Add"}
          </button>
          {draft.id && (
            <button
              type="button"
              onClick={() => setDraft(BLANK)}
              className="h-10 rounded-full border border-robert-soft px-4 text-sm hover:border-robert"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

function Label({
  text,
  compact,
  children,
}: {
  text: string;
  compact?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className={compact ? "flex-1" : "mt-3 block"}>
      <span className="mb-1 block text-[11px] font-semibold uppercase tracking-widest text-ink-muted">
        {text}
      </span>
      {children}
    </label>
  );
}
