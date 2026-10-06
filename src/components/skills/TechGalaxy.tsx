"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skillOrbits } from "@/data/projects";
import { projects } from "@/data/projects";

/** TECH = ORBITAL SYSTEM — click a node for the full dossier */
export default function TechGalaxy() {
  const [active, setActive] = useState<string | null>(null);
  const activeItem = skillOrbits.flatMap((o) => o.items).find((i) => i.name === active);
  const shippedIn = active
    ? projects.filter((p) => p.stack.some((s) => s.toLowerCase().includes(active.toLowerCase().split(" ")[0]))).length
    : 0;

  return (
    <section id="stack" className="border-t border-white/5 bg-[#050505] px-5 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="font-mono text-xs tracking-[0.35em] text-[#6e7cff]">ORBITAL SYSTEM</div>
        <h2 className="mt-2 text-4xl font-bold md:text-6xl">TECH GALAXY</h2>
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="flex flex-col items-center gap-2">
            <div className="glass rounded-full px-6 py-2 font-mono text-sm font-bold shadow-[0_0_30px_rgba(110,124,255,0.25)]">
              ● SATYAM
            </div>
            {skillOrbits.map((orbit, oi) => (
              <motion.div
                key={orbit.orbit}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="glass w-full rounded-2xl p-4"
                style={{ maxWidth: 860 - oi * 50 }}
              >
                <div className="text-center font-mono text-[10px] tracking-[0.3em] text-zinc-500">{orbit.orbit}</div>
                <div className="mt-3 flex flex-wrap justify-center gap-2">
                  {orbit.items.map((t) => (
                    <button
                      key={t.name}
                      onMouseEnter={() => setActive(t.name)}
                      onFocus={() => setActive(t.name)}
                      onClick={() => setActive(t.name)}
                      className={`rounded-full border px-4 py-1.5 font-mono text-xs transition ${
                        active === t.name
                          ? "border-[#6e7cff] bg-[#6e7cff]/15 text-white shadow-[0_0_20px_rgba(110,124,255,0.4)]"
                          : "glass-chip text-zinc-300 hover:border-white/30 hover:text-white"
                      }`}
                    >
                      {t.name}
                    </button>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* dossier panel */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <AnimatePresence mode="wait">
              {activeItem ? (
                <motion.div
                  key={activeItem.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.25 }}
                  className="glass-strong rounded-2xl p-6"
                >
                  <div className="font-mono text-[10px] tracking-[0.3em] text-[#9aa6ff]">TECH DOSSIER</div>
                  <div className="mt-2 text-3xl font-bold">{activeItem.name}</div>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-300">{activeItem.desc}</p>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="glass rounded-xl p-3">
                      <div className="font-mono text-[10px] text-zinc-500">SHIPPED IN</div>
                      <div className="text-xl font-bold">{shippedIn > 0 ? `0${shippedIn}` : "—"} <span className="text-xs font-normal text-zinc-500">projects</span></div>
                    </div>
                    <div className="glass rounded-xl p-3">
                      <div className="font-mono text-[10px] text-zinc-500">LEVEL</div>
                      <div className="text-xl font-bold">Advanced</div>
                    </div>
                  </div>
                  <a href="#projects" className="mt-4 block text-center font-mono text-xs text-white hover:text-[#9aa6ff]">
                    → VIEW PROJECTS
                  </a>
                </motion.div>
              ) : (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass rounded-2xl p-6 font-mono text-xs leading-relaxed text-zinc-500"
                >
                  ◉ SELECT A NODE
                  <br />Click any technology for its dossier — usage, shipped projects, level.
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
