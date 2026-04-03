import { NextRequest, NextResponse } from "next/server";

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
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
            content: `Generate exactly 5 multiple choice questions from the text below.
Return ONLY a valid JSON array. No explanation, no markdown, no backticks. Just raw JSON.

Format:
[
  {
    "question": "Question text here?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "answer": "Option A"
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

    // Strip any accidental markdown fences
    raw = raw.replace(/```json|```/g, "").trim();

    const questions: QuizQuestion[] = JSON.parse(raw);

    return NextResponse.json({ questions });
  } catch (err) {
    console.error("[/api/quiz]", err);
    return NextResponse.json({ error: "Failed to generate quiz. Please try again." }, { status: 500 });
  }
}
