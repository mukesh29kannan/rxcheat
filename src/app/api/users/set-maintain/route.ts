import { User } from "@/lib/models";
import { connectToDb } from "@/lib/mutils";
import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/auth";

export const POST = async (request: NextRequest) => {

  try {
    connectToDb();
    const { user_id }: any = await request.json()
    
    // Authenticate user
    const session: any = await auth();
    const userId = session.user._id;
    if (!session?.user) return NextResponse.json({ status: false, message: 'Who are you' });
    if (user_id) {
      await User.findByIdAndUpdate(userId, { isDown: 1 });
      return NextResponse.json({ status: true, message: 'Maintenance setted successfully' });
    }
    throw new Error("Invalid payloads");
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong");
  }
};