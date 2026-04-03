import { NextRequest, NextResponse } from "next/server";

export interface Flashcard {
  front: string;
  back: string;
}

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    if (!text || typeof text !== "string" || text.trim().length === 0) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured. Add ANTHROPIC_API_KEY to .env.local" },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1200,
        messages: [
          {
            role: "user",
            content: `Create exactly 8 flashcards from the text below. Each flashcard should have a concise question or term on the front, and a clear, memorable answer on the back.

Return ONLY a valid JSON array. No explanation, no markdown, no backticks. Just raw JSON.

Format:
[
  {
    "front": "What is [concept]?",
    "back": "Clear, concise answer in 1-2 sentences."
  }
]

Text:
${text}`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      return NextResponse.json({ error: err.error?.message ?? "API error" }, { status: 502 });
    }

    const data = await response.json();
    let raw = data.content[0].text as string;
    raw = raw.replace(/```json|```/g, "").trim();

    const flashcards: Flashcard[] = JSON.parse(raw);
    return NextResponse.json({ flashcards });
  } catch (err) {
    console.error("[/api/flashcards]", err);
    return NextResponse.json({ error: "Failed to generate flashcards. Please try again." }, { status: 500 });
  }
}
