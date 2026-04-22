export type DocumentType =
  | "academic-paper"
  | "book-manuscript"
  | "legal-contract"
  | "thesis"
  | "article"
  | "business-report"
  | "resume"
  | "cover-letter"
  | "speech"
  | "grant-proposal"
  | "research-report"
  | "website-copy"
  | "ux-copy"
  | "fiction"
  | "poetry"
  | "press-release"
  | "whitepaper"
  | "marketing-email"
  | "screenplay"
  | "social-thread";

export type Industry =
  | "academic"
  | "legal"
  | "tech"
  | "finance"
  | "healthcare"
  | "creative"
  | "ngo"
  | "government";

export type EditingLevel =
  | "proofreading"
  | "copy-edit"
  | "line-edit"
  | "developmental"
  | "ghostwriting";

export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  country: string; // ISO2
  countryName: string;
  language: string; // ISO code
  languageName: string;
  documentType: DocumentType;
  industry: Industry;
  editingLevel: EditingLevel;
  wordCountBefore: number;
  wordCountAfter: number;
  readabilityBefore: number; // Flesch
  readabilityAfter: number;
  turnaroundHours: number;
  date: string; // ISO
  excerptBefore: string;
  excerptAfter: string;
  editorsNote: string;
  tags: string[];
  rating: number; // 1-5
}

export const DOCUMENT_TYPES: { id: DocumentType; label: string; icon: string }[] = [
  { id: "academic-paper", label: "Academic paper", icon: "📄" },
  { id: "book-manuscript", label: "Book manuscript", icon: "📘" },
  { id: "legal-contract", label: "Legal contract", icon: "📜" },
  { id: "thesis", label: "Thesis / dissertation", icon: "🎓" },
  { id: "article", label: "Article / essay", icon: "📰" },
  { id: "business-report", label: "Business report", icon: "💼" },
  { id: "resume", label: "Resume / CV", icon: "🧾" },
  { id: "cover-letter", label: "Cover letter", icon: "✉️" },
  { id: "speech", label: "Speech / script", icon: "🎤" },
  { id: "grant-proposal", label: "Grant proposal", icon: "💡" },
  { id: "research-report", label: "Research report", icon: "🧪" },
  { id: "website-copy", label: "Website copy", icon: "🌐" },
  { id: "ux-copy", label: "App UX copy", icon: "📱" },
  { id: "fiction", label: "Fiction", icon: "📕" },
  { id: "poetry", label: "Poetry", icon: "🕊" },
  { id: "press-release", label: "Press release", icon: "🗞" },
  { id: "whitepaper", label: "Whitepaper", icon: "📊" },
  { id: "marketing-email", label: "Marketing email", icon: "📧" },
  { id: "screenplay", label: "Screenplay", icon: "🎬" },
  { id: "social-thread", label: "Social thread", icon: "🧵" },
];

export const INDUSTRIES: { id: Industry; label: string }[] = [
  { id: "academic", label: "Academic" },
  { id: "legal", label: "Legal" },
  { id: "tech", label: "Tech" },
  { id: "finance", label: "Finance" },
  { id: "healthcare", label: "Healthcare" },
  { id: "creative", label: "Creative" },
  { id: "ngo", label: "NGO" },
  { id: "government", label: "Government" },
];

export const EDITING_LEVELS: { id: EditingLevel; label: string }[] = [
  { id: "proofreading", label: "Proofreading" },
  { id: "copy-edit", label: "Copy-edit" },
  { id: "line-edit", label: "Line-edit" },
  { id: "developmental", label: "Developmental" },
  { id: "ghostwriting", label: "Ghostwriting" },
];
