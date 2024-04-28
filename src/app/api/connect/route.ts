import { Key } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {

    try {
        connectToDb();
        const { game, user_key, serial }: any = await request.json()
        if (game.length && user_key.length && serial.length) {
            const keyExist = await Key.findOne({ key: user_key });
            if (!keyExist)
                return NextResponse.json({ status: false, reason: 'Key not exists' });
            if (keyExist.isActive == 1) {
                const now = new Date();
                const tillDate = new Date(keyExist.validity)
                if (now > tillDate) {
                    return NextResponse.json({ status: false, reason: 'Key is expired' });
                }
                if (keyExist.deviceId == '1') {
                    await Key.findByIdAndUpdate(keyExist._id, { deviceId: serial });
                    return NextResponse.json({ status: true, data: 'user key successfully' });
                }
                if (keyExist.deviceId != serial) {
                    return NextResponse.json({ status: false, reason: 'Key already loggedin' });
                }
                return NextResponse.json({ status: true, data: 'user key successfully' });
            }
            return NextResponse.json({ status: false, reason: 'Key is blocked' });
        }
        throw new Error("Invalid payloads");
    } catch (err) {
        console.log(err);
        throw new Error("Something went wrong");
    }
};