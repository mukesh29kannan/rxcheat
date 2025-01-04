import { Key } from "@/lib/models";
import { connectToDb } from "@/lib/mutils";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {

  try {
    connectToDb();
    const { user_id }: any = await request.json()
    if (user_id.length) {
      await Key.deleteMany({createdBy:user_id})
      return NextResponse.json({ status: true, message: 'Keys deleted successfully' });
    }
    throw new Error("Invalid payloads");
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong");
  }
};