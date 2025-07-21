'use client'
import React from 'react'
import AddNewInterview from './_components/AddNewInterview'
import InterviewList from './_components/InterviewList'
import { useUser } from '@clerk/nextjs'
const page = () => {
  const user = useUser();
  const userId = user?.id;
  return (
  <div className="p-10 max-w-7xl mx-auto bg-gray-50 min-h-screen">
    <h2 className="font-extrabold text-4xl text-gray-900 mb-2">
      Dashboard
    </h2>
    <h2 className="text-purple-700 text-xl mb-8">
      Create your AI Mock Interview
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-5">
      <AddNewInterview />
    </div>
    {/* Previous interview */}
    <div className="mt-12">
      <InterviewList userId={user?.id} />
    </div>
  </div>
);
}

export default page
