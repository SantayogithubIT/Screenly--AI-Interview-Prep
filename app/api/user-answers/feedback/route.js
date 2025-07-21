import dbConnect from "@/utils/dbConnect";
import UserAnswer from "@/models/UserAnswer";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const mockRefId = searchParams.get("mockRefId");

  if (!mockRefId) {
    return new Response(
      JSON.stringify({ error: "mockRefId is required" }),
      { status: 400 }
    );
  }

  try {
    await dbConnect();
    const answers = await UserAnswer.find({ mockRefId });
    return new Response(JSON.stringify({ success: true, data: answers }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
