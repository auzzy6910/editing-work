export type DocumentType =
  // Academic & research
  | "academic-paper"
  | "thesis"
  | "conference-paper"
  | "literature-review"
  | "systematic-review"
  | "research-proposal"
  | "research-report"
  | "lab-report"
  | "policy-brief"
  | "whitepaper"
  | "textbook"
  | "course-syllabus"
  | "lesson-plan"
  | "training-manual"
  | "elearning-module"
  // Books & long-form
  | "book-manuscript"
  | "fiction"
  | "nonfiction-book"
  | "memoir"
  | "biography"
  | "childrens-picture-book"
  | "childrens-middle-grade"
  | "childrens-ya"
  | "childrens-board-book"
  | "short-story-collection"
  | "poetry"
  | "poetry-collection"
  | "graphic-novel"
  | "cookbook"
  | "travel-guide"
  | "self-help-book"
  | "anthology"
  // Business & corporate
  | "business-report"
  | "annual-report"
  | "board-report"
  | "pitch-deck"
  | "business-plan"
  | "executive-summary"
  | "decision-memo"
  | "consulting-report"
  | "market-research"
  | "case-study"
  | "internal-comms"
  // Legal
  | "legal-contract"
  | "terms-of-service"
  | "privacy-policy"
  | "patent-application"
  | "legal-brief"
  | "affidavit"
  | "compliance-doc"
  | "nda"
  | "legal-opinion"
  | "regulatory-submission"
  // Marketing / copy
  | "website-copy"
  | "landing-page"
  | "marketing-email"
  | "newsletter"
  | "brochure"
  | "ad-copy"
  | "product-description"
  | "seo-article"
  | "sales-case-study"
  | "press-release"
  | "press-kit"
  // Tech / UX
  | "ux-copy"
  | "api-docs"
  | "technical-docs"
  | "user-manual"
  | "release-notes"
  | "readme"
  | "design-doc"
  | "technical-whitepaper"
  // Medical & scientific
  | "medical-paper"
  | "clinical-trial-report"
  | "medical-guideline"
  | "patient-leaflet"
  | "medicolegal-report"
  // Creative / film / stage
  | "screenplay"
  | "tv-pilot"
  | "stage-play"
  | "podcast-script"
  | "video-game-script"
  | "song-lyrics"
  // Journalism
  | "article"
  | "op-ed"
  | "long-form-feature"
  | "magazine-article"
  | "interview-transcript"
  | "blog-post"
  // Speeches / presentations
  | "speech"
  | "keynote"
  | "sermon"
  | "wedding-speech"
  | "commencement-address"
  | "ted-talk"
  // Personal / admin
  | "resume"
  | "cover-letter"
  | "personal-statement"
  | "scholarship-essay"
  | "admissions-essay"
  | "linkedin-profile"
  | "bio"
  | "recommendation-letter"
  // Nonprofit / public sector
  | "grant-proposal"
  | "impact-report"
  | "government-report"
  | "manifesto"
  | "charter-bylaws"
  // Social / short form
  | "social-thread"
  | "substack-post"
  | "youtube-script"
  | "podcast-show-notes";

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

export type DocumentCategory =
  | "academic"
  | "books"
  | "business"
  | "legal"
  | "marketing"
  | "tech"
  | "medical"
  | "creative"
  | "journalism"
  | "speech"
  | "personal"
  | "nonprofit"
  | "social";

export const DOCUMENT_CATEGORIES: { id: DocumentCategory; label: string }[] = [
  { id: "academic", label: "Academic & research" },
  { id: "books", label: "Books & long-form" },
  { id: "business", label: "Business" },
  { id: "legal", label: "Legal" },
  { id: "marketing", label: "Marketing & copy" },
  { id: "tech", label: "Tech & UX" },
  { id: "medical", label: "Medical & scientific" },
  { id: "creative", label: "Creative (film/stage/game)" },
  { id: "journalism", label: "Journalism" },
  { id: "speech", label: "Speeches" },
  { id: "personal", label: "Personal & career" },
  { id: "nonprofit", label: "Nonprofit & public" },
  { id: "social", label: "Social & short-form" },
];

