import { NextRequest, NextResponse } from "next/server";
import { connectToDb } from "@/lib/mutils";
import { User } from "@/lib/models";

export async function POST(request: NextRequest) {
  try {
    const { username, loginToken } = await request.json()
    await connectToDb();
    
    const user = await User.findOne({ username, loginToken });
    console.log({ valid: !!user , username, user})
    return NextResponse.json({ valid: !!user });
  } catch (error:any) {
    return NextResponse.json({ valid: false, error: error.message }, { status: 500 });
  }
}
