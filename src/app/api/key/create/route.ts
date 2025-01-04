import { Key } from "@/lib/models";
import { connectToDb } from "@/lib/mutils";
import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/auth";

export const POST = async (request: NextRequest) => {

  try {
    connectToDb();
    const { key, period, noDevices,game }: any = await request.json()
    const session:any = await auth();
    if(!session?.user) return NextResponse.json({ status: false, message: 'Who are you' });
    const userId = session?.user?._id

    if (key.length && period.length) {
      const keyExist = await Key.findOne({ key: key });
      if (keyExist){
        return NextResponse.json({ error: 'Key already exists' }, { status: 409 })
      }
      
      const keys = await Key.create({
        key: key,
        isActive: 1,
        period: period,
        deviceId: [],
        createdBy: userId,
        noDevices: noDevices,
        game: game
      });
      return NextResponse.json({ status: true, message: 'user created successfully' });
    }
    else{
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong");
  }
};
