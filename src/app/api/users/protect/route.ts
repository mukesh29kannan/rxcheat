import { User } from "@/lib/models";
import { connectToDb } from "@/lib/mutils";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {

  try {
    connectToDb();
    const { user_id,isLoginProtected }: any = await request.json()
    if (user_id.length && isLoginProtected == 0 || isLoginProtected ==1) {
      await User.findOneAndUpdate({ _id: user_id }, { $set: { isLoginProtected} },{ new: true });
      return NextResponse.json({ status: true, message: 'User deleted successfully' });
    }
    throw new Error("Invalid payloads");
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong");
  }
};