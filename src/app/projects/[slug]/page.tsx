import { projects } from "@/data/projects";
import { SITE } from "@/lib/constants";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return { title: "Project not found" };
  return {
    title: `${p.title} — Case Study`,
    description: p.description,
    openGraph: { title: `${p.title} | Satyam Kumar`, description: p.description, type: "article" },
  };
}

function Block({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section aria-label={title} className="border-t border-white/10 py-8">
      <div className="font-mono text-[11px] tracking-[0.3em] text-zinc-500">
        {n} — {title}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) notFound();

  return (
    <article className="mx-auto max-w-3xl px-5 pb-24 pt-28">
      <a href="/#projects" className="font-mono text-xs tracking-widest text-zinc-500 hover:text-white">
        ← PROJECT ARCHIVE
      </a>
      <div className="mt-4 font-mono text-xs tracking-widest" style={{ color: p.color }}>
        {p.subtitle.toUpperCase()} · {p.category}
      </div>
      <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-6xl">{p.title}</h1>
      <p className="mt-4 text-lg leading-relaxed text-zinc-300">{p.description}</p>

      <Block n="01" title="OVERVIEW">
        <p className="leading-relaxed text-zinc-300">{p.description}</p>
      </Block>
      {p.problem && (
        <Block n="02" title="PROBLEM">
          <p className="leading-relaxed text-zinc-300">{p.problem}</p>
        </Block>
      )}
      {p.solution && (
        <Block n="03" title="SOLUTION">
          <p className="leading-relaxed text-zinc-300">{p.solution}</p>
        </Block>
      )}
      {p.architecture && (
        <Block n="04" title="ARCHITECTURE">
          <ol className="space-y-2">
            {p.architecture.map((a, i) => (
              <li key={a} className="rounded-lg border border-white/5 bg-white/[0.02] px-4 py-3 font-mono text-xs leading-relaxed text-zinc-300">
                <span className="text-zinc-500">{String(i + 1).padStart(2, "0")} → </span>{a}
              </li>
            ))}
          </ol>
        </Block>
      )}
      <Block n="05" title="TECHNOLOGY">
        <div className="flex flex-wrap gap-2">
          {p.stack.map((s) => (
            <span key={s} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-zinc-200">{s}</span>
          ))}
        </div>
      </Block>
      {p.pipeline && (
        <Block n="06" title="AI / SYSTEM DESIGN">
          <div className="flex flex-col items-start gap-2 font-mono text-xs">
            {p.pipeline.map((s, i) => (
              <span key={s} className="flex items-center gap-3">
                <span className="rounded border border-white/10 px-3 py-1.5 tracking-widest text-zinc-200">{s}</span>
                {i < p.pipeline!.length - 1 && <span className="text-zinc-600">↓</span>}
              </span>
            ))}
          </div>
        </Block>
      )}
      <Block n="07" title="INTERFACE">
        <p className="text-sm leading-relaxed text-zinc-400">
          Full interface walkthrough lives in the repository README and live demo (where available).
          Screenshots are intentionally omitted here until production captures are finalized — no mockups, no filler.
        </p>
      </Block>
      <Block n="08" title="CHALLENGES">
        <p className="text-sm leading-relaxed text-zinc-400">
          {p.slug === "ai-career-copilot"
            ? "Grounding Gemini output in parsed resume context without hallucinated skills; deterministic ATS weights that stay explainable; Zod-validated schemas for unreliable model JSON; keeping scoring fast enough for interactive use."
            : "Scoping a genuinely useful MVP; keeping AI explanations grounded in authentic source structure; auth + data modeling without over-engineering."}
        </p>
      </Block>
      <Block n="09" title="LEARNINGS">
        <p className="text-sm leading-relaxed text-zinc-400">
          Deterministic engines beat pure-LLM magic for trust. RAG grounding, validated schemas, and explicit
          factor breakdowns turn “AI feature” into “engineering system.”
        </p>
      </Block>
      <Block n="10" title="LIVE PROJECT">
        {p.demo ? (
          <a href={p.demo} target="_blank" rel="noreferrer" className="inline-block rounded-full bg-white px-6 py-3 font-mono text-xs font-bold text-black transition hover:bg-[#6e7cff] hover:text-white">
            OPEN LIVE DEMO ↗
          </a>
        ) : (
          <p className="text-sm text-zinc-400">Live demo link ships when the production deployment is stable. Source code is the current artifact.</p>
        )}
      </Block>
      <Block n="11" title="SOURCE CODE">
        <div className="flex flex-wrap gap-3">
          {p.github && (
            <a href={p.github} target="_blank" rel="noreferrer" className="rounded-full bg-white px-5 py-2.5 font-mono text-xs font-bold text-black transition hover:bg-[#6e7cff] hover:text-white">
              GitHub ↗
            </a>
          )}
          <a href={`mailto:${SITE.email}?subject=${encodeURIComponent(`About ${p.title}`)}`} className="rounded-full border border-white/15 px-5 py-2.5 font-mono text-xs hover:bg-white/5">
            DISCUSS THIS BUILD →
          </a>
        </div>
      </Block>
    </article>
  );
}
