export interface Lesson {
  title: string;
  duration: string;
  free?: boolean;
}

export interface Chapter {
  title: string;
  lessons: Lesson[];
}

export interface Course {
  slug: string;
  title: string;
  category: "class-11" | "class-12" | "dropper" | "crash" | "test-series";
  categoryLabel: string;
  badge?: string;
  tagline: string;
  description: string;
  price: number; // paise
  salePrice: number; // paise
  rating: number;
  students: number;
  durationLabel: string;
  lessonCount: number;
  lastUpdated: string;
  highlights: string[];
  whatsIncluded: string[];
  curriculum: Chapter[];
  /** Public storage path for course card cover (CMS). */
  imagePath?: string;
  /** Resolved URL for display. */
  imageUrl?: string;
}

export const COURSES: Course[] = [
  {
    slug: "neet-biology-dropper-2026",
    title: "NEET Biology — Dropper Batch 2026",
    category: "dropper",
    categoryLabel: "Dropper Batch",
    badge: "Bestseller",
    tagline: "The complete rank-oriented Biology program for repeaters.",
    description:
      "A focused, NCERT-first Biology program built for droppers who want 340+ in Biology. Every session is engineered around how NEET actually frames questions — taught personally by Vicky Sir.",
    price: 2499900,
    salePrice: 1499900,
    rating: 4.9,
    students: 4120,
    durationLabel: "11 months",
    lessonCount: 320,
    lastUpdated: "June 2026",
    highlights: [
      "Full NCERT line-by-line coverage",
      "Chapter-wise + full-length test series",
      "Live doubt sessions every week",
      "PDF notes + mind maps for every chapter",
    ],
    whatsIncluded: [
      "320+ recorded video lessons",
      "Chapter-wise test series",
      "Weekly live doubt sessions",
      "Downloadable PDF notes & mind maps",
      "Priority WhatsApp doubt support",
      "Performance analytics dashboard",
    ],
    curriculum: [
      {
        title: "Cell Biology & Biomolecules",
        lessons: [
          { title: "Cell: The Unit of Life", duration: "48 min", free: true },
          { title: "Biomolecules — Part 1", duration: "52 min" },
          { title: "Cell Cycle & Cell Division", duration: "61 min" },
        ],
      },
      {
        title: "Human Physiology",
        lessons: [
          { title: "Digestion & Absorption", duration: "55 min", free: true },
          { title: "Breathing & Exchange of Gases", duration: "44 min" },
          { title: "Body Fluids & Circulation", duration: "58 min" },
          { title: "Neural Control & Coordination", duration: "63 min" },
        ],
      },
      {
        title: "Genetics & Evolution",
        lessons: [
          { title: "Principles of Inheritance", duration: "67 min" },
          { title: "Molecular Basis of Inheritance", duration: "72 min" },
          { title: "Evolution", duration: "49 min" },
        ],
      },
    ],
  },
  {
    slug: "neet-biology-class-12",
    title: "NEET Biology — Class 12 Foundation",
    category: "class-12",
    categoryLabel: "Class 12",
    badge: "New",
    tagline: "Build an unshakeable Class 12 Biology base alongside boards.",
    description:
      "Designed to run parallel with your Class 12 boards. Master Genetics, Biotechnology, Ecology, and Human Physiology with a NEET-first lens while staying ahead in school.",
    price: 1999900,
    salePrice: 1199900,
    rating: 4.8,
    students: 2870,
    durationLabel: "10 months",
    lessonCount: 240,
    lastUpdated: "May 2026",
    highlights: [
      "Aligned with boards + NEET",
      "Genetics & Biotech deep dives",
      "Ecology made high-scoring",
      "Regular assessments",
    ],
    whatsIncluded: [
      "240+ recorded video lessons",
      "Chapter-wise tests",
      "Live doubt sessions",
      "PDF notes & mind maps",
      "WhatsApp doubt support",
    ],
    curriculum: [
      {
        title: "Reproduction",
        lessons: [
          { title: "Sexual Reproduction in Flowering Plants", duration: "59 min", free: true },
          { title: "Human Reproduction", duration: "64 min" },
          { title: "Reproductive Health", duration: "38 min" },
        ],
      },
      {
        title: "Biotechnology",
        lessons: [
          { title: "Principles & Processes", duration: "55 min" },
          { title: "Applications", duration: "47 min" },
        ],
      },
      {
        title: "Ecology",
        lessons: [
          { title: "Organisms & Populations", duration: "52 min", free: true },
          { title: "Ecosystem", duration: "49 min" },
          { title: "Biodiversity & Conservation", duration: "41 min" },
        ],
      },
    ],
  },
  {
    slug: "neet-biology-crash-course",
    title: "NEET Biology — 60-Day Crash Course",
    category: "crash",
    categoryLabel: "Crash Course",
    badge: "Limited Seats",
    tagline: "High-yield revision sprint for the final stretch.",
    description:
      "A ruthless 60-day high-yield revision program covering every NCERT line that matters, packed with rapid MCQ drills and full-length mocks. Built to maximize your final-month jump.",
    price: 1299900,
    salePrice: 699900,
    rating: 4.9,
    students: 5340,
    durationLabel: "60 days",
    lessonCount: 120,
    lastUpdated: "June 2026",
    highlights: [
      "High-yield NCERT revision",
      "Rapid MCQ marathons",
      "5 full-length mock tests",
      "Last-mile strategy sessions",
    ],
    whatsIncluded: [
      "120 high-yield video lessons",
      "5 full-length mock tests",
      "Daily MCQ drills",
      "Revision mind maps",
      "WhatsApp doubt support",
    ],
    curriculum: [
      {
        title: "High-Yield Botany",
        lessons: [
          { title: "Plant Physiology Rapid Revision", duration: "42 min", free: true },
          { title: "Plant Kingdom — One Shot", duration: "58 min" },
        ],
      },
      {
        title: "High-Yield Zoology",
        lessons: [
          { title: "Human Physiology — One Shot", duration: "71 min" },
          { title: "Animal Kingdom — One Shot", duration: "63 min" },
        ],
      },
      {
        title: "Mock Test Series",
        lessons: [
          { title: "Full Mock 1 + Analysis", duration: "3h 20m" },
          { title: "Full Mock 2 + Analysis", duration: "3h 20m" },
        ],
      },
    ],
  },
];

export function getCourse(slug: string): Course | undefined {
  return COURSES.find((c) => c.slug === slug);
}

export const COURSE_FILTERS: { value: string; label: string }[] = [
  { value: "all", label: "All" },
  { value: "class-11", label: "Class 11" },
  { value: "class-12", label: "Class 12" },
  { value: "dropper", label: "Dropper" },
  { value: "crash", label: "Crash Course" },
  { value: "test-series", label: "Test Series" },
];
