"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import dynamic from "next/dynamic";
import { projects } from "@/data/projects";

const UniverseScene = dynamic(() => import("@/three/projects/UniverseScene"), { ssr: false });

/** PROJECTS = 3D MUSEUM — archive index, giant objects, hover reveals */
export default function ProjectUniverse() {
  const [hot, setHot] = useState<number | null>(null);
  const [open, setOpen] = useState<string | null>(null);
  const current = projects.find((p) => p.slug === open);

  return (
    <section id="projects" className="relative overflow-hidden border-t border-white/5 bg-[#050505] py-24">
      <div className="absolute inset-0">
        <UniverseScene highlight={hot !== null ? projects[hot].color ?? "#6e7cff" : "#6e7cff"} />
      </div>
      {/* readability veil — keeps the text zone dark, glow lives on the right */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_85%_at_28%_50%,rgba(5,5,5,0.78),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />

      <div className="relative z-10 mx-auto max-w-7xl px-5">
        <div className="font-mono text-xs tracking-[0.35em] text-[#22d3ee]">PROJECT ARCHIVE</div>
        <h2 className="mt-2 text-4xl font-bold md:text-6xl">
          WORK THAT
          <br />
          SHIPS.
        </h2>

        <div className="mt-12 border-t border-white/10">
          {projects.map((p, i) => (
            <div key={p.slug} className="relative">
              <button
                onMouseEnter={() => setHot(i)}
                onMouseLeave={() => setHot(null)}
                onFocus={() => setHot(i)}
                onClick={() => setOpen(p.slug)}
                className="group flex w-full items-baseline gap-4 border-b border-white/10 py-6 text-left md:gap-8"
              >
                <span className={`font-mono text-xs tracking-widest transition ${hot === i ? "text-[#9aa6ff]" : "text-zinc-600"}`}>
                  0{i + 1}
                </span>
                <span className={`flex-1 text-3xl font-bold tracking-tight transition-all duration-300 md:text-6xl ${hot === i ? "translate-x-3 text-white" : "text-zinc-500"}`}>
                  {p.title}
                </span>
                <span className="hidden font-mono text-[10px] tracking-widest text-zinc-500 md:inline">
                  {p.category}
                </span>
                <ArrowUpRight
                  size={22}
                  className={`shrink-0 transition ${hot === i ? "text-[#9aa6ff]" : "text-zinc-700"}`}
                />
              </button>

              {/* floating exhibit card */}
              <AnimatePresence>
                {hot === i && (
                  <motion.div
                    initial={{ opacity: 0, y: 14, rotate: 1 }}
                    animate={{ opacity: 1, y: 0, rotate: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="glass-strong pointer-events-none absolute right-0 top-1/2 z-20 hidden w-80 -translate-y-1/2 rounded-2xl p-5 lg:block"
                  >
                    <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-zinc-400">
                      <span className="h-2 w-2 rounded-full" style={{ background: p.color, boxShadow: `0 0 10px ${p.color}` }} />
                      {p.subtitle.toUpperCase()}
                    </div>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-zinc-300">{p.description}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {p.stack.slice(0, 4).map((s) => (
                        <span key={s} className="glass-chip rounded-full px-2.5 py-1 font-mono text-[10px] text-zinc-300">{s}</span>
                      ))}
                    </div>
                    <div className="mt-3 font-mono text-[11px] text-white">[ OPEN CASE STUDY ]</div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* mobile subline */}
              <div className="border-b border-white/5 px-1 pb-4 font-mono text-[11px] text-zinc-500 md:hidden">
                {p.subtitle} — {p.stack.slice(0, 3).join(" · ")}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* case study modal */}
      <AnimatePresence>
        {current && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] overflow-y-auto bg-black/85 p-4 backdrop-blur-xl md:p-10"
            onClick={() => setOpen(null)}
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong mx-auto max-w-3xl rounded-2xl p-6 md:p-10"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-mono text-[11px] tracking-widest" style={{ color: current.color }}>
                    {current.subtitle.toUpperCase()}
                  </div>
                  <h3 className="mt-1 text-3xl font-bold md:text-4xl">{current.title}</h3>
                </div>
                <button onClick={() => setOpen(null)} aria-label="Close" className="glass-chip rounded-full p-2 hover:bg-white/10">
                  <X size={16} />
                </button>
              </div>
              {current.problem && (
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="glass rounded-xl p-4">
                    <div className="font-mono text-[11px] text-rose-300">PROBLEM</div>
                    <p className="mt-2 text-sm text-zinc-300">{current.problem}</p>
                  </div>
                  <div className="glass rounded-xl p-4">
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
                      <li key={a} className="glass rounded-lg px-4 py-2.5 font-mono text-xs leading-relaxed text-zinc-300">
                        → {a}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="mt-6 flex flex-wrap gap-2">
                {current.stack.map((s) => (
                  <span key={s} className="glass-chip rounded-full px-3 py-1 font-mono text-[11px]">{s}</span>
                ))}
              </div>
              <div className="mt-6 flex gap-3">
                {current.github && (
                  <a href={current.github} className="rounded-full bg-white px-5 py-2.5 font-mono text-xs font-bold text-black transition hover:bg-[#6e7cff] hover:text-white">
                    GitHub ↗
                  </a>
                )}
                {current.demo && (
                  <a href={current.demo} target="_blank" rel="noreferrer" className="rounded-full bg-emerald-400 px-5 py-2.5 font-mono text-xs font-bold text-black transition hover:bg-emerald-300">
                    LIVE DEMO ↗
                  </a>
                )}
                <a href="#contact" onClick={() => setOpen(null)} className="glass-chip rounded-full px-5 py-2.5 font-mono text-xs">
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
