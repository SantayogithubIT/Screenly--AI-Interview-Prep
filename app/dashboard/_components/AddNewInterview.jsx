'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUser } from '@clerk/nextjs';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from '@/components/ui/textarea';
import { LoaderCircleIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

function AddNewInterview() {
  const [dialog, setDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState('');
  const [jobDes, setJobDes] = useState('');
  const [jobExperience, setJobExperience] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Step 1: Securely generate questions via your backend
      const questionsResponse = await fetch('/api/generateQuestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobPosition, jobDes, jobExperience }),
      });

      const questionsData = await questionsResponse.json();

      if (!questionsData.success) {
        throw new Error(questionsData.message || 'Failed to generate questions.');
      }

      const mockJsonResponse = questionsData.questions;
       const createdBy = user?.id ||"guest-user";
       const userId = createdBy;
      // Step 2: Save the generated questions to your database
      const saveResponse = await fetch('/api/interviews', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mockId: uuidv4(),
          mockRes: JSON.stringify(mockJsonResponse),
          jobPosition,
          jobDescription: jobDes,
          jobExperience,
          createdBy,
          userId,
        }),
      });

      const saveData = await saveResponse.json();
      
      console.log("Data received from backend to save:", saveData);

      if (saveData.success) {
        toast.success("Interview created successfully!");
        setDialog(false);
        router.push(`/dashboard/interview/${saveData.mockId}`);
      } else {
        throw new Error(saveData.message || 'Failed to save the interview.');
      }

    } catch (error) {
      console.error("Submission Error:", error);
      toast.error(error.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        onClick={() => setDialog(true)}
        className='p-10 border-purple-700 rounded-lg bg-secondary hover:scale-110 hover:shadow-purple-500 cursor-pointer transition-all'
      >
        <h2 className='font-bold text-lg text-center'>+ Add New</h2>
      </div>

      <Dialog open={dialog} onOpenChange={setDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className='text-2xl font-bold'>
              Tell us more about your Interview
            </DialogTitle>
            <DialogDescription>
              Add details about the job role, description, and years of experience.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={onSubmitHandler} className="space-y-4 mt-4">
            <div>
              <label>Job Role / Position</label>
              <Input
                placeholder="Ex. Full Stack Developer"
                required
                value={jobPosition}
                onChange={(e) => setJobPosition(e.target.value)}
              />
            </div>
            <div>
              <label>Job Description / Tech Stack</label>
              <Textarea
                placeholder="Ex. Java, Node, ReactJs"
                required
                value={jobDes}
                onChange={(e) => setJobDes(e.target.value)}
              />
            </div>
            <div>
              <label>Years of Experience</label>
              <Input
                placeholder="Ex. 5 months"
                required
                value={jobExperience}
                onChange={(e) => setJobExperience(e.target.value)}
              />
            </div>
            <div className='flex justify-end pt-4 gap-4'>
              <Button type='button' onClick={() => setDialog(false)} variant="ghost">
                Cancel
              </Button>
              <Button type='submit' disabled={loading} className='bg-purple-700'>
                {loading ? (
                  <>
                    <LoaderCircleIcon className='animate-spin mr-2' /> Generating...
                  </>
                ) : "Start Interview"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;