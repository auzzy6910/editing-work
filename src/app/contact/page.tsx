import { ContactForm } from "@/components/ContactForm";

export const metadata = { title: "Contact — Robert Editing" };

export default function ContactPage() {
  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-[1fr_1.1fr]">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-robert">Contact</p>
        <h1 className="mt-2 font-display text-5xl md:text-7xl leading-[1.05]">
          Tell me what you need.
        </h1>
        <p className="mt-6 text-lg text-ink-soft">
          Share a short note: which certificate, what the issue is, and how soon you need it. I
          reply the same day (Sunday excluded) with a clear quote, the government fees, and a
          realistic timeline.
        </p>
        <dl className="mt-10 grid grid-cols-2 gap-6 text-sm">
          <div>
            <dt className="text-xs uppercase tracking-widest text-ink-muted">WhatsApp</dt>
            <dd className="mt-1 font-mono">+254 700 000 000</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-widest text-ink-muted">Turnaround</dt>
            <dd className="mt-1 font-mono">Reply same day · 2–21d delivery</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-widest text-ink-muted">Time zone</dt>
            <dd className="mt-1 font-mono">Nairobi (UTC+3)</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-widest text-ink-muted">Availability</dt>
            <dd className="mt-1 font-mono">Taking new cases</dd>
          </div>
        </dl>
      </div>
      <ContactForm />
    </div>
  );
}
