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
    // "new" | "replied" | "archived" — optional so old rows stay valid.
    status: v.optional(v.string()),
    starred: v.optional(v.boolean()),
  }),

  testimonials: defineTable({
    quote: v.string(),
    who: v.string(),
    order: v.number(),
    active: v.boolean(),
  }).index("by_order", ["order"]),

  services: defineTable({
    slug: v.string(),
    icon: v.string(),
    name: v.string(),
    price: v.string(),
    body: v.string(),
    items: v.array(v.string()),
    order: v.number(),
    active: v.boolean(),
  })
    .index("by_slug", ["slug"])
    .index("by_order", ["order"]),

  processSteps: defineTable({
    number: v.string(),
    title: v.string(),
    body: v.string(),
    order: v.number(),
    active: v.boolean(),
  }).index("by_order", ["order"]),

  settings: defineTable({
    key: v.string(),
    value: v.string(),
  }).index("by_key", ["key"]),

  subscribers: defineTable({
    email: v.string(),
    source: v.optional(v.string()),
    subscribedAt: v.number(),
  }).index("by_email", ["email"]),
});
