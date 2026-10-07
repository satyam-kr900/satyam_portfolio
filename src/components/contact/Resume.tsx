"use client";
import { useState } from "react";
import { Download, MapPin, Phone, Mail, Printer, ClipboardCopy, Check, Globe, Link } from "lucide-react";
import { RESUME, resumeToPlainText } from "@/data/resume";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Resume() {
  const [copied, setCopied] = useState(false);
  const r = RESUME;

  const copyATS = async () => {
    try {
      await navigator.clipboard.writeText(resumeToPlainText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <section id="resume" className="border-t border-white/5 bg-[#07070b] px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="07" eyebrow="RESUME" title="READ ME. HIRE ME." />

        <div className="mt-6 flex flex-wrap gap-3 print:hidden">
          <a
            href="/resume/Satyam-Kumar-Resume.pdf"
            download
            className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-mono text-xs font-bold text-black transition hover:bg-[#6e7cff] hover:text-white"
          >
            <Download size={14} /> DOWNLOAD PDF
          </a>
          <button
            onClick={() => window.print()}
            className="glass-chip flex items-center gap-2 rounded-full px-5 py-2.5 font-mono text-xs transition hover:border-[#6e7cff]/60"
          >
            <Printer size={14} /> PRINT / SAVE AS PDF
          </button>
          <button
            onClick={copyATS}
            className="glass-chip flex items-center gap-2 rounded-full px-5 py-2.5 font-mono text-xs transition hover:border-[#6e7cff]/60"
          >
            {copied ? <Check size={14} className="text-emerald-400" /> : <ClipboardCopy size={14} />}
            {copied ? "COPIED — ATS TEXT" : "COPY ATS TEXT"}
          </button>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
          {/* Holographic document — lifts toward you */}
          <div className="group relative" style={{ perspective: 1400 }}>
            <div className="absolute -inset-3 rounded-[1.4rem] bg-[radial-gradient(ellipse_at_center,#6e7cff26,transparent_70%)] blur-2xl transition duration-500 group-hover:bg-[#6e7cff40]" />
            <div
              id="resume-paper"
              className="relative rounded-2xl bg-white p-6 text-black shadow-[0_24px_80px_rgba(0,0,0,0.5)] ring-1 ring-white/20 transition duration-500 group-hover:-translate-y-2 group-hover:[transform:rotateX(1.5deg)] md:p-10"
            >
            <h3 className="text-3xl font-bold tracking-tight">{r.name}</h3>
            <div className="mt-1 font-mono text-xs tracking-widest text-zinc-600">
              {r.role.toUpperCase()}
            </div>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] text-zinc-600">
              <span className="flex items-center gap-1"><MapPin size={11} /> {r.location}</span>
              <span className="flex items-center gap-1"><Phone size={11} /> {r.phone}</span>
              <span className="flex items-center gap-1"><Mail size={11} /> {r.email}</span>
              <span className="flex items-center gap-1"><Link size={11} /> {r.linkedin}</span>
              <span className="flex items-center gap-1"><Globe size={11} /> {r.github}</span>
            </div>

            <div className="mt-6">
              <div className="border-b-2 border-black pb-1 font-mono text-[11px] font-bold tracking-[0.25em]">SUMMARY</div>
              <p className="mt-2 text-[13px] leading-relaxed text-zinc-700">{r.summary}</p>
            </div>

            <div className="mt-5">
              <div className="border-b-2 border-black pb-1 font-mono text-[11px] font-bold tracking-[0.25em]">TECHNICAL SKILLS</div>
              <dl className="mt-2 space-y-1.5 text-[13px] leading-relaxed text-zinc-700">
                {r.skills.map((s) => (
                  <div key={s.group} className="grid gap-1 sm:grid-cols-[170px_1fr]">
                    <dt className="font-bold">{s.group}</dt>
                    <dd>{s.items}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-5">
              <div className="border-b-2 border-black pb-1 font-mono text-[11px] font-bold tracking-[0.25em]">PROJECTS</div>
              <div className="mt-3 space-y-4">
                {r.projects.map((p) => (
                  <div key={p.title}>
                    <div className="text-sm font-bold">
                      {p.title} <span className="font-normal text-zinc-600">— {p.subtitle} | {p.stack}</span>
                    </div>
                    <ul className="mt-1 list-disc space-y-1 pl-5 text-[13px] leading-relaxed text-zinc-700">
                      {p.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <div className="border-b-2 border-black pb-1 font-mono text-[11px] font-bold tracking-[0.25em]">EDUCATION</div>
              <ul className="mt-2 space-y-1.5 text-[13px] leading-relaxed text-zinc-700">
                {r.education.map((e) => (
                  <li key={e.degree}>
                    <strong>{e.degree}</strong> | {e.school}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5">
              <div className="border-b-2 border-black pb-1 font-mono text-[11px] font-bold tracking-[0.25em]">CERTIFICATIONS</div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-[13px] leading-relaxed text-zinc-700">
                {r.certifications.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>

            <div className="mt-5">
              <div className="border-b-2 border-black pb-1 font-mono text-[11px] font-bold tracking-[0.25em]">ADDITIONAL</div>
              <p className="mt-2 text-[13px] leading-relaxed text-zinc-700">
                <strong>Languages:</strong> {r.additional.languages} | <strong>Strengths:</strong> {r.additional.strengths}
              </p>
            </div>
            </div>
          </div>

          {/* Side rail */}
          <div className="flex flex-col gap-4 print:hidden">
            <div className="glass rounded-2xl p-6">
              <div className="font-mono text-[11px] tracking-widest text-zinc-400">ATS CHECK // LIVE</div>
              <div className="mt-3 space-y-2 font-mono text-xs">
                {[
                  ["Keywords", "Next.js · RAG · Prisma", "92%"],
                  ["Quantified impact", "18+ fields · 7 factors", "88%"],
                  ["Contact block", "email · phone · links", "100%"],
                ].map(([k, v, s]) => (
                  <div key={k} className="flex items-center justify-between gap-2 rounded-lg bg-white/[0.03] px-3 py-2">
                    <div>
                      <div className="text-white">{k}</div>
                      <div className="text-[10px] text-zinc-500">{v}</div>
                    </div>
                    <div className="text-emerald-300">{s}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass rounded-2xl p-6 font-mono text-xs leading-loose text-zinc-300">
              $ resume --export pdf
              <br />✓ summary ✓ skills ✓ projects ✓ education
              <br />✓ certifications ✓ languages
              <br /><span className="text-zinc-500">→ print saves this exact paper as PDF.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
