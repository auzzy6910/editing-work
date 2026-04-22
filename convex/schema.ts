import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  cases: defineTable({
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
  })
    .index("by_slug", ["slug"])
    .index("by_date", ["date"]),

  contacts: defineTable({
    name: v.string(),
    email: v.string(),
    documentType: v.optional(v.string()),
    language: v.optional(v.string()),
    approximateWordCount: v.optional(v.string()),
    message: v.string(),
    submittedAt: v.number(),
  }),
});
