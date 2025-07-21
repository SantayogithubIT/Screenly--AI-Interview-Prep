'use client';
import Navbar from '@/components/Navbar';
import React from 'react';

const HelpCenterPage = () => {
  return (
    <>
    <Navbar />
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-center mb-8">Help Center</h1>
      <p className="text-lg text-center text-gray-600 mb-12">Need assistance? Browse our resources below or contact support.</p>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-purple-700">Getting Started</h2>
          <p className="text-gray-700 mt-2">Start by signing up and uploading your resume. Then choose a role or custom interview topic to begin.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-purple-700">Recording & Feedback</h2>
          <p className="text-gray-700 mt-2">Make sure your mic and webcam are enabled. Feedback appears after each answer based on AI analysis.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-purple-700">Account & Billing</h2>
          <p className="text-gray-700 mt-2">Upgrade, manage billing, or cancel anytime from your dashboard settings.</p>
        </div>
      </div>
    </div>
    </>
    
  );
};

export default HelpCenterPage;
