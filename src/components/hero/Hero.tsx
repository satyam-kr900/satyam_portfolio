"use client";
import { useState, type CSSProperties, type MouseEvent as ReactMouseEvent } from "react";
import dynamic from "next/dynamic";

const HoloGlobeCanvas = dynamic(
  () => import("@/three/hero/HeroScene").then((m) => m.HoloGlobeCanvas),
  { ssr: false }
);
const HeroScene = dynamic(() => import("@/three/hero/HeroScene"), { ssr: false });

type Node = {
  label: string;
  tech: string;
  href: string;
  kind: "SKILL" | "PROJECT";
  /** desktop position (% of stage) — matches reference screenshot */
  x: string;
  y: string;
  lineTo: "left" | "right";
};

const NODES: Node[] = [
  { label: "AI / GenAI", tech: "Gemini API · RAG · Embeddings", href: "#ai-lab", kind: "SKILL", x: "47%", y: "14%", lineTo: "right" },
  { label: "Frontend", tech: "React · Next.js 14 · Tailwind", href: "#stack", kind: "SKILL", x: "63%", y: "8%", lineTo: "left" },
  { label: "AI Career Copilot", tech: "Next.js · Gemini · RAG · ATS engine", href: "#projects", kind: "PROJECT", x: "70%", y: "20%", lineTo: "left" },
  { label: "Backend", tech: "Node.js · Express · FastAPI", href: "#stack", kind: "SKILL", x: "79%", y: "29%", lineTo: "left" },
  { label: "KnowSamvidhan", tech: "Next.js · Prisma · Supabase", href: "#projects", kind: "PROJECT", x: "76%", y: "45%", lineTo: "left" },
  { label: "Data", tech: "PostgreSQL · Prisma · Supabase", href: "#stack", kind: "SKILL", x: "77%", y: "60%", lineTo: "left" },
  { label: "KrishiMitra", tech: "Next.js · Node · Vision AI", href: "#projects", kind: "PROJECT", x: "70%", y: "69%", lineTo: "left" },
  { label: "Full-stack builds", tech: "React · Express · MongoDB", href: "#projects", kind: "PROJECT", x: "62%", y: "80%", lineTo: "left" },
];

/** parallax depth helper — layer drifts with mouse vars set on the section */
const depth = (x: number, y: number): CSSProperties => ({
  transform: `translate3d(calc(var(--px, 0) * ${x}px), calc(var(--py, 0) * ${y}px), 0)`,
  willChange: "transform",
});

const MARQUEE = [  "RAG", "LLMS", "AI AGENTS", "BUILT IN PUBLIC", "AI × FULL-STACK",
  "REACT", "NEXT.JS", "TYPESCRIPT", "NODE", "EXPRESS",
  "FASTAPI", "MONGODB", "POSTGRESQL", "SUPABASE",
];

