import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { assertAdmin } from "./admin";

export const submit = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    documentType: v.optional(v.string()),
    language: v.optional(v.string()),
    approximateWordCount: v.optional(v.string()),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    if (!args.name.trim()) throw new Error("Name is required");
    if (!args.email.includes("@")) throw new Error("Valid email required");
    if (args.message.trim().length < 10)
      throw new Error("Tell me a bit more (10+ characters)");

    const id = await ctx.db.insert("contacts", {
      ...args,
      submittedAt: Date.now(),
      status: "new",
      starred: false,
    });
    return id;
  },
});

export const recentCount = query({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db.query("contacts").collect();
    return all.length;
  },
});

export const listForAdmin = query({
  args: { token: v.string() },
  handler: async (ctx, { token }) => {
    const expected = process.env.ADMIN_TOKEN;
    if (!expected || token !== expected) {
      return { ok: false as const, count: 0, items: [] };
    }
    const all = await ctx.db.query("contacts").collect();
    const items = all
      .sort((a, b) => b.submittedAt - a.submittedAt)
      .map((r) => ({
        id: r._id,
        name: r.name,
        email: r.email,
        documentType: r.documentType ?? "",
        language: r.language ?? "",
        approximateWordCount: r.approximateWordCount ?? "",
        message: r.message,
        submittedAt: r.submittedAt,
        status: r.status ?? "new",
        starred: r.starred ?? false,
      }));
    return { ok: true as const, count: items.length, items };
  },
});

export const setStatus = mutation({
  args: {
    token: v.string(),
    id: v.id("contacts"),
    status: v.string(),
  },
  handler: async (ctx, { token, id, status }) => {
    assertAdmin(token);
    await ctx.db.patch(id, { status });
  },
});

export const toggleStarred = mutation({
  args: { token: v.string(), id: v.id("contacts") },
  handler: async (ctx, { token, id }) => {
    assertAdmin(token);
    const row = await ctx.db.get(id);
    if (!row) return;
    await ctx.db.patch(id, { starred: !(row.starred ?? false) });
  },
});

export const remove = mutation({
  args: { token: v.string(), id: v.id("contacts") },
  handler: async (ctx, { token, id }) => {
    assertAdmin(token);
    await ctx.db.delete(id);
  },
});
