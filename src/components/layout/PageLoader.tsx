"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SYSTEMS = ["3D ENGINE", "AI SYSTEM", "PROJECTS"] as const;

export default function PageLoader() {
  const [progress, setProgress] = useState<number[]>([0, 0, 0]);
  const [phase, setPhase] = useState<"boot" | "welcome" | "split" | "done">("boot");

  useEffect(() => {
    let i = 0;
    const tick = setInterval(() => {
      i += 1;
      setProgress([Math.min(100, i * 9), Math.min(100, i * 7 - 10), Math.min(100, i * 5 - 25)]);
      if (i > 16) {
        clearInterval(tick);
        setPhase("welcome");
        setTimeout(() => setPhase("split"), 900);
        setTimeout(() => setPhase("done"), 1600);
      }
    }, 90);
    return () => clearInterval(tick);
  }, []);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div className="fixed inset-0 z-[100] bg-black" exit={{ opacity: 0 }}>
          {/* split-open panels */}
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 bg-[#050507]"
            animate={phase === "split" ? { y: "-100%" } : { y: 0 }}
            transition={{ duration: 0.7, ease: [0.7, 0, 0.3, 1] }}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-[#050507]"
            animate={phase === "split" ? { y: "100%" } : { y: 0 }}
            transition={{ duration: 0.7, ease: [0.7, 0, 0.3, 1] }}
          />
          {phase !== "split" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
              {phase === "boot" ? (
                <>
                  <motion.div
                    initial={{ opacity: 0, letterSpacing: "0.2em" }}
                    animate={{ opacity: 1, letterSpacing: "0.55em" }}
                    transition={{ duration: 1 }}
                    className="text-center font-mono text-sm text-white md:text-base"
                  >
                    S A T Y A M&nbsp;&nbsp;K U M A R
                  </motion.div>
                  <div className="mt-2 font-mono text-[10px] tracking-[0.4em] text-zinc-500">
                    DIGITAL PORTFOLIO / 2026
                  </div>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mt-6 h-px w-64 origin-center bg-gradient-to-r from-transparent via-white/60 to-transparent md:w-96"
                  />
                  <div className="mt-6 font-mono text-[10px] tracking-[0.35em] text-zinc-400">
                    INITIALIZING EXPERIENCE…
                  </div>
                  <div className="mt-4 w-64 space-y-2.5 md:w-80">
                    {SYSTEMS.map((s, i) => (
                      <div key={s} className="font-mono text-[10px]">
                        <div className="flex justify-between text-zinc-500">
                          <span>{s}</span>
                          <span className="text-[#9aa6ff]">{Math.max(0, progress[i])}%</span>
                        </div>
                        <div className="mt-1 h-[3px] overflow-hidden rounded bg-white/10">
                          <div
                            className="h-full bg-gradient-to-r from-[#6e7cff] to-[#a855f7] transition-all duration-100"
                            style={{ width: `${Math.max(0, progress[i])}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <div className="font-huge text-white">WELCOME.</div>
                  <div className="mt-2 font-mono text-[10px] tracking-[0.4em] text-[#9aa6ff]">
                    SATYAM.SYS // ONLINE
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
