import { v } from "convex/values";
import { query, mutation, internalMutation } from "./_generated/server";

export const listAll = query({
  args: {},
  handler: async (ctx) => {
    const rows = await ctx.db.query("cases").collect();
    return rows
      .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""))
      .map(stripSystem);
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    const row = await ctx.db
      .query("cases")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();
    return row ? stripSystem(row) : null;
  },
});

export const listSlugs = query({
  args: {},
  handler: async (ctx) => {
    const rows = await ctx.db.query("cases").collect();
    return rows.map((r) => r.slug);
  },
});

export const upsertMany = internalMutation({
  args: { items: v.array(v.any()) },
  handler: async (ctx, { items }) => {
    for (const item of items) {
      const existing = await ctx.db
        .query("cases")
        .withIndex("by_slug", (q) => q.eq("slug", item.slug))
        .first();
      if (existing) {
        await ctx.db.replace(existing._id, item);
      } else {
        await ctx.db.insert("cases", item);
      }
    }
    return items.length;
  },
});

export const seedPublic = mutation({
  args: { items: v.array(v.any()) },
  handler: async (ctx, { items }) => {
    for (const item of items) {
      const existing = await ctx.db
        .query("cases")
        .withIndex("by_slug", (q) => q.eq("slug", item.slug))
        .first();
      if (existing) {
        await ctx.db.replace(existing._id, item);
      } else {
        await ctx.db.insert("cases", item);
      }
    }
    return items.length;
  },
});

function stripSystem<T extends { _id: unknown; _creationTime: unknown }>(row: T) {
  const { _id, _creationTime, ...rest } = row as Record<string, unknown> & {
    _id: unknown;
    _creationTime: unknown;
  };
  void _id;
  void _creationTime;
  return rest as Omit<T, "_id" | "_creationTime">;
}
