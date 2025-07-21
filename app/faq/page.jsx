'use client';
import Navbar from '@/components/Navbar';
import React from 'react';

const FAQPage = () => {
  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-purple-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-purple-800 mb-12">
          Frequently Asked Questions
        </h1>

        <div className="space-y-6">
          {faqData.map((item, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6 transition-all hover:shadow-lg">
              <h2 className="text-lg font-semibold text-purple-700">
                {item.question}
              </h2>
              <p className="text-gray-700 mt-2">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
    
  );
};

const faqData = [
  {
    question: 'How does the AI Interview App work?',
    answer:
      'Our app uses advanced natural language processing and machine learning models to simulate real-time interview experiences tailored to your resume and job role.',
  },
  {
    question: 'Is it free to use?',
    answer:
      'We offer a free trial with access to basic features. Premium plans unlock advanced analytics, resume-based question generation, and video interview recording.',
  },
  {
    question: 'Can I reattempt interviews?',
    answer:
      'Yes! You can take unlimited practice interviews and review your answers at any time.',
  },
  {
    question: 'How is feedback generated?',
    answer:
      'Feedback is powered by AI based on your responses, tone, clarity, and relevance to the job description.',
  },
];

export default FAQPage;
