"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

const TABS = ["AI CHAT", "PARTICLES", "RAG DEMO", "AGENT", "VOICE AI", "CODEGEN"] as const;

function fakeAIReply(q: string) {
  const s = q.toLowerCase();
  if (s.includes("who") || s.includes("satyam"))
    return "I'm Satyam Kumar — Full-Stack & AI-Integrated Web Developer, final-year B.Tech CSE (June 2027, SKFGI Hooghly). I own features end-to-end: schema + auth → AI APIs → responsive UI.";
  if (s.includes("stack") || s.includes("skill"))
    return "TS/JS, Python, Java, C, SQL · React, Next.js 14, Tailwind, Recharts · Node, Express, Prisma, Postgres, Mongo, Supabase, Zod · Gemini, RAG, embeddings · Git, Vercel, JWT/OAuth, Vitest.";
  if (s.includes("project"))
    return "Flagships: AI Career Copilot (18-field parser, 7-factor ATS engine, RAG chatbot, mock interviewer), Resume Analyser (live on Vercel), KrishiMitra AI (crop-disease detection), KnowSamvidhan (AI Constitution) — plus 5 LangChain/Groq builds: conversation RAG (ChromaDB), FAISS RAG, SQL agent, ReAct math solver, search agents — and DL/NLP: LSTM next-word, X sentiment, Titanic, movie recommender.";
  if (s.includes("education") || s.includes("college"))
    return "B.Tech CSE pursuing (June 2027) at Supreme Knowledge Foundation, Hooghly. XII 71% (2022), X 76% (2020) — Nawada, Bihar.";
  if (s.includes("hackathon") || s.includes("certif"))
    return "International Level Hackathon 360° 4.0 (June 2026), NSIT-IFSCS Gujarat & ECLearnix. Credential ID: 4HF66W3A84KHR.";
  if (s.includes("hire") || s.includes("contact"))
    return "Seeking full-stack / SWE internship or entry-level role. satyam900kr@gmail.com · +91 9006786617 · link in CONTACT ↓";
  return `Grounded reply (demo): "${q.slice(0, 80)}" → In production this would RAG-retrieve from resume context + Gemini-generate with citations.`;
}

function AIChat() {
  const [msgs, setMsgs] = useState<{ r: "u" | "a"; t: string }[]>([
    { r: "a", t: "$ satyam-ai v2026 — grounded in resume context. Ask me something… (try: stack / projects / hire)" },
  ]);
  const [q, setQ] = useState("");
  return (
    <div className="glass-strong rounded-2xl p-4 font-mono text-sm">
      <div className="max-h-64 space-y-2 overflow-y-auto">
        {msgs.map((m, i) => (
          <div key={i} className={m.r === "u" ? "text-right" : "text-left"}>
            <span className={`inline-block max-w-[90%] rounded-lg px-3 py-1.5 text-left text-[13px] leading-relaxed ${m.r === "u" ? "bg-[#6e7cff] text-white" : "bg-white/5 text-zinc-300"}`}>
              {m.t}
            </span>
          </div>
        ))}
      </div>
      <form
        className="mt-3 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          if (!q.trim()) return;
          const query = q;
          setMsgs((m) => [...m, { r: "u", t: query }, { r: "a", t: "…thinking (retrieving context)" }]);
          setQ("");
          setTimeout(() => {
            setMsgs((m) => [...m.slice(0, -1), { r: "a", t: fakeAIReply(query) }]);
          }, 500);
        }}
      >
        <span className="py-2 text-emerald-400">❯</span>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Ask me something… █"
          className="flex-1 bg-transparent text-zinc-100 placeholder:text-zinc-600 focus:outline-none"
        />
      </form>
    </div>
  );
}

