/**
 * Shared admin-token gate used by every admin-only mutation/query.
 * Set ADMIN_TOKEN on the Convex deployment via:
 *   npx convex env set ADMIN_TOKEN <value>
 * or in the Convex dashboard → Settings → Environment Variables.
 */
export function assertAdmin(token: string) {
  const expected = process.env.ADMIN_TOKEN;
  if (!expected) throw new Error("ADMIN_TOKEN is not set on the Convex deployment");
  if (token !== expected) throw new Error("Invalid admin token");
}
