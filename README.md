# StudyMind AI — Next.js

A premium AI study toolkit with Note Summarizer and Quiz Generator, built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **Note Summarizer** — 3-4 sentence summary + 5 key takeaways
- **Quiz Generator** — 5 multiple choice questions with instant feedback
- **Dark academic design** — grain texture, ambient glow, smooth animations
- **Secure API** — Anthropic API key stays server-side (never exposed to browser)
- **TypeScript** throughout
- **App Router** architecture

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Add your API key

Copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

Then open `.env.local` and replace `your_api_key_here` with your key from [console.anthropic.com](https://console.anthropic.com).

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Build for production

```bash
npm run build
npm start
```

## Deploy to Vercel

1. Push to GitHub
2. Import repo at [vercel.com](https://vercel.com)
3. Add `ANTHROPIC_API_KEY` in Vercel → Project Settings → Environment Variables
4. Deploy 🚀

## Project Structure

```
studymind/
├── app/
│   ├── layout.tsx          # Root layout, fonts, grain overlay
│   ├── page.tsx            # Homepage
│   ├── globals.css         # Global styles
│   ├── summarizer/
│   │   └── page.tsx        # Summarizer UI
│   ├── quiz/
│   │   └── page.tsx        # Quiz UI
│   └── api/
│       ├── summarize/
│       │   └── route.ts    # Server-side summarize API
│       └── quiz/
│           └── route.ts    # Server-side quiz API
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── GrainSpotlight.tsx  # Grain texture + mouse spotlight
├── .env.local.example
└── README.md
```
