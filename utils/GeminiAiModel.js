import {GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({model: "gemini-2.5-pro" });

 export const chatSession = model.startChat({
  generationConfig:{
    maxOutputTokens: 1000,
  },
});
 




