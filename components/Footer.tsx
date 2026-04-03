import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 mt-16">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-cream-muted text-sm">
          Built by{" "}
          <span className="text-cream font-medium">Yeasin Santo</span>
          {" "}·{" "}
          <span className="text-flame italic" style={{ fontFamily: "var(--font-fraunces)" }}>
            StudyMind AI
          </span>
        </p>
        <div className="flex items-center gap-6 text-sm text-cream-muted">
          <Link href="/summarizer" className="hover:text-cream transition-colors">Summarizer</Link>
          <Link href="/quiz" className="hover:text-cream transition-colors">Quiz</Link>
          <Link href="/flashcards" className="hover:text-cream transition-colors">Flashcards</Link>
        </div>
      </div>
    </footer>
  );
}
