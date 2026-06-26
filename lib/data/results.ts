export interface TopperResult {
  name: string;
  air: number;
  score: number;
  college: string;
  quote: string;
  year: number;
  since: string;
}

export const TOPPERS: TopperResult[] = [
  {
    name: "Mehak S.",
    air: 47,
    score: 695,
    college: "AIIMS New Delhi",
    quote: "Vicky Sir made Biology feel like the easiest 360 on the paper.",
    year: 2023,
    since: "2021",
  },
  {
    name: "Rohit K.",
    air: 112,
    score: 688,
    college: "Maulana Azad Medical College, Delhi",
    quote: "The NCERT-first approach is exactly how NEET asks. Game changer.",
    year: 2024,
    since: "2022",
  },
  {
    name: "Ananya P.",
    air: 318,
    score: 678,
    college: "Seth GS Medical College, Mumbai",
    quote: "His weekly doubt sessions kept me sane during my drop year.",
    year: 2024,
    since: "2023",
  },
  {
    name: "Karthik R.",
    air: 540,
    score: 671,
    college: "Bangalore Medical College (BMCRI)",
    quote: "I went from 290 to 671 in Biology. The structure just works.",
    year: 2023,
    since: "2022",
  },
  {
    name: "Sneha M.",
    air: 892,
    score: 662,
    college: "Grant Medical College, Mumbai",
    quote: "Mind maps for every chapter — revision became effortless.",
    year: 2022,
    since: "2021",
  },
  {
    name: "Aditya V.",
    air: 1340,
    score: 651,
    college: "KGMU, Lucknow",
    quote: "Direct access to a mentor who actually replies. Rare and priceless.",
    year: 2024,
    since: "2023",
  },
  {
    name: "Priya N.",
    air: 1875,
    score: 644,
    college: "Madras Medical College, Chennai",
    quote: "Biology became my strongest subject. That's all Vicky Sir.",
    year: 2023,
    since: "2022",
  },
  {
    name: "Faisal A.",
    air: 2210,
    score: 638,
    college: "SMS Medical College, Jaipur",
    quote: "The crash course in my final month added 40+ marks easily.",
    year: 2022,
    since: "2022",
  },
];

export const RESULT_YEARS = [
  "All Years",
  ...Array.from(new Set(TOPPERS.map((t) => t.year)))
    .sort((a, b) => b - a)
    .map(String),
];