function RagDemo() {
  const [score] = useState(0.87);
  return (
    <div className="glass-strong rounded-2xl p-5 font-mono text-xs leading-loose">
      <div className="text-zinc-500">QUERY: “ATS scoring factors?”</div>
      <div className="mt-2 space-y-1.5">
        {[["resume-parser chunk", 0.91], ["ats-engine chunk", 0.87], ["skill-gap chunk", 0.79]].map(([t, s]) => (
          <div key={t as string} className="flex min-w-0 items-center gap-2">
            <span className="shrink-0 rounded bg-white/5 px-2 py-1 text-zinc-300">▤ {t}</span>
            <div className="h-1.5 min-w-0 flex-1 overflow-hidden rounded bg-white/5">
              <div className="h-full bg-gradient-to-r from-[#6e7cff] to-[#22d3ee]" style={{ width: `${(s as number) * 100}%` }} />
            </div>
            <span className="text-[#9aa6ff]">{s}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-lg bg-white/[0.03] p-3 text-zinc-300">
        → cosine_similarity = {score} · grounded answer: skills 25% / keywords 20% / experience 20% /
        projects 15% / education 10% / title 5% / formatting 5%.
      </div>
    </div>
  );
}

function VoiceDemo() {
  const [on, setOn] = useState(false);
  return (
    <div className="glass-strong flex flex-col items-center gap-4 rounded-2xl p-8">
      <button
        onClick={() => setOn(!on)}
        className={`flex h-20 w-20 items-center justify-center rounded-full font-mono text-xs font-bold transition ${
          on ? "bg-rose-500 text-white shadow-[0_0_40px_rgba(244,63,94,0.5)]" : "bg-white text-black"
        }`}
      >
        {on ? "■ STOP" : "● TALK"}
      </button>
      <div className="flex h-10 items-end gap-1">
        {Array.from({ length: 24 }).map((_, i) => (
          <motion.span
            key={i}
            className="w-1 rounded bg-gradient-to-t from-[#6e7cff] to-[#22d3ee]"
            animate={on ? { height: [6, 12 + ((i * 37) % 26), 6] } : { height: 4 }}
            transition={on ? { duration: 0.7, repeat: Infinity, delay: (i % 8) * 0.08 } : {}}
          />
        ))}
      </div>
      <div className="font-mono text-xs text-zinc-400">
        {on ? "◉ listening… “tell me about your ATS engine”" : "// tap to simulate voice interface"}
      </div>
    </div>
  );
}

function CodegenDemo() {
  const [code] = useState(`// generated by satyam-ai · 0.4s
const ats = scoreResume(resume, job);
// → { score: 78, gaps: ["k8s"] }
await roadmap(gaps, "30d");`);
  const [shown, setShown] = useState(0);
  useEffect(() => {
    setShown(0);
    const t = setInterval(() => {
      setShown((s) => {
        if (s >= code.length) {
          clearInterval(t);
          return s;
        }
        return s + 3;
      });
    }, 24);
    return () => clearInterval(t);
  }, [code]);
  return (
    <div className="glass-strong rounded-2xl p-5">
      <div className="mb-2 flex items-center justify-between font-mono text-[10px] tracking-widest text-zinc-500">
        <span>◉ CODE GENERATOR — live typing</span>
        <button onClick={() => setShown(0)} className="hover:text-white">↻ REPLAY</button>
      </div>
      <pre className="min-h-[130px] whitespace-pre-wrap font-mono text-[13px] leading-relaxed text-emerald-200">
        {code.slice(0, shown)}
        <span className="animate-pulse text-white">█</span>
      </pre>
    </div>
  );
}

export default function Playground() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("AI CHAT");
  return (
    <section id="playground" className="border-t border-white/5 bg-[#07070b] px-5 py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          index="05"
          eyebrow="EXPERIMENTS"
          title={<>EXPERIMENTS<br />THAT SHOULD<br />NOT EXIST.</>}
          sub="Small interactive demos — the portfolio is the proof of work."
        />
        <p className="mt-1 font-mono text-[10px] tracking-[0.25em] text-zinc-600">AI CHAT · RAG DEMO · VOICE AI = VISUAL PROTOTYPES (RULE-BASED DEMO, NO LIVE MODEL)</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {TABS.map((t, i) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-full px-4 py-2 font-mono text-xs tracking-widest ${
                tab === t ? "bg-white text-black font-bold" : "border border-white/10 text-zinc-400 hover:text-white"
              }`}
            >
              0{i + 1} {t}
            </button>
          ))}
        </div>
        <motion.div key={tab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-5">
          {tab === "AI CHAT" && <AIChat />}
          {tab === "RAG DEMO" && <RagDemo />}
          {tab === "PARTICLES" && (
            <div className="grid-bg relative flex h-64 items-center justify-center overflow-hidden rounded-2xl border border-white/10">
              {Array.from({ length: 60 }).map((_, i) => (
                <motion.span
                  key={i}
                  className="absolute h-1 w-1 rounded-full bg-[#6e7cff]"
                  style={{ left: `${(i * 37) % 100}%`, top: `${(i * 53) % 100}%` }}
                  animate={{ y: [0, -20, 0], opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2 + (i % 5), repeat: Infinity, delay: (i % 10) * 0.2 }}
                />
              ))}
              <span className="font-mono text-xs text-zinc-400">3D PARTICLE SYSTEM — see HERO CORE (live WebGL)</span>
            </div>
          )}
          {tab === "AGENT" && (
            <div className="glass-strong rounded-2xl p-5 font-mono text-xs leading-loose text-zinc-300">
              <div><span className="text-[#a855f7]">agent&gt;</span> goal: “prep me for interview”</div>
              <div>→ tool: parse_resume() ✓ 18 fields</div>
              <div>→ tool: score_ats() ✓ 78/100 (skills −12, keywords −6)</div>
              <div>→ tool: plan_roadmap(30d) ✓ 3 sprints generated</div>
              <div className="text-emerald-300">✓ done — this is the mock-interviewer loop from AI Career Copilot.</div>
            </div>
          )}
          {tab === "VOICE AI" && <VoiceDemo />}
          {tab === "CODEGEN" && <CodegenDemo />}
        </motion.div>
      </div>
    </section>
  );
}
