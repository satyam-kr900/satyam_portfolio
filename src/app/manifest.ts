import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Satyam Kumar — Full-Stack × AI Engineer",
    short_name: "Satyam Kumar",
    description:
      "Full-Stack and AI Engineer building intelligent digital products, AI-powered applications, and interactive web experiences.",
    start_url: "/",
    display: "standalone",
    background_color: "#050505",
    theme_color: "#050505",
    icons: [
      {
        src: "/images/my-pic/ai-photo.jpg",
        sizes: "any",
        type: "image/jpeg",
      },
    ],
  };
}
