import { v } from "convex/values";
import { query, mutation, internalMutation } from "./_generated/server";
import { assertAdmin } from "./admin";

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

export const listForAdmin = query({
  args: { token: v.string() },
  handler: async (ctx, { token }) => {
    assertAdmin(token);
    const rows = await ctx.db.query("cases").collect();
    return rows
      .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""))
      .map((r) => ({ id: r._id, ...stripSystem(r) }));
  },
});

const caseFields = {
  slug: v.string(),
  title: v.string(),
  client: v.string(),
  country: v.string(),
  countryName: v.string(),
  language: v.string(),
  languageName: v.string(),
  documentType: v.string(),
  industry: v.string(),
  editingLevel: v.string(),
  wordCountBefore: v.number(),
  wordCountAfter: v.number(),
  readabilityBefore: v.number(),
  readabilityAfter: v.number(),
  turnaroundHours: v.number(),
  date: v.string(),
  excerptBefore: v.string(),
  excerptAfter: v.string(),
  editorsNote: v.string(),
  tags: v.array(v.string()),
  rating: v.number(),
};

export const create = mutation({
  args: { token: v.string(), ...caseFields },
  handler: async (ctx, { token, ...data }) => {
    assertAdmin(token);
    const existing = await ctx.db
      .query("cases")
      .withIndex("by_slug", (q) => q.eq("slug", data.slug))
      .first();
    if (existing) throw new Error(`Slug "${data.slug}" already exists`);
    return await ctx.db.insert("cases", data);
  },
});

export const update = mutation({
  args: { token: v.string(), id: v.id("cases"), ...caseFields },
  handler: async (ctx, { token, id, ...data }) => {
    assertAdmin(token);
    await ctx.db.replace(id, data);
    return id;
  },
});

export const remove = mutation({
  args: { token: v.string(), id: v.id("cases") },
  handler: async (ctx, { token, id }) => {
    assertAdmin(token);
    await ctx.db.delete(id);
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