export const DOCUMENT_TYPES: {
  id: DocumentType;
  label: string;
  icon: string;
  category: DocumentCategory;
}[] = [
  // Academic & research
  { id: "academic-paper", label: "Academic paper", icon: "📄", category: "academic" },
  { id: "thesis", label: "Thesis / dissertation", icon: "🎓", category: "academic" },
  { id: "conference-paper", label: "Conference paper", icon: "🗓", category: "academic" },
  { id: "literature-review", label: "Literature review", icon: "📚", category: "academic" },
  { id: "systematic-review", label: "Systematic review", icon: "🔬", category: "academic" },
  { id: "research-proposal", label: "Research proposal", icon: "📝", category: "academic" },
  { id: "research-report", label: "Research report", icon: "🧪", category: "academic" },
  { id: "lab-report", label: "Lab report", icon: "⚗️", category: "academic" },
  { id: "policy-brief", label: "Policy brief", icon: "📋", category: "academic" },
  { id: "whitepaper", label: "Whitepaper", icon: "📊", category: "academic" },
  { id: "textbook", label: "Textbook", icon: "📖", category: "academic" },
  { id: "course-syllabus", label: "Course syllabus", icon: "🗒", category: "academic" },
  { id: "lesson-plan", label: "Lesson plan", icon: "✏️", category: "academic" },
  { id: "training-manual", label: "Training manual", icon: "🎯", category: "academic" },
  { id: "elearning-module", label: "e-learning module", icon: "💻", category: "academic" },
  // Books & long-form
  { id: "book-manuscript", label: "Book manuscript", icon: "📘", category: "books" },
  { id: "fiction", label: "Fiction", icon: "📕", category: "books" },
  { id: "nonfiction-book", label: "Nonfiction book", icon: "📗", category: "books" },
  { id: "memoir", label: "Memoir", icon: "🪶", category: "books" },
  { id: "biography", label: "Biography", icon: "👤", category: "books" },
  { id: "childrens-picture-book", label: "Children's picture book", icon: "🧸", category: "books" },
  { id: "childrens-middle-grade", label: "Children's middle-grade", icon: "🧒", category: "books" },
  { id: "childrens-ya", label: "Children's YA", icon: "🧑", category: "books" },
  { id: "childrens-board-book", label: "Children's board book", icon: "👶", category: "books" },
  { id: "short-story-collection", label: "Short story collection", icon: "📙", category: "books" },
  { id: "poetry", label: "Poetry", icon: "🕊", category: "books" },
  { id: "poetry-collection", label: "Poetry collection", icon: "🪷", category: "books" },
  { id: "graphic-novel", label: "Graphic novel", icon: "💭", category: "books" },
  { id: "cookbook", label: "Cookbook", icon: "🍳", category: "books" },
  { id: "travel-guide", label: "Travel guide", icon: "🧭", category: "books" },
  { id: "self-help-book", label: "Self-help book", icon: "🌱", category: "books" },
  { id: "anthology", label: "Anthology", icon: "📚", category: "books" },
  // Business & corporate
  { id: "business-report", label: "Business report", icon: "💼", category: "business" },
  { id: "annual-report", label: "Annual report", icon: "📈", category: "business" },
  { id: "board-report", label: "Board report", icon: "🏛", category: "business" },
  { id: "pitch-deck", label: "Pitch deck", icon: "🎯", category: "business" },
  { id: "business-plan", label: "Business plan", icon: "🧩", category: "business" },
  { id: "executive-summary", label: "Executive summary", icon: "📃", category: "business" },
  { id: "decision-memo", label: "Decision memo", icon: "🧠", category: "business" },
  { id: "consulting-report", label: "Consulting report", icon: "🧑‍💼", category: "business" },
  { id: "market-research", label: "Market research", icon: "📊", category: "business" },
  { id: "case-study", label: "Case study", icon: "🔍", category: "business" },
  { id: "internal-comms", label: "Internal comms", icon: "📣", category: "business" },
  // Legal
  { id: "legal-contract", label: "Legal contract", icon: "📜", category: "legal" },
  { id: "terms-of-service", label: "Terms of service", icon: "⚖️", category: "legal" },
  { id: "privacy-policy", label: "Privacy policy", icon: "🔒", category: "legal" },
  { id: "patent-application", label: "Patent application", icon: "💡", category: "legal" },
  { id: "legal-brief", label: "Legal brief", icon: "🧾", category: "legal" },
  { id: "affidavit", label: "Affidavit", icon: "🖋", category: "legal" },
  { id: "compliance-doc", label: "Compliance doc", icon: "📋", category: "legal" },
  { id: "nda", label: "NDA", icon: "🤝", category: "legal" },
  { id: "legal-opinion", label: "Legal opinion", icon: "🏛", category: "legal" },
  { id: "regulatory-submission", label: "Regulatory submission", icon: "🗂", category: "legal" },
  // Marketing / copy
  { id: "website-copy", label: "Website copy", icon: "🌐", category: "marketing" },
  { id: "landing-page", label: "Landing page", icon: "🧲", category: "marketing" },
  { id: "marketing-email", label: "Marketing email", icon: "📧", category: "marketing" },
  { id: "newsletter", label: "Newsletter", icon: "📰", category: "marketing" },
  { id: "brochure", label: "Brochure", icon: "📎", category: "marketing" },
  { id: "ad-copy", label: "Ad copy", icon: "📣", category: "marketing" },
  { id: "product-description", label: "Product description", icon: "🏷", category: "marketing" },
  { id: "seo-article", label: "SEO article", icon: "🔎", category: "marketing" },
  { id: "sales-case-study", label: "Sales case study", icon: "📐", category: "marketing" },
  { id: "press-release", label: "Press release", icon: "🗞", category: "marketing" },
  { id: "press-kit", label: "Press kit", icon: "🗞", category: "marketing" },
  // Tech / UX
  { id: "ux-copy", label: "App UX copy", icon: "📱", category: "tech" },
  { id: "api-docs", label: "API docs", icon: "🧱", category: "tech" },
  { id: "technical-docs", label: "Technical docs", icon: "📘", category: "tech" },
  { id: "user-manual", label: "User manual", icon: "📗", category: "tech" },
  { id: "release-notes", label: "Release notes", icon: "🔖", category: "tech" },
  { id: "readme", label: "README", icon: "🪪", category: "tech" },
  { id: "design-doc", label: "Design doc / RFC", icon: "🧭", category: "tech" },
  { id: "technical-whitepaper", label: "Technical whitepaper", icon: "📑", category: "tech" },
  // Medical & scientific
  { id: "medical-paper", label: "Medical paper", icon: "🩺", category: "medical" },
  { id: "clinical-trial-report", label: "Clinical trial report", icon: "🧫", category: "medical" },
  { id: "medical-guideline", label: "Medical guideline", icon: "🏥", category: "medical" },
  { id: "patient-leaflet", label: "Patient leaflet", icon: "💊", category: "medical" },
  { id: "medicolegal-report", label: "Medicolegal report", icon: "⚕️", category: "medical" },
  // Creative / film / stage
  { id: "screenplay", label: "Screenplay", icon: "🎬", category: "creative" },
  { id: "tv-pilot", label: "TV pilot / script", icon: "📺", category: "creative" },
  { id: "stage-play", label: "Stage play", icon: "🎭", category: "creative" },
  { id: "podcast-script", label: "Podcast script", icon: "🎙", category: "creative" },
  { id: "video-game-script", label: "Video game script", icon: "🎮", category: "creative" },
  { id: "song-lyrics", label: "Song lyrics", icon: "🎵", category: "creative" },
  // Journalism
  { id: "article", label: "Article / essay", icon: "📰", category: "journalism" },
  { id: "op-ed", label: "Op-ed", icon: "🖊", category: "journalism" },
  { id: "long-form-feature", label: "Long-form feature", icon: "📜", category: "journalism" },
  { id: "magazine-article", label: "Magazine article", icon: "🗞", category: "journalism" },
  { id: "interview-transcript", label: "Interview transcript", icon: "🎙", category: "journalism" },
  { id: "blog-post", label: "Blog post", icon: "✍️", category: "journalism" },
  // Speeches / presentations
  { id: "speech", label: "Speech / script", icon: "🎤", category: "speech" },
  { id: "keynote", label: "Keynote", icon: "🪄", category: "speech" },
  { id: "sermon", label: "Sermon / homily", icon: "🕯", category: "speech" },
  { id: "wedding-speech", label: "Wedding / eulogy", icon: "💐", category: "speech" },
  { id: "commencement-address", label: "Commencement", icon: "🎓", category: "speech" },
  { id: "ted-talk", label: "TED-style talk", icon: "🎙", category: "speech" },
  // Personal / admin
  { id: "resume", label: "Resume / CV", icon: "🧾", category: "personal" },
  { id: "cover-letter", label: "Cover letter", icon: "✉️", category: "personal" },
  { id: "personal-statement", label: "Personal statement / SOP", icon: "🪞", category: "personal" },
  { id: "scholarship-essay", label: "Scholarship essay", icon: "🏅", category: "personal" },
  { id: "admissions-essay", label: "Admissions essay", icon: "🏫", category: "personal" },
  { id: "linkedin-profile", label: "LinkedIn profile", icon: "💼", category: "personal" },
  { id: "bio", label: "Bio / about page", icon: "👤", category: "personal" },
  { id: "recommendation-letter", label: "Recommendation letter", icon: "💌", category: "personal" },
  // Nonprofit / public sector
  { id: "grant-proposal", label: "Grant proposal", icon: "💡", category: "nonprofit" },
  { id: "impact-report", label: "Impact report", icon: "🌍", category: "nonprofit" },
  { id: "government-report", label: "Government report", icon: "🏛", category: "nonprofit" },
  { id: "manifesto", label: "Manifesto", icon: "📣", category: "nonprofit" },
  { id: "charter-bylaws", label: "Charter / bylaws", icon: "📜", category: "nonprofit" },
  // Social / short-form
  { id: "social-thread", label: "Social thread", icon: "🧵", category: "social" },
  { id: "substack-post", label: "Substack post", icon: "📨", category: "social" },
  { id: "youtube-script", label: "YouTube script", icon: "📹", category: "social" },
  { id: "podcast-show-notes", label: "Podcast show notes", icon: "🎧", category: "social" },
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
