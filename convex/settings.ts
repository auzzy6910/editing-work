import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { assertAdmin } from "./admin";

export const all = query({
  args: {},
  handler: async (ctx) => {
    const rows = await ctx.db.query("settings").collect();
    const out: Record<string, string> = {};
    for (const r of rows) out[r.key] = r.value;
    return out;
  },
});

export const setOne = mutation({
  args: { token: v.string(), key: v.string(), value: v.string() },
  handler: async (ctx, { token, key, value }) => {
    assertAdmin(token);
    const existing = await ctx.db
      .query("settings")
      .withIndex("by_key", (q) => q.eq("key", key))
      .first();
    if (existing) await ctx.db.patch(existing._id, { value });
    else await ctx.db.insert("settings", { key, value });
  },
});

export const setMany = mutation({
  args: {
    token: v.string(),
    values: v.array(v.object({ key: v.string(), value: v.string() })),
  },
  handler: async (ctx, { token, values }) => {
    assertAdmin(token);
    for (const { key, value } of values) {
      const existing = await ctx.db
        .query("settings")
        .withIndex("by_key", (q) => q.eq("key", key))
        .first();
      if (existing) await ctx.db.patch(existing._id, { value });
      else await ctx.db.insert("settings", { key, value });
    }
  },
});

export const seedPublic = mutation({
  args: { values: v.array(v.object({ key: v.string(), value: v.string() })) },
  handler: async (ctx, { values }) => {
    for (const { key, value } of values) {
      const existing = await ctx.db
        .query("settings")
        .withIndex("by_key", (q) => q.eq("key", key))
        .first();
      if (!existing) await ctx.db.insert("settings", { key, value });
    }
    return values.length;
  },
});
