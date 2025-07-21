import dbConnect from "@/utils/dbConnect";
import UserAnswer from "@/models/UserAnswer";

export async function GET(req, { params }) {
  try {
    await dbConnect();

    const { interviewId } = params; // ✅ correct spelling here

    const answers = await UserAnswer.find({ mockRefId: interviewId });

    if (!answers || answers.length === 0) {
      return new Response(JSON.stringify({ error: "No answers found" }), { status: 404 });
    }

    return new Response(JSON.stringify(answers), { status: 200 });

  } catch (error) {
    console.error("Error fetching user answers:", error);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
