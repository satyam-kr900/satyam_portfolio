"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/projects";
import { ArrowUpRight, X } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

/** Ashoka Chakra — 24 spokes, slow rotation, for KnowSamvidhan */
function Chakra({ size = 120 }: { size?: number }) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <div className="absolute inset-0 animate-[spin-slow_24s_linear_infinite] rounded-full border-2 border-[#3b82f6]/70">
        {Array.from({ length: 24 }).map((_, i) => (
          <span
            key={i}
            className="absolute left-1/2 top-1/2 h-[46%] w-px origin-top bg-[#3b82f6]/60"
            style={{ transform: `rotate(${i * 15}deg)`, transformOrigin: "top center", translate: "-50% 4%" }}
          />
        ))}
        <span className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3b82f6]" />
      </div>
      <div className="absolute inset-0 rounded-full shadow-[0_0_40px_rgba(59,130,246,0.35)]" />
    </div>
  );
}

/** AI CAREER COPILOT — cinematic pipeline moment */
function CopilotSpotlight() {
  return (
    <div className="glass mt-10 overflow-hidden rounded-2xl p-6 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="font-mono text-xs tracking-[0.3em] text-[#9aa6ff]">SPOTLIGHT // 01</div>
        <button
          onClick={() => document.getElementById("ai-copilot-module")?.scrollIntoView({ behavior: "smooth", block: "center" })}
          className="font-mono text-xs text-zinc-400 hover:text-white"
        >
          AI CAREER COPILOT — FULL CASE STUDY ↓
        </button>
      </div>
      <div className="mt-6 flex flex-col items-center gap-3 font-mono text-xs">
        <span className="glass-chip rounded-lg px-6 py-2.5 tracking-widest">RESUME</span>
        <span className="text-zinc-500">↓</span>
        <span className="rounded-lg bg-gradient-to-r from-[#6e7cff] to-[#a855f7] px-6 py-2.5 font-bold tracking-widest text-white shadow-[0_0_30px_rgba(110,124,255,0.45)]">
          AI ENGINE
        </span>
        <div className="flex flex-col items-stretch gap-2 text-[11px] min-[480px]:flex-row md:gap-4">
          {[
            ["ATS", "SCORE", "7 factors · 25/20/20/15/10/5/5"],
            ["SKILL", "MATCH", "embeddings · cosine sim"],
            ["ROLE", "FIT", "7/30/60-day roadmaps"],
          ].map(([a, b, d]) => (
            <div key={a} className="glass-strong flex-1 rounded-xl px-4 py-3 text-center md:px-8">
              <div className="font-bold tracking-widest text-white">{a}</div>
              <div className="tracking-widest text-[#9aa6ff]">{b}</div>
              <div className="mt-1 hidden text-[10px] normal-case tracking-normal text-zinc-500 md:block">{d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AILab() {
  const [active, setActive] = useState<string | null>(null);
  const lab = projects.filter((p) => p.category === "AI").slice(0, 3);
  const current = projects.find((p) => p.slug === active);

  return (
    <section id="ai-lab" className="relative overflow-hidden border-t border-white/5 bg-black px-5 py-24">
      {/* lab photo backdrop */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/images/my-pic/satlab-bg.jpg)" }}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-black/52" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_85%_at_30%_40%,rgba(0,0,0,0.6),transparent_70%)]" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/70" aria-hidden />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          index="02"
          eyebrow="AI LAB"
          title="AI LAB"
          sub="Not project cards — a laboratory. Click a module to open the full engineering case study."
        />
        <CopilotSpotlight />
        <div className="mt-6 flex items-center justify-center">
          <div className="relative flex h-24 w-24 items-center justify-center">
            <div className="absolute inset-0 animate-ping rounded-full bg-[#6e7cff]/20" />
            <div className="absolute inset-2 rounded-full border border-[#6e7cff]/40" style={{ animation: "spin-slow 8s linear infinite" }} />
            <div className="glass flex h-16 w-16 items-center justify-center rounded-full font-mono text-[10px] font-bold text-white">
              AI
              <br />
              CORE
            </div>
          </div>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {lab.map((p, i) => (
            <motion.button
              key={p.slug}
              id={p.slug === "ai-career-copilot" ? "ai-copilot-module" : undefined}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setActive(p.slug)}
              className="glass group rounded-2xl p-6 text-left transition hover:border-white/25"
            >
              <div className="font-mono text-[10px] tracking-widest text-zinc-500">
                MODULE_0{i + 1} — <span style={{ color: p.color }}>●</span> {p.subtitle.toUpperCase()}
              </div>
              <div className="mt-2 text-2xl font-bold">{p.title}</div>
              <div className="mt-2 line-clamp-3 text-sm leading-relaxed text-zinc-400">{p.description}</div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.stack.slice(0, 4).map((s) => (
                  <span key={s} className="rounded-full bg-white/5 px-2.5 py-1 font-mono text-[10px] text-zinc-300">
                    {s}
                  </span>
                ))}
              </div>
              <div className="mt-4 font-mono text-xs text-white group-hover:text-[#9aa6ff]">
                OPEN CASE STUDY <ArrowUpRight size={13} className="inline" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {current && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] overflow-y-auto bg-black/85 p-4 backdrop-blur-xl md:p-10"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong mx-auto max-w-3xl rounded-2xl p-6 md:p-10"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-mono text-[11px] tracking-widest" style={{ color: current.color }}>
                    {current.subtitle.toUpperCase()}
                  </div>
                  <h3 className="mt-1 text-3xl font-bold md:text-4xl">{current.title}</h3>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  {current.slug === "knowsamvidhan" && <Chakra size={72} />}
                  <button onClick={() => setActive(null)} aria-label="Close" className="glass-chip rounded-full p-2 hover:bg-white/10">
                    <X size={16} />
                  </button>
                </div>
              </div>
              {current.slug === "knowsamvidhan" && (
                <div className="mt-6 flex items-center gap-5 overflow-hidden rounded-xl border border-[#3b82f6]/20 bg-[#3b82f6]/[0.04] p-4">
                  <Chakra size={110} />
                  <div className="font-mono text-[11px] leading-loose tracking-widest text-zinc-300">
                    CONSTITUTION × AI × EDUCATION
                    <br />
                    <span className="text-zinc-500">PREAMBLE ↓ ARTICLES ↓ AMENDMENTS ↓ SCHEDULES ↓ AI EXPLANATIONS</span>
                  </div>
                </div>
              )}
              {current.problem && (
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-xl bg-white/[0.03] p-4">
                    <div className="font-mono text-[11px] text-rose-300">PROBLEM</div>
                    <p className="mt-2 text-sm text-zinc-300">{current.problem}</p>
                  </div>
                  <div className="rounded-xl bg-white/[0.03] p-4">
                    <div className="font-mono text-[11px] text-emerald-300">SOLUTION</div>
                    <p className="mt-2 text-sm text-zinc-300">{current.solution}</p>
                  </div>
                </div>
              )}
              {current.architecture && (
                <div className="mt-6">
                  <div className="font-mono text-[11px] tracking-widest text-zinc-400">ARCHITECTURE</div>
                  <ul className="mt-2 space-y-2">
                    {current.architecture.map((a) => (
                      <li key={a} className="rounded-lg border border-white/5 bg-white/[0.02] px-4 py-2.5 font-mono text-xs leading-relaxed text-zinc-300">
                        → {a}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {current.pipeline && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {current.pipeline.map((s, idx) => (
                    <span key={s} className="flex items-center gap-2 font-mono text-[11px] text-zinc-400">
                      <span className="rounded-full border border-white/10 px-3 py-1">{s}</span>
                      {idx < current.pipeline!.length - 1 && <span>↓</span>}
                    </span>
                  ))}
                </div>
              )}
              <div className="mt-6 flex flex-wrap gap-2">
                {current.stack.map((s) => (
                  <span key={s} className="rounded-full bg-white/5 px-3 py-1 font-mono text-[11px]">{s}</span>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                {current.github && (
                  <a href={current.github} className="rounded-full bg-white px-5 py-2.5 font-mono text-xs font-bold text-black hover:bg-[#6e7cff] hover:text-white">
                    GitHub ↗
                  </a>
                )}
                <a href="#contact" onClick={() => setActive(null)} className="rounded-full border border-white/15 px-5 py-2.5 font-mono text-xs hover:bg-white/5">
                  DISCUSS THIS BUILD →
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
