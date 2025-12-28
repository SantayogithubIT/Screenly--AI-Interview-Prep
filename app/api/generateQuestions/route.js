import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request) {
  // IMPORTANT: The API key is now only used on the server, keeping it secret.
  const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY; // Use a non-public environment variable

  if (!API_KEY) {
    return NextResponse.json(
      { success: false, message: 'API key is not configured.' },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const { jobPosition, jobDes, jobExperience } = body;

    if (!jobPosition || !jobDes || !jobExperience) {
      return NextResponse.json(
        { success: false, message: 'Missing required job details.' },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });
    const chat = model.startChat({ history: [] });

    const inputPrompt = `Act as a technical interviewer. Generate 5 interview questions for a ${jobPosition} role with ${jobExperience} years of experience, focusing on the following tech stack: ${jobDes}. Please provide the response as a single, raw JSON object without any markdown formatting. The JSON object must have a key named "interviewQuestions", which holds an array of objects. Each object in the array must have two keys: "question" and "answer".`;
    
    const result = await chat.sendMessage(inputPrompt);
    const responseText = await result.response.text();
    
    // Use a robust regex to extract the JSON object, ignoring other text
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No valid JSON object found in the AI's response.");
    }
    
    const jsonString = jsonMatch[0];
    const parsedJson = JSON.parse(jsonString);

    return NextResponse.json({ success: true, questions: parsedJson });

  } catch (error) {
    console.error("Error generating questions:", error);
    return NextResponse.json(
      { success: false, message: 'Failed to generate questions from AI.' },
      { status: 500 }
    );
  }
}