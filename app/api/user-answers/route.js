import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import UserAnswer from "@/models/UserAnswer";
export async function POST(request) {
    try{
        await dbConnect();
        const body = await request.json();

        const {
            userId,
            mockRefId,
            question,
            correctAns,
            userAns,
            feedback,
            rating,
            userEmail
        } = body ;

        if(!userId || !mockRefId || !question || !userAns ){
            return NextResponse.json(
                {  success : false, message:"Missing required fields."},
                { status: 400}
            );
        }

        const newUserAnswer = await UserAnswer.create(body);
        return NextResponse.json(
                {  success : true , message:"Response Saved Successfully.", data: newUserAnswer},
                { status: 201}
            );

    }catch(error){
        console.log("Error saving user answer:", error);
        if (error.name === 'ValidationError') {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 400 }
        );
    }
    return NextResponse.json(
      { success: false, message: 'An internal server error occurred.' },
      { status: 500 }
    );   
    }
}