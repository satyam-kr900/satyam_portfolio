import { SITE } from "@/lib/constants";
import { socials } from "@/data/projects";

export default function Footer() {
  return (
    <footer className="glass-strong border-t border-white/10 px-5 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="font-huge text-white/95">SATYAM</div>
        <div className="font-huge text-stroke">KUMAR</div>
        <div className="mt-4 flex flex-wrap gap-4 font-mono text-xs text-zinc-400">
          {socials.map((s) => (
            <a key={s.label} href={s.href} className="hover:text-white">
              {s.label} ↗
            </a>
          ))}
          <span className="ml-auto">FULL-STACK × AI — {SITE.location} — 2026</span>
        </div>
      </div>
    </footer>
  );
}
