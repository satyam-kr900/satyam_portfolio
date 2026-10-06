"use client";
import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SITE } from "@/lib/constants";
import { CONTACT_PORTRAIT } from "@/data/gallery";
import SmartImage from "@/components/ui/SmartImage";

/** CONTACT = CINEMATIC ENDING — everything fades, photo breathes behind the text */
export default function Contact() {
  const [sent, setSent] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const photoOpacity = useTransform(scrollYProgress, [0.4, 1], [0, 0.22]);
  const photoScale = useTransform(scrollYProgress, [0.4, 1], [1.12, 1]);

  return (
    <section id="contact" ref={ref} className="relative overflow-hidden border-t border-white/5 bg-black px-5 py-28 text-center">
      {/* ghost portrait behind text */}
      <motion.div style={{ opacity: photoOpacity, scale: photoScale }} className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="relative h-[130%] w-full max-w-2xl overflow-hidden" style={{ maskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)" }}>
          <SmartImage src={CONTACT_PORTRAIT} alt="Satyam Kumar portrait, atmospheric" className="h-full w-full object-cover object-top grayscale" />
        </div>
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,#6e7cff22,transparent_60%)]" />

      <div className="relative mx-auto max-w-3xl">
        <div className="font-mono text-xs tracking-[0.35em] text-zinc-500">FINAL TRANSMISSION</div>
        <h2 className="font-huge mt-4">
          WHAT
          <br />
          SHOULD WE
          <br />
          BUILD <span className="bg-gradient-to-r from-white via-[#9aa6ff] to-[#a855f7] bg-clip-text text-transparent">NEXT?</span>
        </h2>
        <p className="mx-auto mt-5 max-w-md text-zinc-400">Have an idea? Let&apos;s build it.</p>
        <div className="glass mx-auto mt-8 flex max-w-md items-center gap-4 rounded-2xl p-4 text-left">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-white/15 grayscale contrast-125">
            <SmartImage src={CONTACT_PORTRAIT} alt="Satyam Kumar — signature" className="h-full w-full object-cover object-top" />
          </div>
          <div className="font-mono text-xs leading-relaxed text-zinc-400">
            <span className="text-white">SATYAM KUMAR</span> — typically replies
            <br />
            within 24 hours. No black holes.
          </div>
        </div>
        {!sent ? (
          <form
            className="mx-auto mt-8 grid max-w-lg gap-3 text-left"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <input required placeholder="your name" className="glass-input rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-500" />
            <input required type="email" placeholder="email" className="glass-input rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-500" />
            <textarea required placeholder="project idea…" rows={4} className="glass-input rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-500" />
            <button className="rounded-full bg-white py-3.5 font-mono text-sm font-bold text-black transition hover:bg-[#6e7cff] hover:text-white">
              [ START A CONVERSATION ]
            </button>
          </form>
        ) : (
          <div className="glass mx-auto mt-8 max-w-lg rounded-2xl border-emerald-400/20 p-6 font-mono text-sm text-emerald-200">
            ✓ TRANSMISSION RECEIVED — I&apos;ll reply within 24h at {SITE.email}
          </div>
        )}
        <div className="mt-8 font-mono text-sm tracking-[0.25em] text-white">
          SATYAM KUMAR — FULL-STACK × AI ENGINEER
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-3 font-mono text-xs">
          <a href={SITE.github} className="glass-chip rounded-full px-5 py-2.5 transition hover:border-[#6e7cff]/60">GitHub ↗</a>
          <a href={SITE.linkedin} className="glass-chip rounded-full px-5 py-2.5 transition hover:border-[#6e7cff]/60">LinkedIn ↗</a>
          <a href={`mailto:${SITE.email}`} className="glass-chip rounded-full px-5 py-2.5 transition hover:border-[#6e7cff]/60">Email ↗</a>
        </div>
        <div className="mt-8 font-mono text-[10px] tracking-widest text-zinc-600">© 2026 SATYAM KUMAR</div>
      </div>
    </section>
  );
}
