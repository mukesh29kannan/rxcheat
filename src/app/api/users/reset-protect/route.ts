import { User } from "@/lib/models";
import { connectToDb } from "@/lib/mutils";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {

  try {
    connectToDb();
    const { user_id }: any = await request.json()
    if (user_id.length) {
      await User.findOneAndUpdate({ _id: user_id }, { $set: { uniqueId : ''} },{ new: true });
      return NextResponse.json({ status: true, message: 'User protect reseted successfully' });
    }
    throw new Error("Invalid payloads");
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong");
  }
};