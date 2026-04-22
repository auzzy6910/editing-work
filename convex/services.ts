import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { assertAdmin } from "./admin";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const rows = await ctx.db
      .query("services")
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
      .query("services")
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
    slug: v.string(),
    icon: v.string(),
    name: v.string(),
    price: v.string(),
    body: v.string(),
    items: v.array(v.string()),
    order: v.number(),
    active: v.boolean(),
  },
  handler: async (ctx, { token, ...data }) => {
    assertAdmin(token);
    return await ctx.db.insert("services", data);
  },
});

export const update = mutation({
  args: {
    token: v.string(),
    id: v.id("services"),
    slug: v.string(),
    icon: v.string(),
    name: v.string(),
    price: v.string(),
    body: v.string(),
    items: v.array(v.string()),
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
  args: { token: v.string(), id: v.id("services") },
  handler: async (ctx, { token, id }) => {
    assertAdmin(token);
    await ctx.db.delete(id);
  },
});

export const seedPublic = mutation({
  args: { items: v.array(v.any()) },
  handler: async (ctx, { items }) => {
    const existing = await ctx.db.query("services").collect();
    if (existing.length > 0) return existing.length;
    for (const it of items) await ctx.db.insert("services", it);
    return items.length;
  },
});
