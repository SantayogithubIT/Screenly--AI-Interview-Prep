'use client'
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import QuestionSection from './_components/QuestionSection';
import Link from 'next/link';
//import RecordAnswerSection from './_components/RecordAnswerSection';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
const RecordAnswerSection = dynamic(
    () => import('./_components/RecordAnswerSection'), // Adjust path if needed
    { ssr: false }
);

function startInterview() {
    const { interviewId } = useParams();
    const [interview, setInterview] = useState(null);
    const [interviewData, setInterviewData] = useState();
    const [mockInterviewQues, setMockinterviewQues] = useState();
    const [activeQuestionIndex, setActivequestionIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchInterview = async () => {
            try {
                const res = await fetch(`/api/interviews/${interviewId}`);
                const data = await res.json();
                const mockRes = JSON.parse(data.interview.mockRes);
                console.log(mockRes);

                if (Array.isArray(mockRes.interviewQuestions)) {
                    setInterviewData(mockRes.interviewQuestions);
                    setMockinterviewQues(mockRes.interviewQuestions)
                } else {
                    console.error("interviewQuestions is not an array");
                }
                setLoading(false);
            } catch (error) {
                console.log("Error fetching interview:", error.message);
            } finally {
                setLoading(false);
            }
        };

        if (interviewId) {
            fetchInterview();
        }
    }, [interviewId]);

    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2'>
                {/*questions*/}
                <QuestionSection
                    mockInterviewQues={mockInterviewQues}
                    activeQuestionIndex={activeQuestionIndex}
                    setActiveQuestionIndex={setActivequestionIndex}
                />
                {/*Video & Audio */}
                <RecordAnswerSection
                    mockInterviewQues={mockInterviewQues}
                    activeQuestionIndex={activeQuestionIndex}
                    setActiveQuestionIndex={setActivequestionIndex}
                    mockId={interviewId}
                />
            </div>
            <div className='flex justify-end gap-4 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl shadow-lg border border-gray-200'>
                {activeQuestionIndex > 0 && (
                    <Button
                        className='group relative px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg border-0 cursor-pointer'
                        onClick={() => setActivequestionIndex(activeQuestionIndex - 1)}
                    >
                        <div className='flex items-center space-x-2'>
                            <svg className='w-4 h-4 transition-transform group-hover:-translate-x-1' fill='currentColor' viewBox='0 0 20 20'>
                                <path fillRule='evenodd' d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z' clipRule='evenodd' />
                            </svg>
                            <span>Previous Question</span>
                        </div>
                        <div className='absolute inset-0 rounded-lg bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                    </Button>
                )}

                {activeQuestionIndex != mockInterviewQues?.length - 1 && (
                    <Button
                        className='group relative px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg border-0 cursor-pointer'
                        onClick={() => setActivequestionIndex(activeQuestionIndex + 1)}
                    >
                        <div className='flex items-center space-x-2'>
                            <span>Next Question</span>
                            <svg className='w-4 h-4 transition-transform group-hover:translate-x-1' fill='currentColor' viewBox='0 0 20 20'>
                                <path fillRule='evenodd' d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z' clipRule='evenodd' />
                            </svg>
                        </div>
                        <div className='absolute inset-0 rounded-lg bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                    </Button>
                )}

                <Link href={'/dashboard/interview/' + interviewId + '/feedback'}>
                    {activeQuestionIndex == mockInterviewQues?.length - 1 && (
                        <Button className='group relative px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl border-0 cursor-pointer'>
                            <div className='flex items-center space-x-2'>
                                <span>End Interview</span>
                                <svg className='w-5 h-5 transition-transform group-hover:rotate-12' fill='currentColor' viewBox='0 0 20 20'>
                                    <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
                                </svg>
                            </div>
                            <div className='absolute inset-0 rounded-lg bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>

                            {/* Success glow effect */}
                            <div className='absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg blur opacity-0 group-hover:opacity-30 transition-opacity duration-300'></div>
                        </Button>
                    )}
                </Link>
            </div>
        </div>
    )
}

export default startInterview
