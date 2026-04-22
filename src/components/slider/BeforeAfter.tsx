"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface Props {
  before: string;
  after: string;
  title?: string;
  compact?: boolean;
  className?: string;
}

export function BeforeAfter({ before, after, title, compact, className }: Props) {
  const [pos, setPos] = useState(52);
  const [dragging, setDragging] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const update = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const ratio = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(4, Math.min(96, ratio)));
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent | TouchEvent) => {
      const x = "touches" in e ? e.touches[0].clientX : e.clientX;
      update(x);
    };
    const onUp = () => setDragging(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };
  }, [dragging, update]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPos((p) => Math.max(4, p - 4));
    if (e.key === "ArrowRight") setPos((p) => Math.min(96, p + 4));
    if (e.key === "Home") setPos(4);
    if (e.key === "End") setPos(96);
  };

  return (
    <div
      ref={ref}
      className={cn(
        "relative select-none overflow-hidden rounded-xl2 border border-robert-soft/70 bg-canvas shadow-card",
        compact ? "aspect-[16/9]" : "aspect-[4/3] md:aspect-[16/10]",
        className,
      )}
    >
      {/* After side (full) */}
      <div className="absolute inset-0 bg-gradient-to-br from-robert-ghost via-canvas to-canvas">
        <DocPane
          label="AFTER"
          badgeClass="bg-robert text-white"
          body={after}
          tone="after"
          title={title}
        />
      </div>

      {/* Before side (clipped) */}
      <div
        className="absolute inset-y-0 left-0 overflow-hidden"
        style={{ width: `${pos}%` }}
        aria-hidden
      >
        <div className="h-full w-full bg-canvas">
          <DocPane
            label="BEFORE"
            badgeClass="bg-ink text-white"
            body={before}
            tone="before"
            title={title}
          />
        </div>
      </div>

      {/* Divider */}
      <button
        type="button"
        role="slider"
        aria-label="Drag to reveal before and after"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        tabIndex={0}
        onKeyDown={onKey}
        onMouseDown={() => setDragging(true)}
        onTouchStart={() => setDragging(true)}
        className="absolute top-0 bottom-0 z-10 -translate-x-1/2 cursor-ew-resize outline-none"
        style={{ left: `${pos}%` }}
      >
        <div className="relative h-full w-0.5 bg-robert">
          <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-canvas shadow-cardHover ring-2 ring-robert">
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-robert">
              <path
                fill="currentColor"
                d="M8.5 5.5 3 11l5.5 5.5 1.4-1.4L6.4 12l3.5-3.1zM15.5 5.5l-1.4 1.4L17.6 10H10v2h7.6l-3.5 3.1 1.4 1.4L21 11z"
              />
            </svg>
          </div>
        </div>
      </button>

      {/* Corner labels */}
      <div className="pointer-events-none absolute left-4 top-4 rounded-full bg-ink/90 px-3 py-1 text-[10px] font-semibold tracking-widest text-white">
        BEFORE
      </div>
      <div className="pointer-events-none absolute right-4 top-4 rounded-full bg-robert px-3 py-1 text-[10px] font-semibold tracking-widest text-white">
        AFTER
      </div>
    </div>
  );
}

function DocPane({
  label,
  badgeClass,
  body,
  tone,
  title,
}: {
  label: string;
  badgeClass: string;
  body: string;
  tone: "before" | "after";
  title?: string;
}) {
  return (
    <div className="flex h-full w-full flex-col gap-4 p-6 md:p-10">
      <div className="flex items-center gap-2 text-ink-muted">
        <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-widest", badgeClass)}>
          {label}
        </span>
        {title && <span className="truncate text-xs">{title}</span>}
      </div>
      <article
        className={cn(
          "prose-doc flex-1 overflow-hidden rounded-lg border bg-canvas/60 p-6 font-mono text-[13px] leading-relaxed shadow-inner",
          tone === "before"
            ? "border-dashed border-edit/30 text-ink-soft"
            : "border-robert-soft text-ink",
        )}
      >
        <p>{body}</p>
      </article>
    </div>
  );
}
