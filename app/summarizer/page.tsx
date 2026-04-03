"use client";
import { useState } from "react";

interface SummaryResult {
  summary: string;
  points: string[];
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="text-xs text-cream-muted hover:text-cream transition-colors flex items-center gap-1.5 px-3 py-1 rounded-lg hover:bg-white/5"
    >
      {copied ? (
        <>
          <span className="text-green-400">✓</span>
          <span className="text-green-400">Copied!</span>
        </>
      ) : (
        <>
          <span>⎘</span>
          Copy
        </>
      )}
    </button>
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-white/8 bg-surface overflow-hidden">
      <div className="px-6 py-4 border-b border-white/5">
        <div className="h-3 w-20 bg-white/8 rounded-full animate-pulse" />
      </div>
      <div className="px-6 py-5 space-y-3">
        <div className="h-3 bg-white/6 rounded-full animate-pulse" />
        <div className="h-3 bg-white/6 rounded-full animate-pulse w-5/6" />
        <div className="h-3 bg-white/6 rounded-full animate-pulse w-4/6" />
      </div>
    </div>
  );
}

export default function SummarizerPage() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SummaryResult | null>(null);
  const [error, setError] = useState("");

  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const charCount = text.length;

  async function handleSubmit() {
    if (!text.trim()) return;
    setLoading(true);
    setResult(null);
    setError("");

    try {
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setResult(data);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") handleSubmit();
  }

  return (
    <div className="relative max-w-3xl mx-auto px-6 py-16">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full blur-[100px] opacity-15"
        style={{ background: "radial-gradient(circle, #ff6b35 0%, transparent 70%)" }}
      />

      {/* Header */}
      <div className="mb-10 animate-fade-up">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-flame/25 bg-flame/10 text-flame text-xs font-semibold tracking-widest uppercase mb-5">
          📝 Note Summarizer
        </div>
        <h1
          className="text-4xl md:text-5xl font-semibold text-cream leading-tight mb-3"
          style={{ fontFamily: "var(--font-fraunces)" }}
        >
          Turn notes into{" "}
          <em className="italic text-flame">clarity.</em>
        </h1>
        <p className="text-cream-muted text-base">
          Paste any text — get a crisp summary and 5 key takeaways instantly.
          <span className="ml-2 text-cream-muted/60 text-sm">Press ⌘↩ to run</span>
        </p>
      </div>

      {/* Input */}
      <div className="animate-fade-up stagger-1">
        <div className="relative rounded-2xl border border-white/8 bg-surface overflow-hidden focus-within:border-white/20 transition-colors duration-200">
          <div className="px-5 pt-4 pb-2 border-b border-white/5 flex items-center justify-between">
            <span className="text-cream-muted text-xs font-medium uppercase tracking-widest">
              Your Notes
            </span>
            <span className="text-cream-muted/60 text-xs tabular-nums">
              {charCount > 0 ? `${wordCount.toLocaleString()} words · ${charCount.toLocaleString()} chars` : ""}
            </span>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Paste your notes, article, lecture material, or any long text here..."
            className="w-full bg-transparent text-cream placeholder-white/20 text-sm leading-relaxed p-5 outline-none resize-none min-h-[220px]"
            disabled={loading}
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading || !text.trim()}
          className="btn-glow mt-4 w-full py-4 rounded-xl font-semibold text-sm transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            background:
              loading || !text.trim()
                ? "rgba(255,107,53,0.15)"
                : "linear-gradient(135deg, #ff6b35 0%, #ff9f1c 100%)",
            color: "#fff",
          }}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-3">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              AI is reading your notes…
            </span>
          ) : (
            "✦ Summarize Now"
          )}
        </button>

        {error && (
          <div className="mt-4 px-4 py-3 rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 text-sm">
            {error}
          </div>
        )}
      </div>

      {/* Skeleton loaders */}
      {loading && (
        <div className="mt-10 space-y-5">
          <SkeletonCard />
          <SkeletonCard />
        </div>
      )}

      {/* Results */}
      {result && !loading && (
        <div className="mt-10 space-y-5 animate-fade-up">
          {/* Summary card */}
          <div className="rounded-2xl border border-white/8 bg-surface overflow-hidden">
            <div className="px-6 py-3 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-flame animate-pulse" />
                <span className="text-flame text-xs font-bold uppercase tracking-widest">Summary</span>
              </div>
              <CopyButton text={result.summary} />
            </div>
            <p className="px-6 py-5 text-cream leading-relaxed text-[0.95rem]">
              {result.summary}
            </p>
          </div>

          {/* Key points card */}
          <div className="rounded-2xl border border-white/8 bg-surface overflow-hidden">
            <div className="px-6 py-3 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
                <span className="text-cyan text-xs font-bold uppercase tracking-widest">Key Takeaways</span>
              </div>
              <CopyButton text={result.points.map((p, i) => `${i + 1}. ${p}`).join("\n")} />
            </div>
            <ul className="divide-y divide-white/5">
              {result.points.map((p, i) => (
                <li key={i} className="flex items-start gap-4 px-6 py-4">
                  <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-cyan/10 border border-cyan/20 text-cyan text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <span className="text-cream text-sm leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Retry */}
          <button
            onClick={() => { setResult(null); setText(""); }}
            className="text-cream-muted text-sm hover:text-cream transition-colors flex items-center gap-1.5"
          >
            ← Summarize something else
          </button>
        </div>
      )}
    </div>
  );
}
