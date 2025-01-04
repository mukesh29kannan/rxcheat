import { Key,User } from "@/lib/models";
import { connectToDb } from "@/lib/mutils";
import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/auth";

export const POST = async (request: NextRequest) => {
    try {
        // Connect to the database
        await connectToDb();

        // Authenticate user
        const session: any = await auth();
        const { user_id }: any = await request.json();

        // Check if user is authenticated
        if (!session?.user) {
            return NextResponse.json({ status: false, message: 'Who are you' });
        }

        // Get the user ID from the session
        const userId = session.user._id;
        let keys;

        // Fetch keys based on user ID
        if (userId === "66c04834552408d0ab7975e0") {
            keys = await Key.find().exec();
            const user = await User.find().select('name username').exec();
            keys = {keys,user}
        } else {
            keys = await Key.find({ createdBy: userId }).exec();
            const user = [
                {
                    "_id": userId,
                    "username": session.user.username,
                    "name": session.user.name
                }
            ]
            keys = {keys,user}
        }

        // Prepare the response
        const response = NextResponse.json({ status: true, data: keys });

        // Set headers to prevent caching
        response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        response.headers.set('Pragma', 'no-cache');
        response.headers.set('Expires', '0');
        response.headers.set('Surrogate-Control', 'no-store');

        return response;
    } catch (err) {
        console.error('Error:', err); // More descriptive error logging
        return NextResponse.json({ status: false, message: 'Something went wrong' });
    }
};
