// app/api/interviews/[interviewId]/route.js

// app/api/interviews/[interviewId]/route.js

import dbConnect from "@/utils/dbConnect";
import MockInterview from "@/models/MockInterview";
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  await dbConnect();

  // ✅ FIX: 'interviewId' is already available from the 'params' object
  // passed into the function. No need to re-declare it.
  const { interviewId } = params; 

  if (!interviewId || interviewId === 'undefined') {
    return NextResponse.json(
      { success: false, message: 'Invalid Interview ID provided.' },
      { status: 400 }
    );
  }

  try {
    const interview = await MockInterview.findOne({ mockId: interviewId });

    if (!interview) {
      return NextResponse.json(
        { success: false, message: 'Interview not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, interview }, { status: 200 });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { success: false, message: "An internal server error occurred." },
      { status: 500 }
    );
  }
}