import { connectToDb } from "@/lib/mutils";
import { NextResponse, NextRequest } from "next/server";
import { Logs } from "@/lib/models";

export const POST = async (request: NextRequest) => {
    try{
        await connectToDb();
        const logs = await Logs.find();
        const response = NextResponse.json({ status: true, data: logs });

        // Set headers to prevent caching
        response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        response.headers.set('Pragma', 'no-cache');
        response.headers.set('Expires', '0');
        response.headers.set('Surrogate-Control', 'no-store');
        
        return response
    }
    catch (err) {
    console.log(err);
    throw new Error("Something went wrong");
  }
}