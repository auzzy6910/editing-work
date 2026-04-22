export type DocumentType =
  | "birth-certificate"
  | "marriage-certificate"
  | "kcpe-kcse-certificate"
  | "travel-document"
  | "degree-diploma-craft";

export type Industry =
  | "civil-registration"
  | "education"
  | "immigration"
  | "tertiary-education";

export type ServiceType =
  | "new-application"
  | "correction"
  | "replacement"
  | "expedited"
  | "verification";

// Legacy alias so existing references compile during the pivot.
export type EditingLevel = ServiceType;

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
  editingLevel: ServiceType;
  wordCountBefore: number;
  wordCountAfter: number;
  readabilityBefore: number;
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
  { id: "birth-certificate", label: "Birth Certificate", icon: "🧾" },
  { id: "marriage-certificate", label: "Marriage Certificate", icon: "💍" },
  { id: "kcpe-kcse-certificate", label: "KCPE & KCSE Certificate", icon: "🎓" },
  { id: "travel-document", label: "Travel Document (Passport/Visa)", icon: "🛂" },
  { id: "degree-diploma-craft", label: "Degree, Diploma & Craft Certificate", icon: "📜" },
];

export const INDUSTRIES: { id: Industry; label: string }[] = [
  { id: "civil-registration", label: "Civil certificates" },
  { id: "education", label: "School certificates" },
  { id: "immigration", label: "Travel documents" },
  { id: "tertiary-education", label: "Tertiary certificates" },
];

export const EDITING_LEVELS: { id: ServiceType; label: string }[] = [
  { id: "correction", label: "Text edit" },
  { id: "replacement", label: "Scan retouch" },
  { id: "expedited", label: "Rush edit" },
  { id: "new-application", label: "Full rebuild" },
  { id: "verification", label: "Detail check" },
];

export const SERVICE_TYPES = EDITING_LEVELS;
