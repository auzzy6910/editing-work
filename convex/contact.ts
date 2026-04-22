import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

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
