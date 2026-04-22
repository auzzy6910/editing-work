"use client";

import { useEffect, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { cn } from "@/lib/utils";

const KNOWN_KEYS: { key: string; label: string; type: "text" | "textarea" | "bool" }[] = [
  { key: "hero.badge", label: "Hero badge text", type: "text" },
  { key: "hero.slotsOpen", label: "Slots open (true/false)", type: "bool" },
  { key: "hero.intro", label: "Hero intro paragraph", type: "textarea" },
  { key: "stats.totalCountries", label: "Total countries claim", type: "text" },
  { key: "stats.totalLanguages", label: "Total languages claim", type: "text" },
  { key: "stats.multiplierDocs", label: "Docs-edited multiplier", type: "text" },
  { key: "stats.multiplierWords", label: "Words-cut multiplier", type: "text" },
  { key: "cta.kicker", label: "CTA kicker", type: "text" },
  { key: "cta.title", label: "CTA title", type: "text" },
  { key: "cta.body", label: "CTA body", type: "textarea" },
  { key: "cta.button", label: "CTA button", type: "text" },
  { key: "contact.email", label: "Contact email", type: "text" },
  { key: "contact.whatsapp", label: "WhatsApp number (digits only, incl. country code)", type: "text" },
  { key: "contact.whatsappMessage", label: "WhatsApp prefilled message", type: "text" },
  { key: "footer.tagline", label: "Footer tagline", type: "textarea" },
  { key: "footer.newsletterCopy", label: "Newsletter copy", type: "text" },
  { key: "social.linkedin", label: "LinkedIn URL", type: "text" },
  { key: "social.twitter", label: "X / Twitter URL", type: "text" },
];

export function SettingsTab({ token }: { token: string }) {
  const data = useQuery(api.settings.all);
  const setMany = useMutation(api.settings.setMany);
  const [local, setLocal] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<number | null>(null);

  useEffect(() => {
    if (data) setLocal(data);
  }, [data]);

  async function save() {
    setSaving(true);
    try {
      const values = KNOWN_KEYS.map((k) => ({
        key: k.key,
        value: local[k.key] ?? "",
      }));
      await setMany({ token, values });
      setSavedAt(Date.now());
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        save();
      }}
    >
      <h3 className="font-display text-xl">Site settings</h3>
      <p className="mt-1 text-sm text-ink-soft">
        Everything here is a key/value pair in the <code>settings</code> table. Changes
        are reactive — every public page picks them up within a second.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {KNOWN_KEYS.map((k) => (
          <Field
            key={k.key}
            def={k}
            value={local[k.key] ?? ""}
            onChange={(v) => setLocal((prev) => ({ ...prev, [k.key]: v }))}
          />
        ))}
      </div>

      <div className="mt-6 flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className={cn(
            "rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white transition",
            saving ? "opacity-60" : "hover:bg-robert",
          )}
        >
          {saving ? "Saving…" : "Save all"}
        </button>
        {savedAt && !saving && (
          <span className="text-xs text-ink-muted">
            Saved {new Date(savedAt).toLocaleTimeString()}
          </span>
        )}
      </div>
    </form>
  );
}

function Field({
  def,
  value,
  onChange,
}: {
  def: { key: string; label: string; type: "text" | "textarea" | "bool" };
  value: string;
  onChange: (v: string) => void;
}) {
  const isWide = def.type === "textarea";
  return (
    <label className={isWide ? "md:col-span-2" : ""}>
      <span className="mb-1 flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-ink-muted">
          {def.label}
        </span>
        <span className="font-mono text-[10px] text-ink-muted">{def.key}</span>
      </span>
      {def.type === "textarea" ? (
        <textarea
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-robert-soft bg-canvas px-3 py-2 text-sm outline-none focus:border-robert"
        />
      ) : def.type === "bool" ? (
        <select
          value={value || "true"}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-full rounded-lg border border-robert-soft bg-canvas px-3 text-sm outline-none focus:border-robert"
        >
          <option value="true">true</option>
          <option value="false">false</option>
        </select>
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-full rounded-lg border border-robert-soft bg-canvas px-3 text-sm outline-none focus:border-robert"
        />
      )}
    </label>
  );
}
