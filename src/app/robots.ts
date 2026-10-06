import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://satyam-kumar-portfolio.vercel.app/sitemap.xml",
  };
}
