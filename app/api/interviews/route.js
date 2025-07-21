import { NextResponse } from 'next/server'
import MockInterview from '@/models/MockInterview'
import dbConnect from '@/utils/dbConnect'

// POST method: Save interview to MongoDB
export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json();
    const { mockJsonResponse, jobPosition, jobDescription, jobExperience, createdBy, userId, mockId } = body;

    const newInterview = await MockInterview.create({
     userId: body.userId,
      mockId: body.mockId,
      mockRes: body.mockRes,
      jobPosition: body.jobPosition,
      jobDescription: body.jobDescription,
      jobExperience: body.jobExperience,
      createdBy: body.createdBy,
    });

    return NextResponse.json({ success: true, mockId: newInterview.mockId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}

// GET method: Fetch all interviews
export async function GET() {
  await dbConnect();

  try {
    const interviews = await MockInterview.find();
    return NextResponse.json({ success: true, data: interviews }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
