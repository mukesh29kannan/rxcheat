import { Key } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
    try {
        // Connect to the database
        await connectToDb();
        const { user_id }: any = await request.json()
        // Fetch data from the database
        const keys = await Key.find({ createdBy: user_id });

        // Create a response with cache control headers
        const response = NextResponse.json({ status: true, data: keys });

        // Set headers to prevent caching
        response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        response.headers.set('Pragma', 'no-cache');
        response.headers.set('Expires', '0');
        response.headers.set('Surrogate-Control', 'no-store');

        return response;
    } catch (err) {
        console.log(err);
        return NextResponse.json({ status: false, message: 'Something went wrong' });
    }
};
