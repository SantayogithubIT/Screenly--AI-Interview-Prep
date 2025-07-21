"use client"
import { LightbulbIcon, Volume2 } from 'lucide-react';
import React from 'react';
import toast from 'react-hot-toast';

function QuestionSection({ mockInterviewQues, activeQuestionIndex, setActiveQuestionIndex }) {
  const textToSpeech=(text)=>{
    if('speechSynthesis' in window){
      const speech = new SpeechSynthesisUtterance(text)
      window.speechSynthesis.speak(speech);
    }else{
      toast.error("Sorry Doesnot Support!")
    }
  }

  return (
    <div className='p-5 border rounded-lg'>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {mockInterviewQues?.map((question, index) => (
          <h2
            key={index}
            onClick={() => setActiveQuestionIndex(index)} // ✅ makes it interactive
            className={`p-2 rounded-full text-xs md:text-sm text-center cursor-pointer transition-all duration-200
              ${activeQuestionIndex === index ? 'bg-purple-600 text-white' : 'bg-secondary text-black'}`}
          >
            Question: {index + 1}
          </h2>
        ))}
      </div>
      {mockInterviewQues?.[activeQuestionIndex] && (
        <div className='mt-6 p-4 border rounded-xl bg-gray-50 shadow-lg'>
          <h3 className='font-semibold text-base mb-2'>Selected Question:</h3>

         <h2 className='text-gray-800 whitespace-pre-line'>{mockInterviewQues[activeQuestionIndex].question}</h2>
           <Volume2 className='cursor-pointer' onClick={()=>textToSpeech(mockInterviewQues[activeQuestionIndex].question)} />
         </div>
        )}
        <div className='border rounded-lg p-5 bg-purple-200 mt-20'>
          <h2 className='flex gap-3 items-center text-purple-900'> 
            <LightbulbIcon />
            <strong>NOTE</strong>
          </h2>
          <h2 className='text-sm text-purple-900 p-2 '>
            Click on Record Answer when you want yo answer the question. 
            At the end of the interview we'll provide you with feedback and suggestions for improvement,
            along with correct answer for each of question and your answer to compare with it.
          </h2>
        </div>
      </div>
  );
}

export default QuestionSection;

