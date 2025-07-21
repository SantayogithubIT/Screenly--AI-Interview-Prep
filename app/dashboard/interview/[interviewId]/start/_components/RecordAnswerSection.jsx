"use client"
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic } from 'lucide-react';
import toast from 'react-hot-toast';
import { chatSession } from '@/utils/GeminiAiModel';
import { useUser } from '@clerk/nextjs';
function RecordAnswerSection({ mockInterviewQues, activeQuestionIndex, setActiveQuestionIndex, mockId }) {
    const [userAns, setUserAns] = useState('');
    const { user } = useUser();
    const [loading, setLoading] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
    });

    useEffect(() => {
        results.map((result) => {
            setUserAns(prevAns => prevAns + result?.transcript)
        })
    }, [results])

    useEffect(() => {
        if (!isRecording && userAns.length > 10) {
            updateUserAnswer();
        }
    }, [userAns])

    const SaveUserAnswer = async () => {
        if (isRecording) {
            stopSpeechToText();
        } else {
            startSpeechToText();
        }
    };

   const updateUserAnswer = async () => {
  if (isProcessing) return;

  setIsProcessing(true);
  setLoading(true);

  const feedbackPrompt = `You are an interview coach. A user has answered a technical interview question. Please rate and give feedback.

Respond ONLY in the following JSON format:
{
  "rating": "number from 1 to 10",
  "feedback": "2 short lines of improvement or praise."
}

Question: ${mockInterviewQues[activeQuestionIndex]?.question}
Answer: ${userAns}
`;

  try {
    const result = await chatSession.sendMessage(feedbackPrompt);

    if (!result || !result.response) {
      toast.error("No response from AI. Please try again.");
      console.error("AI result or response is missing:", result);
      return;
    }

    const rawText = await result.response.text();
    console.log("Raw AI Response:", rawText);

    if (!rawText || typeof rawText !== 'string' || rawText.trim().length < 5) {
      toast.error("Empty AI response. Please try again.");
      console.error("AI response was too short or invalid:", rawText);
      return;
    }

    const cleanedText = rawText.replace(/```json|```/g, '').trim();
    const match = cleanedText.match(/{[\s\S]*}/);

    if (!match) {
      toast.error("AI response didn't include valid JSON. Refresh the page.");
      console.error("No valid JSON block found:", cleanedText);
      return;
    }

    let feedbackJsonString = match[0]; // move it outside catch
    let feedback;

    try {
      feedback = JSON.parse(feedbackJsonString);
    } catch (parseErr) {
      toast.error("Failed to parse AI JSON. Please try again & Refresh the page");
      console.error("JSON parsing error:", parseErr, feedbackJsonString); // use known variable
      return;
    }

    const userId = user?.id || "guest-user";
    const userEmail = user?.primaryEmailAddress?.emailAddress;

    const payload = {
      userId,
      userEmail,
      mockRefId: mockId,
      question: mockInterviewQues[activeQuestionIndex]?.question,
      correctAns: mockInterviewQues[activeQuestionIndex]?.answer,
      userAns,
      feedback: feedback.feedback,
      rating: feedback.rating
    };

    console.log("Payload to API:", payload);

    const res = await fetch('/api/user-answers', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (data.success) {
      toast.success("Answer saved successfully!");
      setUserAns('');
    } else {
      toast.error(data.message || "Failed to save.");
    }

  } catch (err) {
    toast.error("Unexpected error during save.");
    console.error("Error during feedback/upload:", err);
  } finally {
    setLoading(false);
    setIsProcessing(false);
  }
};


    return (
        <div className='flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100'>
            {/* WEB Cam Section */}
            <div className='relative group'>
                {/* Outer glow effect */}
                <div className='absolute -inset-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-tilt'></div>

                {/* Main webcam container */}
                <div className='relative flex flex-col justify-center items-center mt-20 rounded-3xl p-2 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 shadow-2xl'>
                    {/* Inner container with modern glass effect */}
                    <div className='relative w-full rounded-2xl overflow-hidden backdrop-blur-sm bg-black/50 border border-white/10'>
                        {/* Webcam */}
                        <Webcam
                            mirrored={true}
                            style={
                                {
                                    height: 300,
                                    width: '100%',
                                    zIndex: 10,
                                    objectFit: 'cover'
                                }
                            }
                        />

                        {/* Modern overlay elements */}
                        <div className='absolute inset-0 pointer-events-none'>
                            {/* Corner indicators */}
                            <div className='absolute top-3 left-3 w-4 h-4 border-l-2 border-t-2 border-cyan-400 opacity-60'></div>
                            <div className='absolute top-3 right-3 w-4 h-4 border-r-2 border-t-2 border-cyan-400 opacity-60'></div>
                            <div className='absolute bottom-3 left-3 w-4 h-4 border-l-2 border-b-2 border-cyan-400 opacity-60'></div>
                            <div className='absolute bottom-3 right-3 w-4 h-4 border-r-2 border-b-2 border-cyan-400 opacity-60'></div>

                            {/* Recording indicator */}
                            {isRecording && (
                                <div className='absolute top-4 right-4 flex items-center space-x-2 z-20'>
                                    <div className='w-3 h-3 bg-red-500 rounded-full animate-pulse'></div>
                                    <span className='text-red-400 text-xs font-medium bg-black/50 px-2 py-1 rounded'>REC</span>
                                </div>
                            )}

                            {/* Status indicator */}
                            <div className='absolute top-4 left-4 flex items-center space-x-2 z-20'>
                                <div className='w-2 h-2 bg-green-400 rounded-full'></div>
                                <span className='text-green-400 text-xs font-medium bg-black/50 px-2 py-1 rounded'>LIVE</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mic */}
            <Button
                disabled={loading}
                className={`my-10 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg ${isRecording
                    ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 animate-pulse'
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
                    } text-white border-0 hover:shadow-xl`}
                onClick={SaveUserAnswer}
            >
                {isRecording ?
                    <div className='flex items-center space-x-3'>
                        <Mic className='w-5 h-5 animate-bounce' />
                        <span className='text-white font-medium'>Recording...</span>
                    </div>
                    :
                    <div className='flex items-center space-x-3'>
                        <Mic className='w-5 h-5' />
                        <span>Record Answer</span>
                    </div>
                }
            </Button>

            {/* Loading indicator */}
            {loading && (
                <div className='flex items-center space-x-2 text-gray-600'>
                    <div className='w-2 h-2 bg-blue-500 rounded-full animate-bounce'></div>
                    <div className='w-2 h-2 bg-blue-500 rounded-full animate-bounce' style={{ animationDelay: '0.1s' }}></div>
                    <div className='w-2 h-2 bg-blue-500 rounded-full animate-bounce' style={{ animationDelay: '0.2s' }}></div>
                </div>
            )}
        </div>
    )
}
export default RecordAnswerSection