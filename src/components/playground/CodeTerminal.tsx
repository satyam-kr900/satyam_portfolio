"use client";
import { useState } from "react";

const COMMANDS: Record<string, string[]> = {
  whoami: ["Satyam Kumar — Full-Stack & AI-Integrated Web Developer"],
  skills: [
    "TS · JS · Python · Java · C · SQL",
    "React · Next.js 14 · Tailwind · Recharts",
    "Node · Express · Prisma · Postgres · Mongo · Supabase · Zod",
    "Gemini · RAG · Embeddings · Cosine Similarity",
    "Git · Vercel · JWT/OAuth · Vitest · DSA",
  ],
  projects: ["→ AI Career Copilot (ATS engine + RAG + Gemini)", "→ Resume Analyser (LIVE — see: demo)", "→ KrishiMitra AI (crop-disease detection)", "→ KnowSamvidhan (AI Constitution)", "→ Conversation RAG (Groq + ChromaDB + history)", "→ SQL Agent Chat (LangChain + Groq)", "→ Math Solver Agent (ReAct + tools)", "→ LSTM next-word + X sentiment (DL/NLP)"],
  demo: ["→ Resume Analyser: https://resume-analyser-flax-iota.vercel.app"],
  education: ["→ B.Tech CSE (pursuing) — June 2027, SKFGI Hooghly", "→ XII 71% (2022) · X 76% (2020), Nawada Bihar"],
  certs: ["→ Hackathon 360° 4.0 — Intl. Level (June 2026)", "   Credential ID: 4HF66W3A84KHR"],
  github: ["→ https://github.com/satyam-kr900"],
  contact: ["→ satyam900kr@gmail.com · +91 9006786617", "→ linkedin.com/in/satyam-kumar-77116332b"],
  help: ["whoami · skills · projects · demo · education · certs · github · contact · clear"],
};

export default function CodeTerminal() {
  const [lines, setLines] = useState<string[]>(["$ whoami", "Satyam Kumar", "", "$ skills", "Full-Stack & AI-Integrated Web Developer"]);
  const [input, setInput] = useState("");
  const run = (cmd: string) => {
    const c = cmd.trim().toLowerCase().replace(/^\$/, "").trim();
    if (!c) return;
    if (c === "clear") {
      setLines([]);
      return;
    }
    const out = COMMANDS[c] ?? [`command not found: ${c} — try: help`];
    setLines((l) => [...l, `$ ${c}`, ...out]);
  };
  return (
    <section className="border-t border-white/5 bg-black px-5 py-24">
      <div className="mx-auto max-w-4xl">
        <div className="glass-strong overflow-hidden rounded-2xl">
          <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3 font-mono text-xs text-zinc-400">
            <span className="h-3 w-3 rounded-full bg-rose-500" />
            <span className="h-3 w-3 rounded-full bg-amber-400" />
            <span className="h-3 w-3 rounded-full bg-emerald-400" />
            <span className="ml-2">satyam@portfolio ~</span>
          </div>
          <div className="min-h-[280px] bg-black/80 p-5 font-mono text-[13px] leading-relaxed">
            {lines.map((l, i) => (
              <div key={i} className={l.startsWith("$") ? "text-emerald-300" : "text-zinc-300"}>
                {l || " "}
              </div>
            ))}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                run(input);
                setInput("");
              }}
              className="mt-2 flex gap-2 text-emerald-300"
            >
              <span>$</span>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="type: help █"
                className="flex-1 bg-transparent caret-emerald-400 text-white placeholder:text-zinc-600 focus:outline-none"
              />
              <span className="animate-pulse text-emerald-300">▊</span>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
