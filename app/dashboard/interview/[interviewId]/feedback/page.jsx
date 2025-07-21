'use client'
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation';
import FancyLoader from '@/components/Loader';


const FeedbackPage = () => {
  const { interviewId } = useParams();
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedItems, setExpandedItems] = useState(new Set());
  const [averageRating, setAverageRating] = useState(0);
  const router = useRouter();
  const [answers, setAnswers]= useState([]);


  const toggleExpand = (index) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  const getRatingColor = (rating) => {
    if (rating >= 8) return 'text-green-600 bg-green-100 border-green-200';
    if (rating >= 6) return 'text-yellow-600 bg-yellow-100 border-yellow-200';
    return 'text-red-600 bg-red-100 border-red-200';
  };

  const getCardBorderColor = (rating) => {
    if (rating >= 8) return 'border-l-green-500 hover:border-l-green-600';
    if (rating >= 6) return 'border-l-yellow-500 hover:border-l-yellow-600';
    return 'border-l-red-500 hover:border-l-red-600';
  };

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await fetch(`/api/user-answers/feedback?mockRefId=${interviewId}`);
        const data = await res.json();

        if (data.success) {
          setFeedbackList(data.data);

          const ratings = data.data.map(item => Number(item.rating) || 0); // force number
          const totalRating = ratings.reduce((sum, val) => sum + val, 0);
          const avg = ratings.length > 0 ? (totalRating / ratings.length) : 0;
          setAverageRating(avg);
        } else {
          toast.error("Error happened")
          console.error("Error:", data.error);
        }
      } catch (error) {
        console.log("fetch failed", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (interviewId) {
      fetchFeedback();
    }
  }, [interviewId])

  if (loading) return <FancyLoader />

  return (
    
    
    <div className='min-h-screen bg-gray-50 p-6 md:p-10'>
      <div className='max-w-4xl mx-auto'>
        
        {/* Header Section */}
        <div className='mb-10'>
          <h1 className='text-3xl font-bold text-green-600 mb-2'>
            Congratulations!
          </h1>

          <h2 className='text-2xl font-semibold text-gray-800 mb-4'>
            Here is your interview feedback
          </h2>

          {/* Overall Rating Card */}
          <div className='bg-white rounded-lg border border-gray-200 p-6 mb-6 shadow-sm'>
            <div className='flex items-center space-x-3'>
              <div className='w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center'>
                <svg className='w-6 h-6 text-purple-600' fill='currentColor' viewBox='0 0 20 20'>
                  <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                </svg>
              </div>
              <div>
                <p className='text-lg font-medium text-purple-600'>Your overall interview rating:</p>
                <p className='text-2xl font-bold text-gray-800'>{averageRating.toFixed(1)}/5</p>
              </div>
            </div>
          </div>

          <p className='text-gray-600 leading-relaxed'>
            Find below interview question with correct answer, your answer and feedback for improvement.
          </p>
        </div>

        {/* Feedback Cards */}
        {feedbackList.length === 0 ? (
          <div className='text-center py-12 bg-white rounded-lg border border-gray-200'>
            <div className='w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4'>
              <svg className='w-8 h-8 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
              </svg>
            </div>
            <p className="text-gray-500">No feedback found for this interview.</p>
          </div>
        ) : (
          <div className='space-y-4'>
            {feedbackList.map((item, index) => (
              <div
                key={index}
                className='bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200'
              >
                {/* Card Header */}
                <div
                  className='p-5 cursor-pointer select-none hover:bg-gray-50 transition-colors duration-150'
                  onClick={() => toggleExpand(index)}
                >
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center space-x-4 flex-1 min-w-0'>
                      <div className='flex-shrink-0'>
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-semibold ${getRatingColor(item.rating)}`}>
                          {item.rating}
                        </div>
                      </div>

                      <div className='flex-1 min-w-0'>
                        <h3 className='text-base font-medium text-gray-900 mb-1 line-clamp-2 pr-4'>
                          Question {index + 1}: {item.question}
                        </h3>
                        <div className='flex items-center space-x-3 text-sm text-gray-500'>
                          <span>Rating: {item.rating}/5</span>
                          {!expandedItems.has(index) && (
                            <span>• Click to expand</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className='flex-shrink-0 ml-4'>
                      <svg
                        className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${expandedItems.has(index) ? 'rotate-180' : ''}`}
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Expandable Content */}
                <div className={`transition-all duration-300 ease-in-out ${expandedItems.has(index) ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                  <div className='px-5 pb-5 border-t border-gray-100'>
                    <div className='space-y-5 pt-5'>

                      {/* Your Answer */}
                      <div>
                        <h4 className='text-sm font-semibold text-gray-800 mb-2 flex items-center'>
                          <div className='w-2 h-2 bg-blue-500 rounded-full mr-2'></div>
                          Your Answer
                        </h4>
                        <div className='bg-blue-50 border border-blue-100 rounded-lg p-4'>
                          <p className='text-gray-700 text-sm leading-relaxed'>{item.userAns}</p>
                        </div>
                      </div>

                      {/* Correct Answer */}
                      <div>
                        <h4 className='text-sm font-semibold text-gray-800 mb-2 flex items-center'>
                          <div className='w-2 h-2 bg-green-500 rounded-full mr-2'></div>
                          Correct Answer
                        </h4>
                        <div className='bg-green-50 border border-green-100 rounded-lg p-4'>
                          <p className='text-gray-700 text-sm leading-relaxed'>{item.correctAns}</p>
                        </div>
                      </div>

                      {/* Feedback */}
                      <div>
                        <h4 className='text-sm font-semibold text-gray-800 mb-2 flex items-center'>
                          <div className='w-2 h-2 bg-purple-500 rounded-full mr-2'></div>
                          Feedback for Improvement
                        </h4>
                        <div className='bg-purple-50 border border-purple-100 rounded-lg p-4'>
                          <p className='text-gray-700 text-sm leading-relaxed'>{item.feedback}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="relative group overflow-hidden bg-purple-300/20 p-0.5 h-9 w-20 rounded-md active:scale-100 hover:scale-105 transition-all duration-300">
        <button onClick={()=>router.replace('/dashboard')} className="text-white text-sm bg-gradient-to-t from-purple-800 to-purple-600 h-full w-full rounded">
         Dashboard
        </button>
        <div className="absolute -bottom-12 group-hover:-bottom-10 transition-all duration-200 left-1/2 -z-10 -translate-x-1/2 blur size-14 rounded-full bg-purple-400"></div>
      </div>
    </div>
  )
}

export default FeedbackPage