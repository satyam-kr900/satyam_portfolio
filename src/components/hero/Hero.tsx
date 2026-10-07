"use client";
import { useEffect, useState, type MouseEvent as ReactMouseEvent } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowDown, Mail, MapPin, Sparkles } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

const ChromeSculptureCanvas = dynamic(
  () => import("@/three/hero/ChromeSculpture").then((m) => m.ChromeSculptureCanvas),
  { ssr: false, loading: () => <div className="h-full w-full animate-pulse rounded-3xl bg-white/[0.03]" /> }
);

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
  const ist = useISTClock();

  useEffect(() => {
    const id = setInterval(() => setRoleIdx((p) => (p + 1) % ROLES.length), 2600);
    return () => clearInterval(id);
  }, []);

  const onParallax = (e: ReactMouseEvent<HTMLElement>) => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--px", (((e.clientX - r.left) / r.width - 0.5) * 2).toFixed(3));
    e.currentTarget.style.setProperty("--py", (((e.clientY - r.top) / r.height - 0.5) * 2).toFixed(3));
  };

  return (
    <section id="top" onMouseMove={onParallax} className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[#050508]">
      {/* ===== calm studio background (3D sirf right side me hai) ===== */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-40 top-1/4 h-[480px] w-[480px] rounded-full bg-indigo-600/15 blur-[140px]" />
        <div className="absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-[140px]" />
        <div className="grid-bg absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black_10%,transparent_75%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#050508_85%)]" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-[1300px] flex-1 items-center gap-10 px-5 pb-10 pt-28 lg:grid-cols-[1.02fr_0.98fr] lg:px-8">
        {/* ============ LEFT: clean content (koi HUD cluster nahi) ============ */}
        <div>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease }} className="flex flex-wrap items-center gap-3 font-mono text-[10px] tracking-[0.18em]">
            <a href="#contact" className="group flex items-center gap-2.5 rounded-full border border-emerald-300/25 bg-emerald-400/10 py-1.5 pl-2 pr-4 transition hover:border-emerald-300/50">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-emerald-200">AVAILABLE FOR WORK</span>
              <ArrowUpRight size={12} className="text-emerald-300 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <span className="hidden items-center gap-1.5 text-zinc-500 sm:flex"><MapPin size={11} className="text-cyan-300/70" /> INDIA — <span className="text-zinc-300">{ist}</span></span>
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2, ease }} className="mt-7 font-mono text-[11px] tracking-[0.35em] text-cyan-300/90">
            SATYAM KUMAR — PORTFOLIO 2026
          </motion.p>

          <motion.h1 initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.3, ease }} className="mt-4 text-[clamp(2.6rem,5.5vw,4.6rem)] font-black leading-[1.02] tracking-tight text-white">
            I turn ideas into
            <br />
            <span className="bg-gradient-to-r from-cyan-300 via-sky-200 to-indigo-400 bg-clip-text text-transparent">
              intelligent products.
            </span>
          </motion.h1>

          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.42, ease }} className="mt-4 flex h-7 items-center gap-2 font-mono text-[13px] tracking-[0.18em]">
            <span className="text-zinc-500">&gt;_</span>
            <AnimatePresence mode="wait">
              <motion.span key={roleIdx} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.32 }} className="font-bold text-white">
                {ROLES[roleIdx].toUpperCase()}
              </motion.span>
            </AnimatePresence>
            <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="text-cyan-300">▊</motion.span>
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5, ease }} className="mt-4 max-w-[480px] text-[15px] leading-relaxed text-zinc-400">
            Full-stack × AI engineer. I ship RAG copilots, knowledge engines and cinematic web apps with Next.js, TypeScript and Gemini.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6, ease }} className="mt-7 flex flex-wrap gap-3">
            <MagneticButton>
              <a href="#projects" className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-white px-7 py-3.5 font-mono text-[11px] font-bold tracking-[0.15em] text-black transition hover:bg-cyan-300">
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                EXPLORE MY WORK <ArrowUpRight size={14} />
              </a>
            </MagneticButton>
            <MagneticButton>
              <a href="#contact" className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 font-mono text-[11px] tracking-[0.15em] text-zinc-200 backdrop-blur-md transition hover:border-cyan-300/60 hover:text-white hover:shadow-[0_0_24px_rgba(34,211,238,0.25)]">
                LET&apos;S TALK <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#22d3ee]" />
              </a>
            </MagneticButton>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7, ease }} className="mt-8 flex items-center gap-8">
            {STATS.map((st) => (
              <div key={st.l}>
                <div className="text-2xl font-black text-white"><CountUp to={st.v} suffix={st.s} /></div>
                <div className="mt-0.5 font-mono text-[9px] tracking-[0.2em] text-zinc-500">{st.l.toUpperCase()}</div>
              </div>
            ))}
            <span className="hidden h-10 w-px bg-white/10 sm:block" />
            <div className="hidden items-center gap-2 sm:flex">
              {[{ icon: GithubIcon, href: "https://github.com/satyam-kr900", label: "GitHub" }, { icon: LinkedinIcon, href: "https://linkedin.com/in/satyam-kumar-77116332b", label: "LinkedIn" }, { icon: Mail, href: "mailto:satyam900kr@gmail.com", label: "Email" }].map((s) => (
                <a key={s.label} href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition hover:border-cyan-300/50 hover:text-cyan-200">
                  <s.icon size={15} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ============ RIGHT: alag 3D sculpture (sirf ek object) ============ */}
        <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1, delay: 0.35, ease }} className="relative h-[420px] sm:h-[480px] lg:h-[580px]">
          <div className="absolute inset-8 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.14),rgba(168,85,247,0.1)_55%,transparent_75%)] blur-2xl" />
          <div className="absolute inset-0 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] backdrop-blur-sm">
            <ChromeSculptureCanvas />
          </div>
          {/* floating glass chips — 3D se alag, halke */}
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="glass absolute left-4 top-6 rounded-2xl px-4 py-2.5">
            <div className="font-mono text-[8px] tracking-[0.25em] text-cyan-300">STACK</div>
            <div className="text-sm font-bold text-white">Next.js · TypeScript</div>
          </motion.div>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.6 }} className="glass absolute bottom-8 right-4 rounded-2xl px-4 py-2.5">
            <div className="font-mono text-[8px] tracking-[0.25em] text-fuchsia-300">AI LAYER</div>
            <div className="text-sm font-bold text-white">RAG · Gemini</div>
          </motion.div>
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-white/10 bg-black/60 px-3 py-1 font-mono text-[9px] tracking-[0.25em] text-white/60 backdrop-blur-md">
            <Sparkles size={10} className="text-cyan-300" /> CHROME CORE · LIVE
          </div>
        </motion.div>
      </div>

      {/* bottom strip */}
      <div className="relative z-10 border-t border-white/10 bg-black/40 backdrop-blur-md">
        <div className="group relative overflow-hidden py-3">
          <div className="flex w-max animate-[marquee_28s_linear_infinite] gap-10 whitespace-nowrap font-mono text-[11px] tracking-[0.25em] group-hover:[animation-play-state:paused]">
            {[...MARQUEE, ...MARQUEE].map((t, i) => (
              <span key={i} className={`flex items-center gap-10 ${i % 2 ? "text-zinc-500" : "text-cyan-400/80"}`}>{t} <span className="text-zinc-700">◆</span></span>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#050508] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#050508] to-transparent" />
        </div>
        <a href="#about" className="absolute bottom-full right-5 mb-3 hidden items-center gap-2 font-mono text-[9px] tracking-[0.3em] text-zinc-500 transition hover:text-cyan-200 lg:flex">
          SCROLL <ArrowDown size={11} />
        </a>
      </div>
    </section>
  );
}
