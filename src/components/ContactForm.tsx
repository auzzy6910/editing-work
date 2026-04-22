"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { DOCUMENT_TYPES, SERVICE_TYPES } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ContactForm() {
  const submit = useMutation(api.contact.submit);
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    setError(null);
    const fd = new FormData(e.currentTarget);
    try {
      await submit({
        name: String(fd.get("name") ?? ""),
        email: String(fd.get("email") ?? ""),
        documentType: String(fd.get("type") ?? "") || undefined,
        language: String(fd.get("service") ?? "") || undefined,
        approximateWordCount: String(fd.get("deadline") ?? "") || undefined,
        message: String(fd.get("message") ?? ""),
      });
      setState("sent");
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (state === "sent") {
    return (
      <div className="flex min-h-[400px] flex-col items-start justify-center rounded-xl2 border border-robert-soft/60 bg-canvas p-10 shadow-card">
        <span className="rounded-full bg-robert-ghost px-3 py-1 text-xs font-semibold uppercase tracking-widest text-robert">
          Received
        </span>
        <h2 className="mt-4 font-display text-4xl">Thanks — I&apos;ll reply today.</h2>
        <p className="mt-2 text-ink-soft">
          Your request is logged. I&apos;ll follow up on WhatsApp or email within a few hours with a
          clear quote and timeline.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-xl2 border border-robert-soft/60 bg-canvas p-8 shadow-card"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Your name" name="name" required />
        <Field label="Email / phone" name="email" type="text" required />
      </div>
      <label className="mt-4 block">
        <span className="mb-1 block text-xs font-semibold uppercase tracking-widest text-ink-muted">
          Document type
        </span>
        <select
          name="type"
          required
          className="h-11 w-full rounded-lg border border-robert-soft bg-snow px-4 text-sm outline-none transition focus:border-robert focus:bg-canvas focus:shadow-ring"
        >
          <option value="">Select a certificate</option>
          {DOCUMENT_TYPES.map((d) => (
            <option key={d.id} value={d.id}>
              {d.label}
            </option>
          ))}
        </select>
      </label>
      <label className="mt-4 block">
        <span className="mb-1 block text-xs font-semibold uppercase tracking-widest text-ink-muted">
          Service needed
        </span>
        <select
          name="service"
          className="h-11 w-full rounded-lg border border-robert-soft bg-snow px-4 text-sm outline-none transition focus:border-robert focus:bg-canvas focus:shadow-ring"
        >
          <option value="">Select a service</option>
          {SERVICE_TYPES.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>
      </label>
      <Field
        label="Deadline / urgency"
        name="deadline"
        className="mt-4"
        placeholder="e.g. need before 15 Nov, or flexible"
      />
      <label className="mt-4 block">
        <span className="mb-1 block text-xs font-semibold uppercase tracking-widest text-ink-muted">
          Tell me about it
        </span>
        <textarea
          required
          name="message"
          rows={5}
          minLength={10}
          className="w-full rounded-lg border border-robert-soft bg-snow px-4 py-3 text-sm outline-none transition focus:border-robert focus:bg-canvas focus:shadow-ring"
          placeholder="What's the certificate for? What's the issue or missing piece? Which county / office issued it?"
        />
      </label>
      {error && (
        <p className="mt-3 rounded-md bg-edit/10 px-3 py-2 text-xs text-edit">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={state === "sending"}
        className={cn(
          "mt-6 rounded-full bg-ink px-6 py-3 text-sm font-medium text-white transition",
          state === "sending" ? "opacity-60" : "hover:bg-robert",
        )}
      >
        {state === "sending" ? "Sending…" : "Send to Robert"}
      </button>
      <p className="mt-3 text-xs text-ink-muted">
        Your request goes straight to Robert. We never share details with anyone outside the case.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  className,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  className?: string;
  placeholder?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1 block text-xs font-semibold uppercase tracking-widest text-ink-muted">
        {label}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="h-11 w-full rounded-lg border border-robert-soft bg-snow px-4 text-sm outline-none transition focus:border-robert focus:bg-canvas focus:shadow-ring"
      />
    </label>
  );
}
