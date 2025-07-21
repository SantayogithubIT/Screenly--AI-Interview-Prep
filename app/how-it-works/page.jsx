'use client';
import React from 'react';
import { Button } from "@/components/ui/button";
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

const steps = [
  {
    title: "1. Sign Up & Build Profile",
    description: "Create an account and upload your resume. This helps us personalize your mock interviews.",
  },
  {
    title: "2. Choose Your Plan",
    description: "Select a free or premium plan based on your usage. Get more interviews and feedback with Pro or Premium.",
  },
  {
    title: "3. Start Mock Interview",
    description: "Our AI generates interview questions based on your resume and role you're applying for.",
  },
  {
    title: "4. Record & Submit Answers",
    description: "Answer questions via webcam. Your responses are recorded and analyzed in real time.",
  },
  {
    title: "5. Get Instant AI Feedback",
    description: "Receive detailed feedback including communication tips, content analysis, and improvement suggestions.",
  },
];

const HowItWorks = () => {
    
  return (
    <>
    <Navbar />
    <section className="min-h-screen bg-white py-16 px-6 md:px-16 text-gray-800">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-purple-700">How It Works</h2>

        <div className="space-y-10">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start gap-4">
              <CheckCircle className="text-purple-600 w-6 h-6 mt-1" />
              <div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
         <Link href='/dashboard'>
          <Button className="text-white bg-purple-600 hover:bg-purple-700 px-6 py-3 text-lg rounded-lg">
            Start Your First Interview
          </Button>
          </Link>
        </div>
      </div>
    </section>
    </>
  );
};

export default HowItWorks;
