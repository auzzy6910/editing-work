/* Seed Convex with the 12 fictional cases from src/lib/cases.ts. */
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api";
import { CASES } from "../src/lib/cases";

const url =
  process.env.NEXT_PUBLIC_CONVEX_URL ?? "https://precise-reindeer-603.convex.cloud";

async function main() {
  const client = new ConvexHttpClient(url);
  const count = await client.mutation(api.cases.seedPublic, { items: CASES });
  console.log(`Seeded ${count} cases to ${url}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
