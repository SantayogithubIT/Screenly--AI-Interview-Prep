'use client'
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Webcam from 'react-webcam';
import { Lightbulb, WebcamIcon } from 'lucide-react';
import { Button } from '@/components/ui/button'; // Assuming you might use this
import RainbowButton from '@/components/RainbowButton';
import Link from 'next/link';
import FancyLoader from '@/components/Loader';

function Interview() {
    const { interviewId } = useParams();
    const [interview, setInterview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [webcamEnabled, setWebcamEnabled] = useState(false);

    useEffect(() => {
        const fetchInterview = async () => {
            try {
                const res = await fetch(`/api/interviews/${interviewId}`);
                const data = await res.json();

                if (data.success) {
                    setInterview(data.interview);
                } else {
                    console.log("Not Found!!", data.message);
                }
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

    if (loading) return <FancyLoader />;

    // This check prevents errors if the interview data fails to load
    if (!interview) {
        return (
            <div className='flex items-center justify-center h-screen text-xl text-gray-700'>
                Interview not found or failed to load.
            </div>
        );
    }
    
    return (
        <div className='flex flex-col max-w-7xl mx-auto px-4 py-8'>
            <div className='text-center mb-8'>
                <h2 className='font-bold text-3xl mb-2 text-gray-800'>Let's Start the Interview!</h2>
                <p className='text-gray-600 text-lg'>Prepare yourself for an AI-powered mock interview experience</p>
            </div>
            
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12'>
                {/* Left Column - Interview Details */}
                <div className='flex flex-col space-y-6'>
                    {/* Job Information Card */}
                    <div className='group relative'>
                        <div className='absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300'></div>
                        <div className='relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl'>
                            <div className='flex items-center gap-3 mb-6'>
                                <div className='w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full'></div>
                                <h3 className='text-2xl font-bold text-slate-800'>Interview Overview</h3>
                            </div>
                            
                            <div className='space-y-4'>
                                <div className='p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100/50'>
                                    <h4 className='font-semibold text-slate-700 mb-2 text-sm uppercase tracking-wide'>Position</h4>
                                    <p className='text-slate-800 font-medium text-lg'>{interview.jobPosition}</p>
                                </div>
                                <div className='p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100/50'>
                                    <h4 className='font-semibold text-slate-700 mb-2 text-sm uppercase tracking-wide'>Tech Stack</h4>
                                    <p className='text-slate-800 leading-relaxed'>{interview.jobDescription}</p>
                                </div>
                                <div className='p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-100/50'>
                                    <h4 className='font-semibold text-slate-700 mb-2 text-sm uppercase tracking-wide'>Experience Level</h4>
                                    <p className='text-slate-800 font-medium'>{interview.jobExperience}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                
                    {/* Important Information Card */}
                    <div className='bg-gradient-to-r from-yellow-200 to-yellow-300 rounded-xl p-6 border-2 border-yellow-400 shadow-lg'>
                        <div className='flex items-start gap-3 mb-4'>
                            <Lightbulb className='text-red-500 mt-0.5 flex-shrink-0' size={24} />
                            <h3 className='text-xl font-bold text-red-600'>Important Information</h3>
                        </div>
                        <div className='space-y-4 text-gray-800'>
                            <div className='bg-white/50 rounded-lg p-4 backdrop-blur-sm'>
                                <p className='leading-relaxed'>
                                    To begin your AI-generated mock interview, please enable your webcam and microphone immediately. 
                                    The interview includes <span className='font-semibold text-purple-700'>5 questions</span>, and at the end, 
                                    you'll receive a detailed report based on your responses.
                                </p>
                            </div>
                            <div className='bg-white/50 rounded-lg p-4 backdrop-blur-sm'>
                                <p className='font-semibold text-gray-700 mb-2'>Privacy Note:</p>
                                <p className='text-sm leading-relaxed'>
                                    We do not record your video. Webcam access is only used during the session and can be disabled anytime after the interview.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Right Column - Webcam Section */}
                <div className='flex flex-col items-center justify-start pt-8'>
                    <div className='w-full max-w-md'>
                        
                        {/* ✅ STEP 1: THIS BLOCK NOW ONLY CONTROLS THE WEBCAM/PLACEHOLDER VIEW */}
                        <div className='mb-8'>
                            {webcamEnabled ? (
                                <div className='relative'>
                                    <div className='absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur opacity-75'></div>
                                    <div className='relative bg-white p-2 rounded-2xl shadow-xl'>
                                        <Webcam
                                            onUserMedia={() => setWebcamEnabled(true)}
                                            onUserMediaError={() => setWebcamEnabled(false)}
                                            mirrored={true}
                                            className='rounded-xl'
                                            style={{
                                                height: 300,
                                                width: '100%',
                                                objectFit: 'cover'
                                            }}
                                        />
                                    </div>
                                    <div className='absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1'>
                                        <span className='w-2 h-2 bg-white rounded-full animate-pulse'></span>
                                        LIVE
                                    </div>
                                </div>
                            ) : (
                                <div className='relative'>
                                    <div className='absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl blur opacity-50'></div>
                                    <div className='relative bg-gray-100 rounded-2xl p-12 border-2 border-dashed border-gray-300'>
                                        <WebcamIcon className='h-24 w-24 mx-auto text-gray-400 mb-4' />
                                        <p className='text-gray-600 font-medium'>Camera Preview</p>
                                        <p className='text-sm text-gray-500 mt-2'>Enable your webcam to see preview</p>
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        {/* ✅ STEP 2: THIS BLOCK OF BUTTONS IS NOW OUTSIDE THE CONDITIONAL LOGIC */}
                        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                            {/* This button toggles the webcam view */}
                            <RainbowButton 
                                className='cursor-pointer px-6 py-3 font-semibold text-white bg-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg transform hover:scale-105' 
                                onClick={() => setWebcamEnabled(!webcamEnabled)}
                            >
                                <span className='flex items-center gap-2'>
                                    <WebcamIcon size={20} />
                                    {webcamEnabled ? 'Disable Camera' : 'Enable Camera'}
                                </span>
                            </RainbowButton>
                            
                            {/* This "Start Interview" button is now always visible */}
                            <Link href={`/dashboard/interview/${interviewId}/start`}>
                                <RainbowButton 
                                    className='cursor-pointer px-6 py-3 font-semibold text-white transition-all duration-200 shadow-lg transform hover:scale-105' 
                                >
                                    <span className='flex items-center gap-2'>
                                        <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                                            <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z' clipRule='evenodd' />
                                        </svg>
                                        Start Interview
                                    </span>
                                </RainbowButton>
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
            
            {/* Bottom Action Bar */}
            <div className='mt-12 p-6 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 shadow-sm'>
                <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
                    <div className='flex items-center gap-3'>
                        <div className='w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center'>
                            <span className='text-purple-600 font-bold text-lg'>?</span>
                        </div>
                        <div>
                            <h4 className='font-semibold text-gray-800'>Need Help?</h4>
                            <p className='text-sm text-gray-600'>Check our interview guide for tips</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-2 text-sm text-gray-600'>
                        <span className='w-2 h-2 bg-green-500 rounded-full'></span>
                        System Ready
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Interview