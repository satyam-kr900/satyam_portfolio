"use client";
import { useEffect, useState } from "react";

/** Tiny system-status + scroll-progress HUD. Bottom-left, non-interactive. */
export default function Hud() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const update = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? Math.min(1, window.scrollY / h) : 0);
      if (!reduced) raf = requestAnimationFrame(update);
    };
    if (reduced) {
      update();
      window.addEventListener("scroll", update, { passive: true });
      return () => window.removeEventListener("scroll", update);
    }
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed bottom-5 left-5 z-[60] hidden font-mono text-[9px] tracking-[0.25em] text-zinc-600 md:block">
      <div className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
        <span>SYS.ONLINE</span>
        <span className="text-zinc-700">/</span>
        <span>TRAV {(progress * 100).toFixed(0).padStart(3, "0")}%</span>
      </div>
      <div className="mt-1.5 h-px w-32 bg-white/10">
        <div className="h-full bg-gradient-to-r from-[#6e7cff] to-[#22d3ee]" style={{ width: `${progress * 100}%` }} />
      </div>
      <div className="mt-1.5 text-zinc-700">26.14°N / 78.05°E — 2026</div>
    </div>
  );
}
