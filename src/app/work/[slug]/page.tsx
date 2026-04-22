import { notFound } from "next/navigation";
import { CASES } from "@/lib/cases";
import { CaseDetailView } from "@/components/case/CaseDetailView";

export function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const c = CASES.find((x) => x.slug === params.slug);
  if (!c) return { title: "Not found" };
  return { title: `${c.title} — Robert Editing`, description: c.editorsNote };
}

export default function CasePage({ params }: { params: { slug: string } }) {
  const c = CASES.find((x) => x.slug === params.slug);
  if (!c) notFound();
  const idx = CASES.findIndex((x) => x.slug === c.slug);
  const next = CASES[(idx + 1) % CASES.length];

  return <CaseDetailView initial={c} initialNext={next} />;
}
