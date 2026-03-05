import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { title, year, imdbRating, plot, genre } = await req.json();

    if (!title) {
      return NextResponse.json(
        { error: "Movie title is required" },
        { status: 400 }
      );
    }

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "Groq API key not configured" },
        { status: 500 }
      );
    }

    const prompt = `You are a movie critic and audience sentiment analyst. Analyze the following movie and provide insights based on your knowledge of audience reception and critical reviews.

Movie: "${title}" (${year})
Genre: ${genre}
IMDb Rating: ${imdbRating}/10
Plot: ${plot}

Provide your response in the following JSON format only, with no other text:
{
  "sentimentSummary": "A 2-3 sentence summary of overall audience sentiment and reception",
  "classification": "positive" | "mixed" | "negative",
  "keyThemes": ["theme1", "theme2", "theme3"],
  "audienceHighlights": "What audiences loved or criticized most (2-3 sentences)",
  "recommendedFor": "Brief description of who would enjoy this movie"
}`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 500,
      response_format: { type: "json_object" },
    });

    const content = chatCompletion.choices[0]?.message?.content;
    if (!content) {
      return NextResponse.json(
        { error: "No response from AI" },
        { status: 500 }
      );
    }

    const sentiment = JSON.parse(content);
    return NextResponse.json(sentiment);
  } catch {
    return NextResponse.json(
      { error: "Failed to analyze sentiment" },
      { status: 500 }
    );
  }
}
