import { NextRequest, NextResponse } from "next/server";

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
        max_tokens: 1000,
        messages: [
          {
            role: "user",
            content: `Summarize the following text in 3-4 clear sentences. Then list exactly 5 key takeaways as short bullet points.

Return your response in this EXACT format (no extra text, no markdown):
SUMMARY: [your 3-4 sentence summary here]
POINTS:
- [point 1]
- [point 2]
- [point 3]
- [point 4]
- [point 5]

Text to summarize:
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
    const raw = data.content[0].text as string;

    const summaryMatch = raw.match(/SUMMARY:\s*([\s\S]*?)(?=POINTS:)/);
    const pointsMatch = raw.match(/POINTS:\s*([\s\S]*)/);

    const summary = summaryMatch?.[1]?.trim() ?? "Could not extract summary.";
    const pointsRaw = pointsMatch?.[1]?.trim() ?? "";
    const points = pointsRaw
      .split("\n")
      .filter((p) => p.trim().startsWith("-"))
      .map((p) => p.replace(/^-\s*/, "").trim())
      .filter(Boolean);

    return NextResponse.json({ summary, points });
  } catch (err) {
    console.error("[/api/summarize]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
