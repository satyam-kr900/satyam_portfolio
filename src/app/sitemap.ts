import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://satyam-kumar-portfolio.vercel.app";
  return [
    { url: base, lastModified: new Date("2026-01-01"), changeFrequency: "monthly", priority: 1 },
    { url: `${base}/projects`, lastModified: new Date("2026-01-01"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/ai-lab`, lastModified: new Date("2026-01-01"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/about`, lastModified: new Date("2026-01-01"), changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/playground`, lastModified: new Date("2026-01-01"), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/resume`, lastModified: new Date("2026-01-01"), changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/contact`, lastModified: new Date("2026-01-01"), changeFrequency: "yearly", priority: 0.6 },
  ];
}
