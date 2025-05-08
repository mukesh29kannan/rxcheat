import { EpsDistance } from "@/lib/models";
import { connectToDb } from "@/lib/mutils";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
    try{
        connectToDb();
        const { distance }: any = await request.json();
        await EpsDistance.deleteMany({});
        await EpsDistance.create({distance});
        return NextResponse.json({ status: true, message: 'user created successfully' });
    }
    catch (err) {
    console.log(err);
    throw new Error("Something went wrong");
  }
}