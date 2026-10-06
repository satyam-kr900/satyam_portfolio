"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ABOUT_PORTRAIT } from "@/data/gallery";
import SmartImage from "@/components/ui/SmartImage";

const ROWS = [
  { k: "NAME", v: "SATYAM KUMAR", d: "Hooghly, West Bengal, IN · Hindi / English" },
  { k: "ROLE", v: "FULL-STACK × AI ENGINEER", d: "Next.js · TypeScript · Node · PostgreSQL" },
  { k: "FOCUS", v: "AI PRODUCTS / WEB APPS / GENAI", d: "ATS engines · RAG systems · advisory platforms" },
  { k: "CURRENTLY", v: "BUILDING · LEARNING · EXPERIMENTING", d: "AI Career Copilot · KrishiMitra AI · KnowSamvidhan" },
];

/** ABOUT = DIGITAL X-RAY — spec sheet + reactive wireframe portrait */
export default function About() {
  const [hot, setHot] = useState<number | null>(null);

  return (
    <section id="about" className="relative border-t border-white/5 bg-[#050505] px-5 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="font-mono text-xs tracking-[0.35em] text-[#6e7cff]">IDENTITY // X-RAY</div>
        <h2 className="mt-2 text-4xl font-bold md:text-6xl">ABOUT ME</h2>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          {/* X-ray portrait — reacts to row hover */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="relative overflow-hidden rounded-[2rem]"
          >
            <div className="relative aspect-[3/4] max-h-[560px] w-full overflow-hidden bg-[#0a0a10]">
              <SmartImage
                src={ABOUT_PORTRAIT}
                alt="Satyam Kumar — professional portrait"
                className={`h-full w-full object-cover object-top transition-all duration-700 ${
                  hot !== null ? "scale-[1.04] saturate-150" : "saturate-[0.85]"
                }`}
              />
              {/* depth-map grid */}
              <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" />
              {/* reactive scan band follows hovered row */}
              <motion.div
                className="pointer-events-none absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-[#6e7cff]/30 to-transparent"
                animate={{ top: hot !== null ? [`${hot * 22}%`, `${hot * 22 + 8}%`] : ["-30%", "110%"] }}
                transition={hot !== null ? { duration: 1.2, repeat: Infinity, repeatType: "mirror" } : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/15" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute left-4 top-4 flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-white/85">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                {hot !== null ? `SCANNING // ${ROWS[hot].k}` : "SUBJECT_01 // X-RAY"}
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div className="font-mono text-[10px] leading-relaxed tracking-[0.25em] text-white/75">
                  DEPTH ✓ · MESH ✓<br />TEXTURE ✓
                </div>
                <div className="glass-strong rounded-full px-4 py-2 font-mono text-[10px] tracking-widest text-white">
                  ● OPEN TO WORK
                </div>
              </div>
            </div>
          </motion.div>

          {/* Identity spec */}
          <div className="flex flex-col justify-center">
            <div className="font-mono text-xs tracking-[0.35em] text-zinc-500">IDENTITY</div>
            <div className="mt-4 divide-y divide-white/5 border-y border-white/10">
              {ROWS.map((r, i) => (
                <button
                  key={r.k}
                  onMouseEnter={() => setHot(i)}
                  onMouseLeave={() => setHot(null)}
                  onFocus={() => setHot(i)}
                  onBlur={() => setHot(null)}
                  className="group flex w-full flex-col gap-1 py-5 text-left transition"
                >
                  <span className={`font-mono text-[10px] tracking-[0.35em] transition ${hot === i ? "text-[#9aa6ff]" : "text-zinc-500"}`}>
                    {r.k}
                  </span>
                  <span className={`text-2xl font-bold transition md:text-3xl ${hot === i ? "translate-x-2 text-white" : "text-zinc-200"}`}>
                    {r.v}
                  </span>
                  <span className="font-mono text-xs text-zinc-500">{r.d}</span>
                </button>
              ))}
            </div>
            <p className="mt-6 max-w-xl leading-relaxed text-zinc-300">
              Final-year B.Tech CSE student who builds full-stack, AI-integrated web applications.
              Comfortable owning a feature from database schema and authentication to AI API
              integration and responsive UI — currently seeking a full-stack / SWE internship or
              entry-level role.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
