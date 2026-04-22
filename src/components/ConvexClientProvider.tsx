"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { useState } from "react";

const CONVEX_URL =
  process.env.NEXT_PUBLIC_CONVEX_URL ?? "https://precise-reindeer-603.convex.cloud";

export function ConvexClientProvider({ children }: { children: React.ReactNode }) {
  const [client] = useState(() => new ConvexReactClient(CONVEX_URL));
  return <ConvexProvider client={client}>{children}</ConvexProvider>;
}
