import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { assertAdmin } from "./admin";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const rows = await ctx.db
      .query("testimonials")
      .withIndex("by_order")
      .collect();
    return rows
      .filter((r) => r.active)
      .map(({ _id, _creationTime, ...r }) => {
        void _creationTime;
        return { id: _id, ...r };
      });
  },
});

export const listAllAdmin = query({
  args: { token: v.string() },
  handler: async (ctx, { token }) => {
    assertAdmin(token);
    const rows = await ctx.db
      .query("testimonials")
      .withIndex("by_order")
      .collect();
    return rows.map(({ _id, _creationTime, ...r }) => {
      void _creationTime;
      return { id: _id, ...r };
    });
  },
});

export const create = mutation({
  args: {
    token: v.string(),
    quote: v.string(),
    who: v.string(),
    order: v.number(),
    active: v.boolean(),
  },
  handler: async (ctx, { token, ...data }) => {
    assertAdmin(token);
    return await ctx.db.insert("testimonials", data);
  },
});

export const update = mutation({
  args: {
    token: v.string(),
    id: v.id("testimonials"),
    quote: v.string(),
    who: v.string(),
    order: v.number(),
    active: v.boolean(),
  },
  handler: async (ctx, { token, id, ...data }) => {
    assertAdmin(token);
    await ctx.db.patch(id, data);
    return id;
  },
});

export const remove = mutation({
  args: { token: v.string(), id: v.id("testimonials") },
  handler: async (ctx, { token, id }) => {
    assertAdmin(token);
    await ctx.db.delete(id);
  },
});

export const seedPublic = mutation({
  args: { items: v.array(v.any()) },
  handler: async (ctx, { items }) => {
    const existing = await ctx.db.query("testimonials").collect();
    if (existing.length > 0) return existing.length;
    for (const it of items) await ctx.db.insert("testimonials", it);
    return items.length;
  },
});
