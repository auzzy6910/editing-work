"use client";

import { useEffect, useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "robert-editing-admin-token";

export function AdminInbox() {
  const [token, setToken] = useState<string>("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("token");
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (fromUrl) {
      window.localStorage.setItem(STORAGE_KEY, fromUrl);
      setToken(fromUrl);
    } else if (stored) {
      setToken(stored);
    }
    setHydrated(true);
  }, []);

  const result = useQuery(api.contact.listForAdmin, token ? { token } : "skip");
  const loading = token !== "" && result === undefined;

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <div className="flex items-end justify-between gap-4 border-b border-robert-soft/60 pb-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-robert">
            Admin · Inbox
          </p>
          <h1 className="mt-2 font-display text-4xl">Incoming drafts</h1>
          <p className="mt-2 text-sm text-ink-soft">
            Reads from the <code className="rounded bg-robert-ghost px-1.5 py-0.5 text-robert">contacts</code> table in Convex.
            Gated by the <code className="rounded bg-robert-ghost px-1.5 py-0.5 text-robert">ADMIN_TOKEN</code> env var on
            the Convex deployment.
          </p>
        </div>
        {result?.ok && (
          <div className="text-right">
            <p className="font-display text-5xl text-ink">{result.count}</p>
            <p className="text-xs uppercase tracking-widest text-ink-muted">
              Messages
            </p>
          </div>
        )}
      </div>

      <TokenForm
        token={token}
        hydrated={hydrated}
        onChange={(t) => {
          setToken(t);
          if (t) window.localStorage.setItem(STORAGE_KEY, t);
          else window.localStorage.removeItem(STORAGE_KEY);
        }}
      />

      {loading && (
        <p className="mt-8 text-sm text-ink-muted">Loading from Convex…</p>
      )}

      {result && !result.ok && token && (
        <p className="mt-8 rounded-lg bg-edit/10 p-4 text-sm text-edit">
          Invalid or missing token. Set <code>ADMIN_TOKEN</code> on the Convex deployment
          (Dashboard → Settings → Environment Variables), then paste the same value here.
        </p>
      )}

      {result?.ok && result.items.length === 0 && (
        <div className="mt-10 rounded-xl2 border border-dashed border-robert-soft p-10 text-center">
          <p className="font-display text-xl">Inbox is empty.</p>
          <p className="mt-2 text-sm text-ink-muted">
            Submissions from the contact form will appear here in real time.
          </p>
        </div>
      )}

      {result?.ok && result.items.length > 0 && (
        <ul className="mt-10 space-y-4">
          {result.items.map((m) => (
            <li
              key={m.id}
              className="rounded-xl2 border border-robert-soft/60 bg-canvas p-6 shadow-card"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-display text-xl">{m.name}</p>
                  <a
                    href={`mailto:${m.email}`}
                    className="text-sm text-robert hover:underline"
                  >
                    {m.email}
                  </a>
                </div>
                <time className="font-mono text-xs text-ink-muted">
                  {new Date(m.submittedAt).toLocaleString()}
                </time>
              </div>
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                {m.documentType && <Chip label="Doc" value={m.documentType} />}
                {m.language && <Chip label="Lang" value={m.language} />}
                {m.approximateWordCount && (
                  <Chip label="Words" value={m.approximateWordCount} />
                )}
              </div>
              <p className="mt-4 whitespace-pre-wrap rounded-lg bg-snow p-4 text-sm leading-relaxed text-ink">
                {m.message}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function TokenForm({
  token,
  hydrated,
  onChange,
}: {
  token: string;
  hydrated: boolean;
  onChange: (t: string) => void;
}) {
  const [draft, setDraft] = useState("");
  useEffect(() => {
    setDraft(token);
  }, [token]);

  if (!hydrated) return null;

  return (
    <form
      className="mt-8 flex flex-wrap items-end gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        onChange(draft.trim());
      }}
    >
      <label className="flex-1 min-w-[260px]">
        <span className="mb-1 block text-xs font-semibold uppercase tracking-widest text-ink-muted">
          Admin token
        </span>
        <input
          type="password"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="paste ADMIN_TOKEN here"
          className="h-11 w-full rounded-lg border border-robert-soft bg-snow px-4 text-sm outline-none transition focus:border-robert focus:bg-canvas focus:shadow-ring"
        />
      </label>
      <button
        type="submit"
        className={cn(
          "h-11 rounded-full bg-ink px-5 text-sm font-medium text-white transition hover:bg-robert",
        )}
      >
        Unlock
      </button>
      {token && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="h-11 rounded-full border border-robert-soft bg-canvas px-5 text-sm font-medium text-ink transition hover:border-robert"
        >
          Sign out
        </button>
      )}
    </form>
  );
}

function Chip({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-robert-soft bg-robert-ghost px-3 py-1 text-robert">
      <span className="uppercase tracking-widest text-[10px] text-ink-muted">
        {label}
      </span>
      {value}
    </span>
  );
}
