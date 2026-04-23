"use client";

import dynamic from "next/dynamic";
import { LazyInView } from "@/components/ui/LazyInView";
import { SkeletonCard, SkeletonText, Skeleton } from "@/components/ui/Skeleton";

// Each heavy section is code-split into its own chunk and only fetched
// when the user scrolls within 200px of it.

const LiveFeaturedWork = dynamic(
  () =>
    import("@/components/home/LiveHomeSections").then((m) => ({
      default: m.LiveFeaturedWork,
    })),
  { ssr: false, loading: () => <FeaturedFallback /> },
);

const LiveProcess = dynamic(
  () =>
    import("@/components/home/LiveProcess").then((m) => ({ default: m.LiveProcess })),
  { ssr: false, loading: () => <ProcessFallback /> },
);

const LiveTestimonials = dynamic(
  () =>
    import("@/components/home/LiveTestimonials").then((m) => ({
      default: m.LiveTestimonials,
    })),
  { ssr: false, loading: () => <TestimonialsFallback /> },
);

const LiveCTA = dynamic(
  () => import("@/components/home/LiveCTA").then((m) => ({ default: m.LiveCTA })),
  { ssr: false, loading: () => <CtaFallback /> },
);

export function LazyFeaturedWork() {
  return (
    <LazyInView placeholder={<FeaturedFallback />} minHeight={720}>
      <LiveFeaturedWork />
    </LazyInView>
  );
}

export function LazyProcess() {
  return (
    <LazyInView placeholder={<ProcessFallback />} minHeight={560}>
      <LiveProcess />
    </LazyInView>
  );
}

export function LazyTestimonials() {
  return (
    <LazyInView placeholder={<TestimonialsFallback />} minHeight={560}>
      <LiveTestimonials />
    </LazyInView>
  );
}

export function LazyCTA() {
  return (
    <LazyInView placeholder={<CtaFallback />} minHeight={360}>
      <LiveCTA />
    </LazyInView>
  );
}

function FeaturedFallback() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <Skeleton className="h-3 w-24" />
      <Skeleton className="mt-3 h-10 w-80" />
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} className="h-[420px]" />
        ))}
      </div>
    </section>
  );
}

function ProcessFallback() {
  return (
    <section className="border-y border-robert-soft/50 bg-snow py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="mt-3 h-10 w-96" />
        <div className="mt-12 grid gap-6 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl2 border border-robert-soft/60 bg-canvas p-6 shadow-card"
            >
              <Skeleton className="h-3 w-8" />
              <Skeleton className="mt-3 h-6 w-24" />
              <SkeletonText className="mt-3" lines={2} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsFallback() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <Skeleton className="h-3 w-28" />
      <Skeleton className="mt-3 h-10 w-[28rem] max-w-full" />
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl2 border border-robert-soft/60 bg-canvas p-8 shadow-card"
          >
            <SkeletonText lines={4} />
            <Skeleton className="mt-6 h-3 w-1/2" />
          </div>
        ))}
      </div>
    </section>
  );
}

function CtaFallback() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-24">
      <div className="rounded-xl2 bg-ink/10 p-12 md:p-20">
        <Skeleton className="mx-auto h-3 w-32 bg-white/20" />
        <Skeleton className="mx-auto mt-4 h-10 w-96 max-w-full bg-white/20" />
        <Skeleton className="mx-auto mt-4 h-4 w-[28rem] max-w-full bg-white/20" />
      </div>
    </section>
  );
}
