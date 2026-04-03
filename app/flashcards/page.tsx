"use client";
import { useState } from "react";

interface Flashcard {
  front: string;
  back: string;
}

export default function FlashcardsPage() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<Set<number>>(new Set());
  const [error, setError] = useState("");

  async function handleGenerate() {
    if (!text.trim()) return;
    setLoading(true);
    setCards([]);
    setCurrentIdx(0);
    setFlipped(false);
    setKnown(new Set());
    setError("");

    try {
      const res = await fetch("/api/flashcards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setCards(data.flashcards);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function handleNext() {
    setFlipped(false);
    setTimeout(() => setCurrentIdx((i) => Math.min(i + 1, cards.length - 1)), 150);
  }

  function handlePrev() {
    setFlipped(false);
    setTimeout(() => setCurrentIdx((i) => Math.max(i - 1, 0)), 150);
  }

  function toggleKnown(i: number) {
    setKnown((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  }

  const card = cards[currentIdx];
  const progress = cards.length ? ((currentIdx + 1) / cards.length) * 100 : 0;
  const knownCount = known.size;

  return (
    <div className="relative max-w-3xl mx-auto px-6 py-16">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full blur-[100px] opacity-15"
        style={{ background: "radial-gradient(circle, #7b5ea7 0%, transparent 70%)" }}
      />

      {/* Header */}
      <div className="mb-10 animate-fade-up">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet/25 bg-violet/10 text-violet text-xs font-semibold tracking-widest uppercase mb-5">
          🃏 Flashcard Generator
        </div>
        <h1
          className="text-4xl md:text-5xl font-semibold text-cream leading-tight mb-3"
          style={{ fontFamily: "var(--font-fraunces)" }}
        >
          Learn by{" "}
          <em className="italic" style={{ color: "#7b5ea7" }}>
            doing.
          </em>
        </h1>
        <p className="text-cream-muted text-base">
          Paste any text — get 8 interactive flashcards. Flip, navigate, and track what you know.
        </p>
      </div>

      {/* Input */}
      {cards.length === 0 && (
        <div className="animate-fade-up stagger-1">
          <div className="relative rounded-2xl border border-white/8 bg-surface overflow-hidden focus-within:border-white/20 transition-colors duration-200">
            <div className="px-5 pt-4 pb-1 border-b border-white/5 flex items-center justify-between">
              <span className="text-cream-muted text-xs font-medium uppercase tracking-widest">
                Study Material
              </span>
              <span className="text-cream-muted text-xs">
                {text.length > 0 ? `${text.split(/\s+/).filter(Boolean).length} words` : ""}
              </span>
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste lecture notes, a chapter, an article — anything you want to learn..."
              className="w-full bg-transparent text-cream placeholder-white/20 text-sm leading-relaxed p-5 outline-none resize-none min-h-[220px]"
              disabled={loading}
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading || !text.trim()}
            className="btn-glow mt-4 w-full py-4 rounded-xl font-semibold text-sm transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              background:
                loading || !text.trim()
                  ? "rgba(123,94,167,0.2)"
                  : "linear-gradient(135deg, #7b5ea7 0%, #4cc9f0 100%)",
              color: loading || !text.trim() ? "#6b7280" : "#fff",
            }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-3">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                AI is creating your flashcards…
              </span>
            ) : (
              "✦ Generate Flashcards"
            )}
          </button>

          {error && (
            <div className="mt-4 px-4 py-3 rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 text-sm">
              {error}
            </div>
          )}
        </div>
      )}

      {/* Flashcard viewer */}
      {cards.length > 0 && card && (
        <div className="animate-fade-up">
          {/* Progress bar */}
          <div className="mb-6 flex items-center gap-4">
            <div className="flex-1 h-1 rounded-full bg-white/8 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${progress}%`,
                  background: "linear-gradient(to right, #7b5ea7, #4cc9f0)",
                }}
              />
            </div>
            <span className="text-cream-muted text-xs font-medium tabular-nums whitespace-nowrap">
              {currentIdx + 1} / {cards.length}
            </span>
            {knownCount > 0 && (
              <span className="text-green-400 text-xs font-medium">
                ✓ {knownCount} known
              </span>
            )}
          </div>

          {/* Flip card */}
          <div
            className="relative cursor-pointer select-none mb-6"
            style={{ perspective: "1200px", height: "280px" }}
            onClick={() => setFlipped((f) => !f)}
          >
            <div
              className="relative w-full h-full transition-transform duration-500"
              style={{
                transformStyle: "preserve-3d",
                transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >
              {/* Front */}
              <div
                className="absolute inset-0 rounded-2xl border border-white/8 bg-surface flex flex-col items-center justify-center p-10 text-center"
                style={{ backfaceVisibility: "hidden" }}
              >
                <div className="absolute top-4 left-4 text-cream-muted text-xs font-medium uppercase tracking-widest">
                  Question
                </div>
                <div className="absolute top-4 right-4 flex items-center gap-1.5 text-cream-muted text-xs">
                  <span>Tap to flip</span>
                  <span className="text-base">↕</span>
                </div>
                <p
                  className="text-cream text-xl md:text-2xl font-semibold leading-snug"
                  style={{ fontFamily: "var(--font-fraunces)" }}
                >
                  {card.front}
                </p>
                {/* Accent line */}
                <div
                  className="absolute bottom-0 left-10 right-10 h-px rounded-full"
                  style={{ background: "linear-gradient(to right, transparent, rgba(123,94,167,0.5), transparent)" }}
                />
              </div>

              {/* Back */}
              <div
                className="absolute inset-0 rounded-2xl border border-violet/20 bg-surface-2 flex flex-col items-center justify-center p-10 text-center"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  background: "linear-gradient(135deg, rgba(123,94,167,0.08) 0%, rgba(76,201,240,0.05) 100%)",
                }}
              >
                <div className="absolute top-4 left-4 text-violet text-xs font-medium uppercase tracking-widest">
                  Answer
                </div>
                <p className="text-cream text-lg leading-relaxed">
                  {card.back}
                </p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <button
              onClick={handlePrev}
              disabled={currentIdx === 0}
              className="px-5 py-2.5 rounded-xl border border-white/8 text-cream-muted text-sm font-medium hover:bg-white/5 hover:text-cream disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              ← Prev
            </button>

            <button
              onClick={() => toggleKnown(currentIdx)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border ${
                known.has(currentIdx)
                  ? "border-green-500/40 bg-green-500/10 text-green-400 hover:bg-green-500/15"
                  : "border-white/8 text-cream-muted hover:bg-white/5 hover:text-cream"
              }`}
            >
              {known.has(currentIdx) ? "✓ Known" : "Mark as known"}
            </button>

            <button
              onClick={handleNext}
              disabled={currentIdx === cards.length - 1}
              className="px-5 py-2.5 rounded-xl border border-white/8 text-cream-muted text-sm font-medium hover:bg-white/5 hover:text-cream disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              Next →
            </button>
          </div>

          {/* All cards grid */}
          <div className="mt-8">
            <p className="text-cream-muted text-xs font-semibold uppercase tracking-widest mb-4">
              All cards
            </p>
            <div className="grid grid-cols-4 gap-2">
              {cards.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setCurrentIdx(i); setFlipped(false); }}
                  className={`py-2 rounded-lg text-xs font-semibold transition-all duration-150 border ${
                    i === currentIdx
                      ? "border-violet/50 bg-violet/15 text-violet"
                      : known.has(i)
                      ? "border-green-500/30 bg-green-500/8 text-green-400"
                      : "border-white/8 text-cream-muted hover:border-white/15 hover:text-cream"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Start over */}
          <button
            onClick={() => { setCards([]); setText(""); setKnown(new Set()); }}
            className="mt-8 text-cream-muted text-sm hover:text-cream transition-colors flex items-center gap-1.5"
          >
            ← Generate new flashcards
          </button>
        </div>
      )}
    </div>
  );
}
