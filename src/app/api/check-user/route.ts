import { NextResponse } from "next/server";
import { connectToDb } from "@/lib/mutils";
import { User } from "@/lib/models";

export async function POST(req: Request) {
  try {
    const { username, loginToken } = await req.json();
    await connectToDb();
    
    const user = await User.findOne({ username, loginToken });
    console.log({ valid: !!user , username, user})
    return NextResponse.json({ valid: !!user });
  } catch (error:any) {
    return NextResponse.json({ valid: false, error: error.message }, { status: 500 });
  }
}
