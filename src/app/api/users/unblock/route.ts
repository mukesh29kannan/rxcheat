import { User } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/auth";

export const POST = async (request: NextRequest) => {

  try {
    connectToDb();
    const { user_id }: any = await request.json()
    
    // Authenticate user
    const session: any = await auth();
    const userId = session.user._id;
    if (!session?.user || userId != "66c04834552408d0ab7975e0") return NextResponse.json({ status: false, message: 'Who are you' });
    if (user_id.length) {
      await User.findByIdAndUpdate(user_id, { isActive: 1 });
      return NextResponse.json({ status: true, message: 'user unblocked successfully' });
    }
    throw new Error("Invalid payloads");
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong");
  }
};