function HudCard({
  node,
  index,
  active,
  onHover,
  className = "",
}: {
  node: Node;
  index: string;
  active: boolean;
  onHover: (on: boolean) => void;
  className?: string;
}) {
  return (
    <a
      href={node.href}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      onFocus={() => onHover(true)}
      onBlur={() => onHover(false)}
      className={`group block min-w-[130px] border bg-[#0a0f1e]/80 backdrop-blur-xl transition-all duration-300 ${
        active
          ? "border-cyan-300 shadow-[0_0_28px_rgba(34,211,238,0.35)]"
          : "border-cyan-200/15 hover:border-cyan-200/40"
      } ${className}`}
      style={{ clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)" }}
    >
      <div className="px-3 py-2">
        <div className="flex items-center justify-between font-mono text-[8px] tracking-[0.2em]">
          <span className={node.kind === "SKILL" ? "text-cyan-300/80" : "text-fuchsia-300/80"}>{node.kind}</span>
          <span className="text-zinc-600">{index}</span>
        </div>
        <div className="mt-0.5 whitespace-nowrap text-[13px] font-bold text-white">{node.label}</div>
        <div
          className={`overflow-hidden font-mono text-[10px] leading-relaxed text-cyan-200 transition-all duration-300 ${
            active ? "mt-1 max-h-20 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {node.tech}
        </div>
      </div>
      {/* connection dot */}
      <span
        className={`absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full transition ${
          active ? "bg-cyan-200 shadow-[0_0_10px_#22d3ee]" : "bg-cyan-200/60"
        } ${node.lineTo === "left" ? "-left-[3px]" : "-right-[3px]"}`}
      />
    </a>
  );
}

export default function Hero() {
  const [active, setActive] = useState<number | null>(null);

  // mouse parallax — writes --px/--py vars, layers drift at different depths
  const onParallax = (e: ReactMouseEvent<HTMLElement>) => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--px", (((e.clientX - r.left) / r.width - 0.5) * 2).toFixed(3));
    e.currentTarget.style.setProperty("--py", (((e.clientY - r.top) / r.height - 0.5) * 2).toFixed(3));
  };

  return (
    <section id="top" onMouseMove={onParallax} className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[#050508]">
      <HeroScene />

      <div className="relative z-10 mx-auto flex w-full max-w-[1500px] flex-1 flex-col px-5 pt-24 lg:px-8">
        {/* ============ DESKTOP STAGE (matches screenshot) ============ */}
        <div className="relative hidden min-h-[640px] flex-1 xl:block">
          {/* giant name behind portrait */}
          <div className="pointer-events-none absolute left-0 top-[6%] z-0 select-none" style={depth(18, 12)}>
            <div className="bg-gradient-to-b from-white via-white to-[#8ea2ff] bg-clip-text text-[7.5vw] font-black leading-[0.9] tracking-tight text-transparent">
              SATYAM
            </div>
            <div
              className="text-[7.5vw] font-black leading-[0.9] tracking-tight text-transparent"
              style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.55)" }}
            >
              KUMAR
            </div>
          </div>

          {/* SVG lines + HUD cards — one parallax layer so lines stay connected */}
          <div className="absolute inset-0 z-10" style={depth(-16, -10)}>
          <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 1000 620" preserveAspectRatio="none">
            {NODES.map((n, i) => {
              const nx = parseFloat(n.x) * 10;
              const ny = parseFloat(n.y) * 6.2 + 20;
              const isActive = active === i;
              const col = n.kind === "SKILL" ? "#22d3ee" : "#e879f9";
              return (
                <line
                  key={n.label}
                  x1="600"
                  y1="300"
                  x2={n.lineTo === "left" ? nx + 8 : nx + 130}
                  y2={ny}
                  stroke={isActive ? col : "rgba(125,211,252,0.30)"}
                  strokeWidth={isActive ? 1.8 : 1}
                  style={isActive ? { filter: `drop-shadow(0 0 6px ${col})` } : undefined}
                />
              );
            })}
          </svg>

          {/* left bottom block */}
          <div className="absolute bottom-[2%] left-0 z-20 max-w-[330px]" style={depth(10, 8)}>
            <div className="font-mono text-[10px] tracking-[0.25em] text-zinc-400">
              FULL-STACK + AI ENGINEER · INDIA · 2026
            </div>
            <h1 className="mt-3 text-[30px] font-medium leading-[1.15] text-white">
              I turn ideas into
              <br />
              <span className="bg-gradient-to-r from-cyan-300 to-indigo-400 bg-clip-text font-bold text-transparent">
                intelligent digital
                <br />
                products.
              </span>
            </h1>
            <div className="mt-5 flex gap-3">
              <a href="#projects" className="bg-white px-5 py-3 font-mono text-[11px] tracking-[0.15em] text-black transition hover:bg-cyan-300">
                EXPLORE MY WORK →
              </a>
              <a href="#resume" className="border border-white/15 px-5 py-3 font-mono text-[11px] tracking-[0.15em] text-zinc-200 transition hover:border-cyan-300/50 hover:text-white">
                VIEW RESUME
              </a>
            </div>
              <div className="mt-6 space-y-1 font-mono text-[10px] tracking-[0.12em] text-zinc-500">
                <div>&gt; PORTFOLIO.OS v2026 <span className="ml-2 text-zinc-400">.........</span> <span className="text-zinc-300">ONLINE</span></div>
                <div>&gt; SKILLS <span className="ml-2 text-zinc-400">...................</span> <span className="text-emerald-400">14</span> LOADED</div>
                <div>&gt; PROJECTS <span className="ml-2 text-zinc-400">.................</span> <span className="text-emerald-400">05</span> LINKED</div>
                <div>&gt; HOLOGRAM <span className="ml-2 text-zinc-400">................</span> DEPLOYED</div>
              </div>
          </div>

          {/* globe — hero core */}
          <div className="absolute left-[46%] top-[20%] z-10 h-[360px] w-[360px]" style={depth(26, 18)}>
            <HoloGlobeCanvas boost={active !== null} />
            <div className="pointer-events-none absolute left-1/2 top-[46%] -translate-x-1/2 font-mono text-[10px] tracking-[0.25em] text-white/50">
              INDIA · HOME
            </div>
          </div>

          {/* 8 HUD cards around globe */}
          {NODES.map((n, i) => (
            <div key={n.label} className="absolute" style={{ left: n.x, top: n.y }}>
              <HudCard node={n} index={`0${i + 1}`} active={active === i} onHover={(on) => setActive(on ? i : null)} />
            </div>
          ))}
          </div>{/* /parallax: lines + cards */}

          {/* right edge dots */}
          <div className="absolute right-0 top-[38%] z-20 flex flex-col items-center gap-3">
            <span className={`h-2.5 w-2.5 rounded-full ${active === null ? "bg-indigo-400 shadow-[0_0_12px_#818cf8]" : "bg-zinc-600"}`} />
            {NODES.slice(0, 6).map((n, i) => (
              <a key={n.label} href={n.href} aria-label={n.label}
                onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)}
                className={`h-2 w-2 rounded-full border ${active === i ? "border-cyan-200 bg-cyan-200" : "border-zinc-600"}`} />
            ))}
          </div>
        </div>

        {/* ============ MOBILE / TABLET ============ */}
        <div className="flex-1 xl:hidden">
          <div className="pointer-events-none select-none">
            <div className="bg-gradient-to-b from-white to-[#8ea2ff] bg-clip-text text-[16vw] font-black leading-[0.9] text-transparent">SATYAM</div>
            <div className="text-[16vw] font-black leading-[0.9] text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.5)" }}>KUMAR</div>
          </div>
          <div className="relative mx-auto h-[280px] w-full max-w-[340px]">
            <HoloGlobeCanvas boost={active !== null} />
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] tracking-[0.25em] text-white/60">INDIA · HOME</div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {NODES.map((n, i) => (
              <HudCard key={n.label} node={n} index={`0${i + 1}`} active={active === i} onHover={(on) => setActive(on ? i : null)} className="relative" />
            ))}
          </div>
          <div className="mt-6">
            <div className="font-mono text-[10px] tracking-[0.25em] text-zinc-400">FULL-STACK + AI ENGINEER · INDIA · 2026</div>
            <div className="mt-2 text-2xl text-white">I turn ideas into <span className="bg-gradient-to-r from-cyan-300 to-indigo-400 bg-clip-text font-bold text-transparent">intelligent digital products.</span></div>
            <div className="mt-4 flex gap-3">
              <a href="#projects" className="bg-white px-5 py-3 font-mono text-[11px] text-black">EXPLORE MY WORK →</a>
              <a href="#resume" className="border border-white/15 px-5 py-3 font-mono text-[11px] text-zinc-200">VIEW RESUME</a>
            </div>
          </div>
        </div>
      </div>

      {/* bottom tech marquee */}
      <div className="relative z-10 overflow-hidden border-t border-white/10 py-3">
        <div className="flex w-max animate-[marquee_28s_linear_infinite] gap-10 whitespace-nowrap font-mono text-[11px] tracking-[0.25em]">
          {[...MARQUEE, ...MARQUEE].map((t, i) => (
            <span key={i} className={i % 2 ? "text-zinc-500" : "text-cyan-400/80"}>{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
