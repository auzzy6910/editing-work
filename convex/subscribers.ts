import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { assertAdmin } from "./admin";

export const subscribe = mutation({
  args: {
    email: v.string(),
    source: v.optional(v.string()),
  },
  handler: async (ctx, { email, source }) => {
    const clean = email.trim().toLowerCase();
    if (!clean.includes("@") || clean.length < 5) {
      throw new Error("Enter a valid email");
    }
    const existing = await ctx.db
      .query("subscribers")
      .withIndex("by_email", (q) => q.eq("email", clean))
      .first();
    if (existing) return { ok: true, alreadySubscribed: true };
    await ctx.db.insert("subscribers", {
      email: clean,
      source,
      subscribedAt: Date.now(),
    });
    return { ok: true, alreadySubscribed: false };
  },
});

export const listForAdmin = query({
  args: { token: v.string() },
  handler: async (ctx, { token }) => {
    assertAdmin(token);
    const rows = await ctx.db.query("subscribers").collect();
    return rows
      .sort((a, b) => b.subscribedAt - a.subscribedAt)
      .map((r) => ({
        id: r._id,
        email: r.email,
        source: r.source ?? "",
        subscribedAt: r.subscribedAt,
      }));
  },
});

export const remove = mutation({
  args: { token: v.string(), id: v.id("subscribers") },
  handler: async (ctx, { token, id }) => {
    assertAdmin(token);
    await ctx.db.delete(id);
  },
});
