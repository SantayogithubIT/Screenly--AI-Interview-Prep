"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const InterviewList = () => {
  const { user } = useUser();
  const [interviews, setInterviews] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const res = await fetch(`/api/interviews?userId=${user?.id}`);
        const data = await res.json();
        if (data.success) {
          setInterviews(data.data);
        } else {
          console.error(data.error);
        }
      } catch (err) {
        console.error("Failed to fetch interviews", err);
      }
    };

    if (user?.id) {
      fetchInterviews();
    }
  }, [user]);

return (
  <div className="p-6 max-w-7xl mx-auto bg-gray-50 min-h-screen">
    <h2 className="text-3xl font-extrabold text-gray-900 mb-10 border-b-4 border-blue-600 pb-3">
      Test/Mock Interviews
    </h2>
    {interviews.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {interviews.map((interview) => (
          <div
            key={interview._id}
            className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300 ease-in-out"
          >
            <h3 className="text-2xl font-bold text-purple-800 mb-4 truncate">
              {interview.jobPosition}
            </h3>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Experience:</span>{" "}
              {interview.jobExperience}
            </p>
            <p className="text-gray-700 mb-5 line-clamp-3">
              <span className="font-semibold">Description:</span>{" "}
              {interview.jobDescription}
            </p>
            <p className="text-sm text-gray-400 italic mb-6">
              Created on: {new Date(interview.createdAt).toLocaleString()}
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => router.push(`/dashboard/interview/${interview.mockId}`)}
                className=" cursor-pointer flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 rounded-lg shadow-md transition"
              >
                Start Interview
              </button>
              <button
                onClick={() =>
                  router.push(`/dashboard/interview/${interview.mockId}/feedback`)
                }
                className="cursor-pointer flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 rounded-lg shadow-md transition"
              >
                View Feedback
              </button>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-center text-gray-500 text-lg mt-20">No interviews found.</p>
    )}
  </div>
);
}
export default InterviewList
