"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Mounts children only when the wrapper enters the viewport.
 * Pair with next/dynamic() to defer loading a heavy client component's
 * JS until the user scrolls near the section — great for reactive
 * widgets that are below the fold.
 */
export function LazyInView({
  children,
  placeholder,
  rootMargin = "200px",
  minHeight = 400,
}: {
  children: ReactNode;
  placeholder?: ReactNode;
  rootMargin?: string;
  minHeight?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current || visible) return;
    const el = ref.current;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [visible, rootMargin]);

  return (
    <div ref={ref} style={{ minHeight: visible ? undefined : minHeight }}>
      {visible ? children : (placeholder ?? null)}
    </div>
  );
}
