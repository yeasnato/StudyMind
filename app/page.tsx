import Link from "next/link";

const tools = [
  {
    href: "/summarizer",
    emoji: "📝",
    title: "Note Summarizer",
    desc: "Paste any text — get a crisp 3-4 sentence summary plus 5 key takeaways. No fluff, just signal.",
    accent: "#ff6b35",
    accentClass: "text-flame border-flame/20 bg-flame/8",
    barColor: "via-flame/60",
    arrowColor: "text-flame",
    stagger: "stagger-2",
  },
  {
    href: "/quiz",
    emoji: "🧠",
    title: "Quiz Generator",
    desc: "Turn any study material into 5 multiple-choice questions with instant right/wrong feedback.",
    accent: "#4cc9f0",
    accentClass: "text-cyan border-cyan/20 bg-cyan/8",
    barColor: "via-cyan/60",
    arrowColor: "text-cyan",
    stagger: "stagger-3",
  },
  {
    href: "/flashcards",
    emoji: "🃏",
    title: "Flashcard Generator",
    desc: "Get 8 interactive flip cards from your notes. Track what you know, skip what you don't.",
    accent: "#7b5ea7",
    accentClass: "text-violet border-violet/20 bg-violet/8",
    barColor: "via-violet/60",
    arrowColor: "text-violet",
    stagger: "stagger-4",
  },
];

export default function Home() {
  return (
    <div className="relative">
      {/* Ambient blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[-10%] left-[5%] w-[700px] h-[600px] rounded-full blur-[130px] opacity-15"
        style={{ background: "radial-gradient(circle, #ff6b35 0%, transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-[30%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[100px] opacity-10"
        style={{ background: "radial-gradient(circle, #4cc9f0 0%, transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[10%] left-[40%] w-[400px] h-[400px] rounded-full blur-[100px] opacity-8"
        style={{ background: "radial-gradient(circle, #7b5ea7 0%, transparent 70%)" }}
      />

      {/* Hero */}
      <section className="relative max-w-6xl mx-auto px-6 pt-24 pb-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-flame/30 bg-flame/10 text-flame text-xs font-semibold tracking-widest uppercase mb-8 animate-fade-up">
            <span className="w-1.5 h-1.5 rounded-full bg-flame animate-pulse" />
            Powered by Claude AI
          </div>

          <h1
            className="text-[clamp(2.8rem,7vw,5.5rem)] font-semibold leading-[1.08] tracking-tight text-cream mb-6 animate-fade-up stagger-1"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            Study{" "}
            <em className="italic text-flame">smarter,</em>
            <br />
            not harder.
          </h1>

          <p className="text-cream-muted text-xl leading-relaxed max-w-lg mb-12 animate-fade-up stagger-2">
            Three AI-powered study tools that turn your notes into summaries, quizzes,
            and flashcards — in seconds.
          </p>

          <div className="flex flex-wrap gap-4 animate-fade-up stagger-3">
            <Link
              href="/summarizer"
              className="btn-glow inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-cream text-ink font-semibold text-sm hover:bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-white/10"
            >
              📝 Start Summarizing
            </Link>
            <Link
              href="/flashcards"
              className="btn-glow inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/10 text-cream font-semibold text-sm hover:bg-white/5 transition-all duration-200 hover:-translate-y-0.5"
            >
              🃏 Make Flashcards
            </Link>
          </div>
        </div>

        <div className="hr-line mt-20 animate-fade-up stagger-4" />
      </section>

      {/* Tools */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <p className="text-cream-muted text-xs font-semibold tracking-widest uppercase mb-10 animate-fade-up">
          Three tools, zero fluff
        </p>

        <div className="grid md:grid-cols-3 gap-5">
          {tools.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className={`group relative p-7 rounded-2xl border border-white/8 bg-surface hover:bg-surface-2 transition-all duration-300 hover:-translate-y-1.5 hover:border-white/15 hover:shadow-2xl hover:shadow-black/50 animate-fade-up ${t.stagger}`}
            >
              {/* Top accent line */}
              <div
                className={`absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent ${t.barColor} to-transparent rounded-full`}
              />

              <div
                className={`w-11 h-11 rounded-xl border flex items-center justify-center text-xl mb-5 group-hover:scale-110 transition-transform duration-300 ${t.accentClass}`}
              >
                {t.emoji}
              </div>

              <h2
                className="text-xl font-semibold text-cream mb-2.5"
                style={{ fontFamily: "var(--font-fraunces)" }}
              >
                {t.title}
              </h2>
              <p className="text-cream-muted leading-relaxed text-sm mb-6">{t.desc}</p>

              <div
                className={`flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all duration-200 ${t.arrowColor}`}
              >
                Open tool <span className="text-base leading-none">→</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-14 grid grid-cols-3 gap-4 animate-fade-up stagger-4">
          {[
            { num: "< 5s", label: "Average response" },
            { num: "3", label: "Powerful tools" },
            { num: "Free", label: "No signup needed" },
          ].map((s) => (
            <div key={s.label} className="text-center py-6 px-4 rounded-xl border border-white/5">
              <div
                className="text-3xl font-semibold text-cream mb-1"
                style={{ fontFamily: "var(--font-fraunces)" }}
              >
                {s.num}
              </div>
              <div className="text-cream-muted text-xs">{s.label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
