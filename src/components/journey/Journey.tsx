"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { journey } from "@/data/projects";

/** JOURNEY = 3D TUNNEL — the camera travels through your timeline */
export default function Journey() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const tunnel = useTransform(scrollYProgress, [0, 1], [1.4, 0.7]);
  const glow = useTransform(scrollYProgress, [0, 1], [0.25, 1]);

  return (
    <section id="journey" ref={ref} className="relative overflow-hidden border-t border-white/5 bg-[#050505] px-5 py-24">
      {/* tunnel rings */}
      <motion.div style={{ scale: tunnel, opacity: glow }} className="pointer-events-none absolute inset-0 flex items-center justify-center">
        {[420, 640, 900, 1200].map((s) => (
          <div
            key={s}
            className="absolute rounded-full border border-[#6e7cff]/20"
            style={{ width: s, height: s }}
          />
        ))}
        <div className="absolute h-64 w-64 rounded-full bg-[#6e7cff]/10 blur-3xl" />
      </motion.div>

      <div className="relative mx-auto max-w-3xl">
        <div className="text-center font-mono text-xs tracking-[0.35em] text-zinc-500">TRAVERSING TIME</div>
        <h2 className="mt-2 text-center text-4xl font-bold md:text-5xl">MY JOURNEY</h2>
        <div className="relative mt-12 pl-8">
          <div className="absolute bottom-4 left-[11px] top-4 w-px bg-gradient-to-b from-[#6e7cff] via-white/20 to-transparent" />
          {journey.map((j, i) => (
            <motion.div
              key={j.year}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.06 }}
              className="group relative pb-8"
            >
              <span className="absolute -left-8 top-1 flex h-6 w-6 items-center justify-center rounded-full border border-[#6e7cff]/50 bg-black font-mono text-[8px] text-[#9aa6ff] shadow-[0_0_16px_rgba(110,124,255,0.5)]">
                ●
              </span>
              <div className="glass rounded-xl p-5 transition duration-300 group-hover:translate-x-2 group-hover:border-[#6e7cff]/50">
                <div className="font-mono text-xs tracking-widest text-[#9aa6ff]">{j.year}</div>
                <div className="mt-1 text-lg font-bold">{j.title}</div>
                <div className="mt-1 text-sm text-zinc-400">{j.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
