"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import type { Id } from "../../../../convex/_generated/dataModel";
import { cn } from "@/lib/utils";

type Row = {
  id: Id<"testimonials">;
  quote: string;
  who: string;
  order: number;
  active: boolean;
};

type Draft = {
  id?: Id<"testimonials">;
  quote: string;
  who: string;
  order: number;
  active: boolean;
};

const BLANK: Draft = { quote: "", who: "", order: 100, active: true };

export function TestimonialsTab({ token }: { token: string }) {
  const rows = useQuery(api.testimonials.listAllAdmin, { token }) as
    | Row[]
    | undefined;
  const create = useMutation(api.testimonials.create);
  const update = useMutation(api.testimonials.update);
  const remove = useMutation(api.testimonials.remove);
  const [draft, setDraft] = useState<Draft>(BLANK);
  const [saving, setSaving] = useState(false);

  async function save() {
    if (!draft.quote.trim() || !draft.who.trim()) return;
    setSaving(true);
    try {
      if (draft.id) {
        await update({ token, id: draft.id, ...stripId(draft) });
      } else {
        await create({ token, ...stripId(draft) });
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
          Testimonials {rows && <span className="text-ink-muted">({rows.length})</span>}
        </h3>
        {!rows && <p className="mt-2 text-sm text-ink-muted">Loading…</p>}
        <ul className="mt-4 space-y-3">
          {rows?.map((r) => (
            <li
              key={r.id}
              className="rounded-xl2 border border-robert-soft/60 bg-canvas p-5 shadow-card"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <p className="italic text-ink">&ldquo;{r.quote}&rdquo;</p>
                  <p className="mt-2 text-xs uppercase tracking-widest text-ink-muted">
                    {r.who}
                  </p>
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
                    if (!confirm("Delete this testimonial?")) return;
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
          {draft.id ? "Edit testimonial" : "New testimonial"}
        </h4>
        <Label text="Quote">
          <textarea
            required
            rows={4}
            value={draft.quote}
            onChange={(e) => setDraft({ ...draft, quote: e.target.value })}
            className="w-full rounded-lg border border-robert-soft bg-canvas px-3 py-2 text-sm outline-none focus:border-robert"
          />
        </Label>
        <Label text="Attribution">
          <input
            required
            value={draft.who}
            onChange={(e) => setDraft({ ...draft, who: e.target.value })}
            className="h-10 w-full rounded-lg border border-robert-soft bg-canvas px-3 text-sm outline-none focus:border-robert"
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

function stripId<T extends { id?: unknown }>(d: T): Omit<T, "id"> {
  const clone = { ...d };
  delete (clone as { id?: unknown }).id;
  return clone;
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
