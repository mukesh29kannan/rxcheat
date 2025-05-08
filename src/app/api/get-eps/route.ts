import { EpsDistance } from "@/lib/models";
import { connectToDb } from "@/lib/mutils";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
    try{
        connectToDb();
        const data = await EpsDistance.find({});
        return NextResponse.json({ status: true, message: 'user created successfully', data });
    }
    catch (err) {
    console.log(err);
    throw new Error("Something went wrong");
  }
}