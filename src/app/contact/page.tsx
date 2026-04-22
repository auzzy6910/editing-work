import { ContactForm } from "@/components/ContactForm";

export const metadata = { title: "Contact — Robert Editing" };

export default function ContactPage() {
  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-[1fr_1.1fr]">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-robert">Contact</p>
        <h1 className="mt-2 font-display text-5xl md:text-7xl leading-[1.05]">
          Send me your worst paragraph.
        </h1>
        <p className="mt-6 text-lg text-ink-soft">
          I reply within 24 hours, every day except Sunday. The first 100 words are on me — no
          strings, no sales calls, just an honest sample edit.
        </p>
        <dl className="mt-10 grid grid-cols-2 gap-6 text-sm">
          <div>
            <dt className="text-xs uppercase tracking-widest text-ink-muted">Email</dt>
            <dd className="mt-1 font-mono">hello@robertediting.example</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-widest text-ink-muted">Turnaround</dt>
            <dd className="mt-1 font-mono">24h reply · 3–14d delivery</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-widest text-ink-muted">Time zone</dt>
            <dd className="mt-1 font-mono">Lisbon (UTC+0/+1)</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-widest text-ink-muted">Availability</dt>
            <dd className="mt-1 font-mono">2 slots open, Q3</dd>
          </div>
        </dl>
      </div>
      <ContactForm />
    </div>
  );
}
