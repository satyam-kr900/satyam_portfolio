export const RESUME = {
  name: "SATYAM KUMAR",
  role: "Full-Stack & AI-Integrated Web Developer",
  location: "Hooghly, West Bengal, India",
  phone: "+91 9006786617",
  email: "satyam900kr@gmail.com",
  linkedin: "linkedin.com/in/satyam-kumar-77116332b",
  linkedinUrl: "https://linkedin.com/in/satyam-kumar-77116332b",
  github: "github.com/satyam-kr900",
  githubUrl: "https://github.com/satyam-kr900",
  summary:
    "Final-year B.Tech Computer Science student who builds full-stack, AI-integrated web applications with Next.js, TypeScript, Node.js, and PostgreSQL. Designed and built AI Career Copilot end to end (resume parsing, weighted ATS scoring, semantic job matching, and a RAG-based career assistant) and KrishiMitra AI, a crop-disease detection and advisory platform for farmers. Comfortable owning a feature from database schema and authentication to AI API integration and responsive UI. Seeking a full-stack / software engineering internship or entry-level role.",
  skills: [
    { group: "Languages", items: "TypeScript, JavaScript, Python, Java, C, SQL" },
    { group: "Frontend", items: "React.js, Next.js 14 (App Router), Tailwind CSS, Recharts, HTML/CSS, Responsive Design" },
    { group: "Backend & Databases", items: "Node.js, Express.js, REST APIs, Prisma ORM, PostgreSQL, MongoDB, Supabase, Zod" },
    { group: "AI / ML Integration", items: "Gemini API, RAG (Retrieval-Augmented Generation), Vector Embeddings & Cosine Similarity" },
    { group: "Tools & Practices", items: "Git, GitHub, Vercel, JWT/OAuth Authentication, Vitest (unit testing), Data Structures & Algorithms" },
  ],
  projects: [
    {
      title: "AI Career Copilot",
      subtitle: "AI Resume Analyzer & Career Platform",
      stack: "Next.js 14, TypeScript, PostgreSQL, Prisma, Gemini API",
      bullets: [
        "Built an 18+ field resume parser (PDF/DOCX via pdf-parse and mammoth) with Zod-validated output schemas.",
        "Designed a weighted ATS scoring engine across 7 factors (technical skills 25%, keywords 20%, experience 20%, project relevance 15%, education 10%, job title 5%, formatting 5%) that returns explicit positive and negative factor breakdowns.",
        "Implemented semantic job matching and a skill-gap engine (Critical / Important / Nice-to-have) using vector embeddings and cosine similarity, plus personalized 7/30/60-day learning roadmaps.",
        "Developed Gemini-powered features: resume-bullet optimizer, job-specific tailoring, cover-letter generator (3 tones), a RAG career chatbot grounded in resume context, and a 7-category mock interviewer with real-time answer scoring.",
        "Added resume version history with score analytics (Recharts), PDF/DOCX export, a 10-endpoint REST API, and Vitest unit tests for scoring and skill-gap logic.",
      ],
    },
    {
      title: "KrishiMitra AI",
      subtitle: "Crop Disease Detection & Farm Advisory Platform",
      stack: "Next.js, TypeScript, Node.js",
      bullets: [
        "Built a farmer-focused platform that detects crop diseases from leaf images via an AI API and returns treatment guidance.",
        "Scoped advisory and community modules: weather alerts, crop recommendations, government scheme recommendations, marketplace, discussion forum, and farm-management tools.",
        "Separated the codebase into a Node.js backend and a Next.js/React frontend, structuring the API layer for image analysis and farm-management features.",
      ],
    },
    {
      title: "KnowSamvidhan",
      subtitle: "AI-Powered Constitutional Learning Platform",
      stack: "Next.js, TypeScript, Prisma, Supabase",
      bullets: [
        "Designed an interactive platform that simplifies the Indian Constitution using AI-generated explanations.",
        "Implemented secure user authentication and a responsive UI optimized for desktop and mobile.",
      ],
    },
  ],
  education: [
    {
      degree: "B.Tech, Computer Science & Engineering (Pursuing) — Expected June 2027",
      school: "Supreme Knowledge Foundation Group of Institutions, Hooghly",
    },
    { degree: "XII (Senior Secondary) — 2022 | 71%", school: "S.K.M. College, Nawada, Bihar" },
    { degree: "X (Secondary) — 2020 | 76%", school: "B.I.G.B.P. School, Nawada, Bihar" },
  ],
  certifications: [
    "International Level Hackathon 360° 4.0 — Certificate of Participation (June 2026), Institute of Forensic Sciences and Cyber Security (NSIT-IFSCS), Gujarat & ECLearnix EdTech Pvt Ltd. Credential ID: 4HF66W3A84KHR",
  ],
  additional: {
    languages: "Hindi, English",
    strengths: "Problem-solving, self-directed learning, teamwork, clear communication",
  },
} as const;

export function resumeToPlainText(): string {
  const r = RESUME;
  const L: string[] = [
    r.name,
    r.role,
    `${r.location} | ${r.phone} | ${r.email} | ${r.linkedin} | ${r.github}`,
    "",
    "SUMMARY",
    r.summary,
    "",
    "TECHNICAL SKILLS",
    ...r.skills.map((s) => `${s.group}: ${s.items}`),
    "",
    "PROJECTS",
  ];
  for (const p of r.projects) {
    L.push(`${p.title} — ${p.subtitle} | ${p.stack}`);
    for (const b of p.bullets) L.push(`• ${b}`);
    L.push("");
  }
  L.push("EDUCATION");
  for (const e of r.education) L.push(`${e.degree} | ${e.school}`);
  L.push("", "CERTIFICATIONS", ...r.certifications);
  L.push("", "ADDITIONAL", `Languages: ${r.additional.languages} | Strengths: ${r.additional.strengths}`);
  return L.join("\n");
}
