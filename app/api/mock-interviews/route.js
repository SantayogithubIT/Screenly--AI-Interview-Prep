import dbConnect from "@/utils/dbConnect";
import MockInterview from "@/models/MockInterview";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return new Response(
      JSON.stringify({ error: "userId is required" }),
      { status: 400 }
    );
  }

  try {
    await dbConnect();

    const interviews = await MockInterview.find({ createdBy: userId }).sort({ createdAt: -1 });

    return new Response(JSON.stringify({ success: true, data: interviews }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
