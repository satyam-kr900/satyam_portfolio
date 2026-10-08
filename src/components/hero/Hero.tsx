"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowDown, Mail, MapPin } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import Image from "next/image";

const FractalPlanets = dynamic(() => import("@/three/hero/FractalPlanets"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 animate-pulse bg-black" />,
});

const ROLES = ["AI Engineer", "Full-Stack Developer", "GenAI Builder", "RAG Specialist"];
const MARQUEE = ["NEXT.JS", "TYPESCRIPT", "RAG SYSTEMS", "GEMINI AI", "NODE.JS", "POSTGRESQL", "SUPABASE", "TAILWIND", "FRAMER MOTION", "THREE.JS"];

const STATS = [
  { v: 14, s: "+", l: "Technologies" },
  { v: 5, s: "", l: "Live projects" },
  { v: 3, s: "+", l: "AI systems shipped" },
];

function GithubIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
  );
}
function LinkedinIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
  );
}

function useISTClock() {
  const [time, setTime] = useState("--:--:--");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true, timeZone: "Asia/Kolkata" });
    const tick = () => setTime(fmt.format(new Date()).toUpperCase());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / 1400);
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * to));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    const t = setTimeout(() => { raf = requestAnimationFrame(step); }, 800);
    return () => { clearTimeout(t); cancelAnimationFrame(raf); };
  }, [to]);
  return <span>{String(val).padStart(2, "0")}{suffix}</span>;
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const fractalWrapRef = useRef<HTMLDivElement>(null);
  const ist = useISTClock();

  useEffect(() => {
    const id = setInterval(() => setRoleIdx((p) => (p + 1) % ROLES.length), 2600);
    return () => clearInterval(id);
  }, []);

  const triggerDive = useCallback(() => {
    const el = fractalWrapRef.current?.firstElementChild as HTMLElement & { __fractalDive?: () => void } | null;
    // FractalPlanets renders mount div as first child; its methods are attached there
    const mount = fractalWrapRef.current?.querySelector("div");
    (mount as (HTMLElement & { __fractalDive?: () => void }) | null)?.__fractalDive?.();
    void el;
  }, []);

  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden bg-black">
      {/* ===== FRACTAL PLANETS frontpage (dd.html port) ===== */}
      <div ref={fractalWrapRef} className="absolute inset-0 cursor-crosshair touch-pan-y [&_canvas]:touch-pan-y">
        <FractalPlanets />
      </div>

      {/* cinematic overlays from dd.html */}
      <div className="pointer-events-none absolute inset-0 z-[5] animate-pulse bg-[radial-gradient(circle,rgba(0,150,255,0.04)_0%,transparent_70%)] mix-blend-screen" aria-hidden />
      <div className="pointer-events-none absolute inset-0 z-[4] bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.6)_100%)]" aria-hidden />
      <div className="pointer-events-none absolute inset-0 z-[4] bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.55)_90%)]" aria-hidden />

      {/* top title */}
      <div className="pointer-events-none absolute left-1/2 top-16 z-10 w-full -translate-x-1/2 px-4 text-center sm:top-20 md:top-24">
        <motion.p
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="whitespace-nowrap font-mono text-[9px] tracking-[0.35em] text-cyan-300/60 [text-shadow:0_0_20px_rgba(0,255,255,0.2)] sm:text-[10px] sm:tracking-[0.5em]"
        >
          ✦ FRACTAL COSMOS ✦
        </motion.p>
      </div>

      {/* ===== portfolio overlay content ===== */}
      <div className="pointer-events-none relative z-10 mx-auto grid w-full max-w-[1300px] flex-1 grid-cols-1 items-center gap-8 px-4 pb-16 pt-24 sm:gap-10 sm:px-5 sm:pb-20 sm:pt-28 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pt-32">
        {/* LEFT: intro */}
        <div className="pointer-events-none min-w-0 text-center sm:text-left">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease }} className="pointer-events-auto flex flex-wrap items-center justify-center gap-3 font-mono text-[10px] tracking-[0.18em] sm:justify-start">
            <a href="#contact" className="group flex items-center gap-2.5 rounded-full border border-emerald-300/25 bg-emerald-400/10 py-1.5 pl-2 pr-4 backdrop-blur-md transition hover:border-emerald-300/50">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-emerald-200">AVAILABLE FOR WORK</span>
              <ArrowUpRight size={12} className="text-emerald-300 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <span className="hidden items-center gap-1.5 text-zinc-500 sm:flex"><MapPin size={11} className="text-cyan-300/70" /> INDIA — <span className="text-zinc-300">{ist}</span></span>
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2, ease }} className="mt-5 break-words font-mono text-[10px] tracking-[0.25em] text-cyan-300/90 [text-shadow:0_0_15px_rgba(0,255,255,0.3)] sm:mt-7 sm:text-[11px] sm:tracking-[0.35em]">
            SATYAM KUMAR — PORTFOLIO 2026
          </motion.p>

          <motion.h1 initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.3, ease }} className="mt-4 text-balance text-[clamp(2rem,9vw,4.6rem)] font-black leading-[1.05] tracking-tight text-white drop-shadow-[0_0_30px_rgba(0,0,0,0.9)]">
            I turn ideas into
            <br />
            <span className="bg-gradient-to-r from-cyan-300 via-sky-200 to-indigo-400 bg-clip-text text-transparent">
              intelligent products.
            </span>
          </motion.h1>

          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.42, ease }} className="mt-4 flex h-7 items-center justify-center gap-2 overflow-hidden font-mono text-[12px] tracking-[0.14em] sm:justify-start sm:text-[13px] sm:tracking-[0.18em]">
            <span className="text-zinc-500">&gt;_</span>
            <AnimatePresence mode="wait">
              <motion.span key={roleIdx} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.32 }} className="font-bold text-white">
                {ROLES[roleIdx].toUpperCase()}
              </motion.span>
            </AnimatePresence>
            <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="text-cyan-300">▊</motion.span>
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5, ease }} className="mx-auto mt-4 max-w-[480px] text-[14px] leading-relaxed text-zinc-300 [text-shadow:0_1px_12px_rgba(0,0,0,0.9)] sm:mx-0 sm:text-[15px]">
            Full-stack × AI engineer. I ship RAG copilots, knowledge engines and cinematic web apps with Next.js, TypeScript and Gemini.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6, ease }} className="pointer-events-auto mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap">
            <MagneticButton>
              <a href="#projects" className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-7 py-3.5 font-mono text-[11px] font-bold tracking-[0.15em] text-black transition hover:bg-cyan-300">
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                EXPLORE MY WORK <ArrowUpRight size={14} />
              </a>
            </MagneticButton>
            <MagneticButton>
              <a href="#contact" className="flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 font-mono text-[11px] tracking-[0.15em] text-zinc-200 backdrop-blur-md transition hover:border-cyan-300/60 hover:text-white hover:shadow-[0_0_24px_rgba(34,211,238,0.25)]">
                LET&apos;S TALK <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#22d3ee]" />
              </a>
            </MagneticButton>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7, ease }} className="pointer-events-auto mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-4 sm:mt-8 sm:justify-start sm:gap-8">
            {STATS.map((st) => (
              <div key={st.l}>
                <div className="text-xl font-black text-white sm:text-2xl"><CountUp to={st.v} suffix={st.s} /></div>
                <div className="mt-0.5 font-mono text-[9px] tracking-[0.2em] text-zinc-400">{st.l.toUpperCase()}</div>
              </div>
            ))}
            <span className="hidden h-10 w-px bg-white/10 sm:block" />
            <div className="flex items-center gap-2">
              {[{ icon: GithubIcon, href: "https://github.com/satyam-kr900", label: "GitHub" }, { icon: LinkedinIcon, href: "https://linkedin.com/in/satyam-kumar-77116332b", label: "LinkedIn" }, { icon: Mail, href: "mailto:satyam900kr@gmail.com", label: "Email" }].map((s) => (
                <a key={s.label} href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/40 text-zinc-400 backdrop-blur-md transition hover:border-cyan-300/50 hover:text-cyan-200">
                  <s.icon size={15} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* RIGHT: portrait with solar orbit ring around it */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease }}
          className="pointer-events-auto order-[-1] flex justify-center lg:order-none"
        >
          <button
            onClick={triggerDive}
            aria-label="Dive deeper into the cosmos"
            className="group relative h-[220px] w-[220px] sm:h-[300px] sm:w-[300px] lg:h-[360px] lg:w-[360px]"
          >
            {/* glow */}
            <div className="absolute inset-6 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.22),rgba(168,85,247,0.12)_55%,transparent_75%)] blur-2xl" />
            {/* solar orbit rings — around the image, not under */}
            <div className="absolute inset-0 animate-[spin-slow_14s_linear_infinite] rounded-full border border-cyan-300/30">
              <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_12px_#22d3ee]" />
              <span className="absolute -bottom-1 left-1/4 h-1.5 w-1.5 rounded-full bg-fuchsia-400/80 shadow-[0_0_8px_#e879f9]" />
            </div>
            <div className="absolute inset-4 animate-[spin-slow_22s_linear_infinite_reverse] rounded-full border border-white/10">
              <span className="absolute left-6 top-6 h-2 w-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)]" />
            </div>
            {/* portrait */}
            <div className="absolute inset-10 overflow-hidden rounded-full border border-white/20 shadow-[0_0_60px_rgba(34,211,238,0.25)] transition group-hover:border-cyan-300/60">
              <Image
                src="/images/my-pic/stud.png"
                alt="Satyam Kumar"
                width={600}
                height={600}
                className="h-full w-full object-cover object-top"
                priority
              />
              <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>
          </button>
        </motion.div>
      </div>

      {/* bottom marquee strip */}
      <div className="relative z-10">
        <div className="border-t border-white/10 bg-black/60 backdrop-blur-md">
          <div className="group relative overflow-hidden py-2.5 sm:py-3">
            <div className="flex w-max animate-[marquee_28s_linear_infinite] gap-8 whitespace-nowrap font-mono text-[10px] tracking-[0.2em] group-hover:[animation-play-state:paused] sm:gap-10 sm:text-[11px] sm:tracking-[0.25em]">
              {[...MARQUEE, ...MARQUEE].map((t, i) => (
                <span key={i} className={`flex items-center gap-10 ${i % 2 ? "text-zinc-500" : "text-cyan-400/80"}`}>{t} <span className="text-zinc-700">◆</span></span>
              ))}
            </div>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent" />
          </div>
          <a href="#about" className="absolute bottom-full right-5 mb-3 hidden items-center gap-2 font-mono text-[9px] tracking-[0.3em] text-zinc-500 transition hover:text-cyan-200 lg:flex">
            SCROLL <ArrowDown size={11} />
          </a>
        </div>
      </div>
    </section>
  );
}
