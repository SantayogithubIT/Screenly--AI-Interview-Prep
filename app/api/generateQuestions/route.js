import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request) {
  const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  if (!API_KEY) {
    return NextResponse.json(
      { success: false, message: 'API key is not configured.' },
      { status: 500 }
    );
  }

  try {
    const { jobPosition, jobDes, jobExperience } = await request.json();

    if (!jobPosition || !jobDes || !jobExperience) {
      return NextResponse.json(
        { success: false, message: 'Missing required job details.' },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const prompt = `
Act as a technical interviewer.
Generate 5 interview questions for a ${jobPosition} role with ${jobExperience} years of experience.
Tech stack: ${jobDes}

Return ONLY valid JSON:
{
  "interviewQuestions": [
    {
      "question": "",
      "answer": ""
    }
  ]
}
`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    const parsedJson = JSON.parse(responseText);

    return NextResponse.json({
      success: true,
      questions: parsedJson,
    });

  } catch (error) {
    console.error("Error generating questions:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to generate questions from AI.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
