"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Lightweight word-level diff: tokenizes on whitespace and uses a simple
 * Longest Common Subsequence to mark removed and inserted tokens. Good enough
 * for marketing excerpts; we are not replacing diff-match-patch here.
 */
function wordDiff(a: string, b: string) {
  const aw = a.split(/(\s+)/);
  const bw = b.split(/(\s+)/);
  const m = aw.length;
  const n = bw.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      dp[i][j] = aw[i] === bw[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }
  const out: { type: "same" | "del" | "ins"; text: string }[] = [];
  let i = 0;
  let j = 0;
  while (i < m && j < n) {
    if (aw[i] === bw[j]) {
      out.push({ type: "same", text: aw[i] });
      i++;
      j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      out.push({ type: "del", text: aw[i] });
      i++;
    } else {
      out.push({ type: "ins", text: bw[j] });
      j++;
    }
  }
  while (i < m) out.push({ type: "del", text: aw[i++] });
  while (j < n) out.push({ type: "ins", text: bw[j++] });
  return out;
}

export function AnimatedDiff({ before, after }: { before: string; after: string }) {
  const tokens = wordDiff(before, after);
  const [armed, setArmed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setArmed(true)),
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="rounded-xl2 border border-robert-soft/70 bg-canvas p-6 font-mono text-sm leading-relaxed text-ink shadow-card"
    >
      {tokens.map((t, idx) => {
        if (t.type === "same") return <span key={idx}>{t.text}</span>;
        if (t.type === "del")
          return (
            <span
              key={idx}
              className={cn(
                "text-edit transition-[opacity,line-height] duration-700 ease-expo",
                armed ? "line-through opacity-60" : "opacity-100",
              )}
              style={{ transitionDelay: `${idx * 18}ms` }}
            >
              {t.text}
            </span>
          );
        return (
          <span
            key={idx}
            className={cn(
              "text-robert transition-opacity duration-700 ease-expo",
              armed ? "opacity-100" : "opacity-0",
            )}
            style={{ transitionDelay: `${idx * 18}ms` }}
          >
            {t.text}
          </span>
        );
      })}
    </div>
  );
}
