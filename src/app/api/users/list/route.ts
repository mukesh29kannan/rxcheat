import { User,Key } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/auth";

export const POST = async (request: NextRequest) => {
    try {
        await connectToDb();

        // Authenticate user
        const session: any = await auth();
        const userId = session.user._id;
        if (!session?.user || userId != "66c04834552408d0ab7975e0") return NextResponse.json({ status: false, message: 'Who are you' });
        const users = await User.find().select('username name isActive').exec();
        const keys = await Key.find().select('createdBy').exec();
        return NextResponse.json({ status: true, data: {users,keys} });
    }
    catch (err) {
        console.error('Error:', err); // More descriptive error logging
        return NextResponse.json({ status: false, message: 'Something went wrong' });
    }
}