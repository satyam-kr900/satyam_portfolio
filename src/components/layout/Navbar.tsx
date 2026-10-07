"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

const LINKS = [
  { label: "WORK", href: "#projects" },
  { label: "ABOUT", href: "#about" },
  { label: "LAB", href: "#ai-lab" },
  { label: "PLAYGROUND", href: "#playground" },
  { label: "RESUME", href: "#resume" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const fn = () => setCompact(window.scrollY > 120);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2, duration: 0.7 }}
      className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
    >
      <motion.nav
        animate={{
          scale: compact ? 0.92 : 1,
          y: compact ? -2 : 0,
        }}
        className="glass-strong flex items-center gap-1 rounded-full py-2 pl-4 pr-2"
      >
        <a href="#top" className="mr-2 flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white font-mono text-[11px] font-bold text-black">
            S
          </span>
          <span className="hidden font-mono text-[10px] tracking-[0.3em] text-zinc-300 sm:inline">
            SATYAM KUMAR
          </span>
        </a>
        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-2 font-mono text-[11px] tracking-[0.2em] text-zinc-400 transition hover:bg-white/10 hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </div>
        <a
          href="#contact"
          className="ml-1 flex items-center gap-1 rounded-full bg-white px-4 py-2 font-mono text-[11px] font-bold text-black transition hover:bg-[#6e7cff] hover:text-white"
        >
          ENTER <ArrowUpRight size={13} />
        </a>
        <button
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          className="rounded-full p-2 text-white hover:bg-white/10 md:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </motion.nav>
      {open && (
        <nav className="glass-strong absolute left-4 right-4 top-16 mx-auto flex max-w-sm flex-col gap-1 rounded-3xl p-3 md:hidden">
          {[...LINKS, { label: "CONTACT", href: "#contact" }].map((l) => (
            <a
              key={l.href + l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-2xl px-6 py-3 text-center font-mono text-sm text-zinc-200 hover:bg-white/10 hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </motion.header>
  );
}
