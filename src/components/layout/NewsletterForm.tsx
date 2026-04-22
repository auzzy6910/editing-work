"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { cn } from "@/lib/utils";

export function NewsletterForm({
  source = "footer",
}: {
  source?: string;
}) {
  const subscribe = useMutation(api.subscribers.subscribe);
  const [state, setState] = useState<
    "idle" | "sending" | "sent" | "already" | "error"
  >("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    if (!email) return;
    setState("sending");
    setError(null);
    try {
      const res = await subscribe({ email, source });
      setState(res.alreadySubscribed ? "already" : "sent");
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (state === "sent" || state === "already") {
    return (
      <p className="mt-6 flex max-w-md items-center gap-2 rounded-full border border-robert-soft bg-canvas px-4 py-3 text-sm text-ink">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-robert" />
        {state === "sent"
          ? "Subscribed. I'll send the next Digest your way."
          : "Already subscribed — nothing else to do."}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 flex max-w-md items-center gap-2">
      <input
        type="email"
        name="email"
        required
        placeholder="you@domain.com"
        aria-label="Email address"
        className="h-11 flex-1 rounded-full border border-robert-soft bg-canvas px-4 text-sm outline-none transition focus:border-robert focus:shadow-ring"
      />
      <button
        type="submit"
        disabled={state === "sending"}
        className={cn(
          "h-11 rounded-full bg-ink px-5 text-sm font-medium text-white transition",
          state === "sending" ? "opacity-60" : "hover:bg-robert",
        )}
      >
        {state === "sending" ? "…" : "Subscribe"}
      </button>
      {error && (
        <p className="w-full text-xs text-edit" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
