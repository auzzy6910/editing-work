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
        <a
          href="https://wa.me/254714207523?text=Hi%20Robert%2C%20I%27d%20like%20to%20discuss%20a%20document%20request."
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-medium text-white shadow-card transition hover:-translate-y-0.5 hover:shadow-cardHover"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="h-4 w-4 fill-current" aria-hidden>
            <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.434-.9-2.605-.17-.17-.403-.17-.57-.17-.27 0-.57 0-.84.012-.295.015-.725.157-.985.47-.39.47-1.165 1.143-1.165 2.695s1.195 3.055 1.365 3.24c.195.215 2.28 3.66 5.66 5.053 2.835 1.166 3.42 1.026 4.045.97.625-.057 2.005-.81 2.29-1.61.285-.8.285-1.49.2-1.61-.086-.13-.31-.2-.637-.325z" />
            <path d="M16.002 0C7.166 0 0 7.164 0 16c0 2.824.745 5.575 2.156 7.993L.023 31.555a.999.999 0 0 0 1.223 1.223l7.562-2.132A15.99 15.99 0 0 0 16.002 32C24.838 32 32 24.836 32 16S24.838 0 16.002 0zm0 29.335c-2.51 0-4.958-.705-7.084-2.042a.999.999 0 0 0-.815-.12l-5.62 1.584 1.585-5.62a.999.999 0 0 0-.12-.814A13.19 13.19 0 0 1 2.67 16c0-7.35 5.982-13.33 13.332-13.33S29.33 8.65 29.33 16 23.35 29.335 16.002 29.335z" />
          </svg>
          Chat on WhatsApp
        </a>
        <dl className="mt-10 grid grid-cols-2 gap-6 text-sm">
          <div>
            <dt className="text-xs uppercase tracking-widest text-ink-muted">WhatsApp</dt>
            <dd className="mt-1 font-mono">+254 714 207 523</dd>
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
