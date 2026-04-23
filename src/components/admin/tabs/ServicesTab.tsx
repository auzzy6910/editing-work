"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import type { Id } from "../../../../convex/_generated/dataModel";
import { cn } from "@/lib/utils";

type Row = {
  id: Id<"services">;
  slug: string;
  icon: string;
  name: string;
  price: string;
  body: string;
  items: string[];
  order: number;
  active: boolean;
};

type Draft = Omit<Row, "id"> & { id?: Id<"services">; itemsText: string };

const BLANK: Draft = {
  slug: "",
  icon: "🎓",
  name: "",
  price: "",
  body: "",
  items: [],
  itemsText: "",
  order: 100,
  active: true,
};

export function ServicesTab({ token }: { token: string }) {
  const rows = useQuery(api.services.listAllAdmin, { token }) as Row[] | undefined;
  const create = useMutation(api.services.create);
  const update = useMutation(api.services.update);
  const remove = useMutation(api.services.remove);
  const [draft, setDraft] = useState<Draft>(BLANK);
  const [saving, setSaving] = useState(false);

  async function save() {
    if (!draft.name.trim() || !draft.slug.trim()) return;
    const items = draft.itemsText
      .split(/\r?\n/)
      .map((s) => s.trim())
      .filter(Boolean);
    setSaving(true);
    try {
      const payload = {
        slug: draft.slug,
        icon: draft.icon,
        name: draft.name,
        price: draft.price,
        body: draft.body,
        items,
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

  function edit(r: Row) {
    setDraft({
      id: r.id,
      slug: r.slug,
      icon: r.icon,
      name: r.name,
      price: r.price,
      body: r.body,
      items: r.items,
      itemsText: r.items.join("\n"),
      order: r.order,
      active: r.active,
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
      <div>
        <h3 className="font-display text-xl">
          Services {rows && <span className="text-ink-muted">({rows.length})</span>}
        </h3>
        {!rows && <p className="mt-2 text-sm text-ink-muted">Loading…</p>}
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {rows?.map((r) => (
            <li
              key={r.id}
              className="rounded-xl2 border border-robert-soft/60 bg-canvas p-4 shadow-card"
            >
              <div className="flex items-start justify-between">
                <div className="text-3xl">{r.icon}</div>
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
              </div>
              <p className="mt-3 font-display text-lg">{r.name}</p>
              <p className="mt-2 line-clamp-3 text-xs text-ink-soft">{r.body}</p>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => edit(r)}
                  className="rounded-full border border-robert-soft px-3 py-1 text-xs transition hover:border-robert hover:text-robert"
                >
                  Edit
                </button>
                <button
                  onClick={async () => {
                    if (!confirm(`Delete "${r.name}"?`)) return;
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
          {draft.id ? "Edit service" : "New service"}
        </h4>
        <div className="mt-3 grid grid-cols-[60px_1fr] gap-2">
          <input
            value={draft.icon}
            onChange={(e) => setDraft({ ...draft, icon: e.target.value })}
            className="h-10 rounded-lg border border-robert-soft bg-canvas px-2 text-center text-lg outline-none focus:border-robert"
            aria-label="Icon emoji"
          />
          <input
            required
            placeholder="Slug (e.g. academic)"
            value={draft.slug}
            onChange={(e) => setDraft({ ...draft, slug: e.target.value })}
            className="h-10 rounded-lg border border-robert-soft bg-canvas px-3 text-sm outline-none focus:border-robert"
          />
        </div>
        <Label text="Name">
          <input
            required
            value={draft.name}
            onChange={(e) => setDraft({ ...draft, name: e.target.value })}
            className="h-10 w-full rounded-lg border border-robert-soft bg-canvas px-3 text-sm outline-none focus:border-robert"
          />
        </Label>
        <Label text="Price">
          <input
            value={draft.price}
            placeholder="from $0.035 / word"
            onChange={(e) => setDraft({ ...draft, price: e.target.value })}
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
        <Label text="Line items (one per line)">
          <textarea
            rows={4}
            value={draft.itemsText}
            onChange={(e) => setDraft({ ...draft, itemsText: e.target.value })}
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
