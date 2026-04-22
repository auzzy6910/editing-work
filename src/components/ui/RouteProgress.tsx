"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Top progress bar that animates on every pathname change.
 * Works with Next.js App Router — usePathname triggers the effect
 * on navigation, and we fade the bar through 3 keyframes.
 */
export function RouteProgress() {
  const pathname = usePathname();
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    setNonce((n) => n + 1);
  }, [pathname]);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-0.5">
      <AnimatePresence mode="wait">
        <motion.span
          key={nonce}
          initial={{ width: "0%", opacity: 1 }}
          animate={{ width: ["0%", "70%", "100%"], opacity: [1, 1, 0] }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, times: [0, 0.45, 1] }}
          className="block h-full bg-gradient-to-r from-robert via-robert to-ink"
        />
      </AnimatePresence>
    </div>
  );
}
