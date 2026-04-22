import Link from "next/link";
import { CaseStudy, DOCUMENT_TYPES } from "@/lib/types";
import { cn, countryFlag } from "@/lib/utils";

function docIcon(type: string) {
  return DOCUMENT_TYPES.find((d) => d.id === type)?.icon ?? "📄";
}
function docLabel(type: string) {
  return DOCUMENT_TYPES.find((d) => d.id === type)?.label ?? type;
}

export function DocumentCard({ c, index = 0 }: { c: CaseStudy; index?: number }) {
  const readGain = c.readabilityAfter - c.readabilityBefore;
  return (
    <Link
      href={`/work/${c.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-xl2 border border-robert-soft/60 bg-canvas shadow-card transition-all duration-500 ease-expo hover:-translate-y-1 hover:shadow-cardHover"
      style={{ transitionDelay: `${(index % 6) * 30}ms` }}
    >
      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden bg-snow">
        <div
          aria-hidden
          className="absolute inset-6 rounded-lg bg-canvas shadow-card transition-transform duration-700 ease-expo group-hover:-rotate-1"
        >
          <div className="h-6 border-b border-robert-soft/40 bg-robert-ghost/60" />
          <div className="space-y-2 p-4">
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-1.5 rounded-full bg-ink/10",
                  i === 2 && "w-3/4",
                  i === 4 && "w-2/3",
                  i === 6 && "w-1/2",
                )}
              />
            ))}
          </div>
        </div>
        <div
          aria-hidden
          className="absolute inset-8 translate-x-4 translate-y-4 rotate-3 rounded-lg bg-canvas shadow-card transition-transform duration-700 ease-expo group-hover:translate-x-6 group-hover:translate-y-6"
        >
          <div className="h-6 border-b border-robert/30 bg-robert/10" />
          <div className="space-y-2 p-4">
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-1.5 rounded-full bg-robert/30",
                  i === 1 && "w-3/4",
                  i === 3 && "w-4/5",
                  i === 5 && "w-2/3",
                )}
              />
            ))}
          </div>
        </div>
        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-canvas/95 px-3 py-1 text-xs font-medium shadow-card backdrop-blur">
          <span aria-hidden>{countryFlag(c.country)}</span>
          <span className="text-ink-soft">{c.countryName}</span>
        </div>
        <div className="absolute right-4 top-4 rounded-full bg-ink/90 px-3 py-1 text-xs text-white">
          {c.turnaroundHours < 48 ? "24h" : c.turnaroundHours < 72 ? "48h" : `${Math.round(c.turnaroundHours / 24)}d`}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-center gap-2 text-xs text-ink-muted">
          <span aria-hidden>{docIcon(c.documentType)}</span>
          <span>{docLabel(c.documentType)}</span>
          <span className="text-robert-soft">•</span>
          <span className="capitalize">{c.editingLevel.replace("-", " ")}</span>
        </div>
        <h3 className="font-display text-xl leading-tight text-ink group-hover:text-robert">
          {c.title}
        </h3>
        <p className="text-sm text-ink-soft line-clamp-2">{c.editorsNote}</p>
        <div className="mt-auto flex items-center justify-between border-t border-robert-soft/50 pt-4 text-xs">
          <span className="font-mono text-edit">
            {Math.round(c.turnaroundHours / 24)}d turnaround
          </span>
          <span className="font-mono text-robert">
            {readGain > 0 ? `+${readGain}% accuracy` : "delivered"}
          </span>
        </div>
      </div>
    </Link>
  );
}
