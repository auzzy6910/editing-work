"use client";

import { useEffect, useState, createContext, useContext } from "react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "robert-editing-admin-token";

const TokenContext = createContext<{
  token: string;
  setToken: (t: string) => void;
  signOut: () => void;
} | null>(null);

export function useAdminToken() {
  const ctx = useContext(TokenContext);
  if (!ctx) throw new Error("useAdminToken must be used within AdminGate");
  return ctx;
}

export function AdminGate({
  children,
}: {
  children: (ctx: { token: string }) => React.ReactNode;
}) {
  const [token, setTokenState] = useState("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("token");
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (fromUrl) {
      window.localStorage.setItem(STORAGE_KEY, fromUrl);
      setTokenState(fromUrl);
      // strip token from URL for safety
      const u = new URL(window.location.href);
      u.searchParams.delete("token");
      window.history.replaceState(null, "", u.toString());
    } else if (stored) {
      setTokenState(stored);
    }
    setHydrated(true);
  }, []);

  const setToken = (t: string) => {
    setTokenState(t);
    if (t) window.localStorage.setItem(STORAGE_KEY, t);
    else window.localStorage.removeItem(STORAGE_KEY);
  };

  const signOut = () => setToken("");

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-20">
        <p className="text-sm text-ink-muted">Loading admin…</p>
      </div>
    );
  }

  if (!token) {
    return <TokenForm onUnlock={setToken} />;
  }

  return (
    <TokenContext.Provider value={{ token, setToken, signOut }}>
      {children({ token })}
    </TokenContext.Provider>
  );
}

function TokenForm({ onUnlock }: { onUnlock: (t: string) => void }) {
  const [draft, setDraft] = useState("");

  return (
    <div className="mx-auto max-w-md px-6 py-32">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-robert">
        Admin
      </p>
      <h1 className="mt-2 font-display text-4xl">Enter admin token</h1>
      <p className="mt-3 text-sm text-ink-soft">
        Paste the value of <code className="rounded bg-robert-ghost px-1.5 py-0.5 text-robert">ADMIN_TOKEN</code>{" "}
        (set on the Convex deployment).
      </p>
      <form
        className="mt-6 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          onUnlock(draft.trim());
        }}
      >
        <input
          type="password"
          autoFocus
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="paste token"
          className="h-11 flex-1 rounded-lg border border-robert-soft bg-snow px-4 text-sm outline-none transition focus:border-robert focus:bg-canvas focus:shadow-ring"
        />
        <button
          type="submit"
          className={cn(
            "h-11 rounded-full bg-ink px-5 text-sm font-medium text-white transition hover:bg-robert",
          )}
        >
          Unlock
        </button>
      </form>
    </div>
  );
}
