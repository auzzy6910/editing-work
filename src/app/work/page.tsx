import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Skeleton, SkeletonCard } from "@/components/ui/Skeleton";

const FilterConsole = dynamic(
  () =>
    import("@/components/panel/FilterConsole").then((m) => ({
      default: m.FilterConsole,
    })),
  { loading: () => <FilterFallback /> },
);

export const metadata = {
  title: "Recent cases — Robert Editing",
  description:
    "Every Kenyan document case we've handled. Filter by county, certificate, agency, service.",
};

export default function WorkPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <header className="mb-12 max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-robert">
          Recent cases
        </p>
        <h1 className="mt-2 font-display text-3xl sm:text-5xl md:text-6xl">
          What we&apos;ve sorted out.
        </h1>
        <p className="mt-4 text-lg text-ink-soft">
          Real cases, real outcomes. Filter the console below to narrow results — the URL
          updates so you can share any view.
        </p>
      </header>
      <Suspense fallback={<FilterFallback />}>
        <FilterConsole />
      </Suspense>
    </div>
  );
}

function FilterFallback() {
  return (
    <div className="grid gap-10 lg:grid-cols-[320px_1fr]">
      <aside>
        <div className="rounded-xl2 border border-robert-soft/60 bg-canvas p-6 shadow-card">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="mt-5 h-10 w-full rounded-full" />
          <div className="mt-6 space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
        </div>
      </aside>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} className="h-[420px]" />
        ))}
      </div>
    </div>
  );
}
