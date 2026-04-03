"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const links = [
  { href: "/summarizer", label: "Summarizer", emoji: "📝" },
  { href: "/quiz", label: "Quiz", emoji: "🧠" },
  { href: "/flashcards", label: "Flashcards", emoji: "🃏" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-white/5 backdrop-blur-xl bg-ink/80">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-flame to-[#ff9f1c] flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-flame/30 group-hover:shadow-flame/50 transition-shadow">
              S
            </div>
            <span
              className="text-lg font-semibold tracking-tight"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              Study<em className="text-flame not-italic italic">Mind</em>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    active
                      ? "bg-white/10 text-cream"
                      : "text-cream-muted hover:text-cream hover:bg-white/5"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
            <Link
              href="/quiz"
              className="ml-3 px-4 py-1.5 rounded-full text-sm font-semibold bg-gradient-to-r from-flame to-[#ff9f1c] text-white hover:shadow-lg hover:shadow-flame/30 transition-all duration-200 hover:-translate-y-px"
            >
              Try Free →
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col justify-center gap-1.5 w-8 h-8"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span className={`block h-0.5 bg-cream rounded-full transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block h-0.5 bg-cream rounded-full transition-all duration-200 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
            <span className={`block h-0.5 bg-cream rounded-full transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        style={{ background: "rgba(9,9,15,0.97)", backdropFilter: "blur(20px)" }}
      >
        <div className="flex flex-col justify-center h-full px-8">
          <div className="space-y-2 mb-10">
            {links.map((l, i) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`flex items-center gap-4 px-5 py-4 rounded-2xl text-xl font-semibold transition-all duration-300 ${
                    active ? "bg-white/10 text-cream" : "text-cream-muted hover:text-cream hover:bg-white/5"
                  }`}
                  style={{
                    fontFamily: "var(--font-fraunces)",
                    transitionDelay: `${i * 50}ms`,
                    transform: menuOpen ? "translateX(0)" : "translateX(-20px)",
                    opacity: menuOpen ? 1 : 0,
                  }}
                >
                  <span className="text-2xl">{l.emoji}</span>
                  {l.label}
                </Link>
              );
            })}
          </div>
          <Link
            href="/quiz"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold text-white"
            style={{ background: "linear-gradient(135deg, #ff6b35 0%, #ff9f1c 100%)", boxShadow: "0 8px 32px rgba(255,107,53,0.35)" }}
          >
            Try Free →
          </Link>
          <p className="mt-8 text-cream-muted text-sm">Powered by Claude AI · Built by Yeasin Santo</p>
        </div>
      </div>
    </>
  );
}
