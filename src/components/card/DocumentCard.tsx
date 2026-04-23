import Link from "next/link";
import { CaseStudy, DOCUMENT_TYPES } from "@/lib/types";
import { countryFlag } from "@/lib/utils";

function docIcon(type: string) {
  return DOCUMENT_TYPES.find((d) => d.id === type)?.icon ?? "📄";
}
function docLabel(type: string) {
  return DOCUMENT_TYPES.find((d) => d.id === type)?.label ?? type;
}
function docImage(type: string) {
  switch (type) {
    case "birth-certificate":
      return "/images/docs/birth.webp";
    case "marriage-certificate":
      return "/images/docs/marriage.webp";
    case "kcpe-kcse-certificate":
      return "/images/docs/kcse.webp";
    case "travel-document":
      return "/images/docs/travel.webp";
    case "degree-diploma-craft":
      return "/images/docs/degree.jpg";
    default:
      return "/images/docs/degree.jpg";
  }
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
      <div className="relative h-56 overflow-hidden bg-snow">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={docImage(c.documentType)}
          alt={docLabel(c.documentType)}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-contain bg-snow transition-transform duration-700 ease-expo group-hover:scale-[1.04]"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink/55 via-ink/5 to-transparent"
        />
        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-canvas/95 px-3 py-1 text-xs font-medium shadow-card backdrop-blur">
          <span aria-hidden>{countryFlag(c.country)}</span>
          <span className="text-ink-soft">{c.countryName}</span>
        </div>
        <div className="absolute right-4 top-4 rounded-full bg-ink/90 px-3 py-1 text-xs text-white">
          {c.turnaroundHours < 48 ? "24h" : c.turnaroundHours < 72 ? "48h" : `${Math.round(c.turnaroundHours / 24)}d`}
        </div>
        <div className="absolute bottom-3 left-4 flex items-center gap-2 rounded-full bg-canvas/95 px-3 py-1 text-xs font-medium shadow-card backdrop-blur">
          <span aria-hidden>{docIcon(c.documentType)}</span>
          <span className="text-ink-soft">{docLabel(c.documentType)}</span>
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
