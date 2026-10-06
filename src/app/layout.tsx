import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Cursor from "@/components/navigation/Cursor";
import Hud from "@/components/navigation/Hud";
import SoundToggle from "@/components/navigation/SoundToggle";
import LenisProvider from "@/components/layout/LenisProvider";
import PageLoader from "@/components/layout/PageLoader";

const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono-tech" });

export const metadata: Metadata = {
  metadataBase: new URL("https://satyam-kumar-portfolio.vercel.app"),
  title: {
    default: "Satyam Kumar — Full-Stack × AI Engineer",
    template: "%s | Satyam Kumar",
  },
  description:
    "Full-Stack and AI Engineer building intelligent digital products, AI-powered applications, and interactive web experiences. Next.js, TypeScript, RAG, Gemini — AI Career Copilot, KnowSamvidhan, KrishiMitra AI.",
  keywords: ["Satyam Kumar", "Full-Stack Engineer", "AI Engineer", "Next.js", "RAG", "Gemini", "Portfolio"],
  authors: [{ name: "Satyam Kumar" }],
  creator: "Satyam Kumar",
  alternates: { canonical: "https://satyam-kumar-portfolio.vercel.app" },
  openGraph: {
    title: "Satyam Kumar — Full-Stack × AI Engineer",
    description: "I build intelligent digital experiences. Full-stack × AI — Next.js, TypeScript, RAG, Gemini.",
    type: "website",
    locale: "en_IN",
    siteName: "Satyam Kumar — Portfolio",
    images: [{ url: "/images/my-pic/ai-photo.jpg", width: 1200, height: 630, alt: "Satyam Kumar — Full-Stack × AI Engineer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Satyam Kumar — Full-Stack × AI Engineer",
    description: "I build intelligent digital experiences.",
    images: ["/images/my-pic/ai-photo.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`}>
      <body className="bg-[#050507] text-zinc-100 antialiased">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:text-black">
          Skip to content
        </a>
        <LenisProvider />
        <PageLoader />
        <Navbar />
        <Cursor />
        <Hud />
        <SoundToggle />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
