import { Key } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {

  try {
    connectToDb();
    const { key, period,user_id }: any = await request.json()
    if (key.length && period.length) {
      const keyExist = await Key.findOne({ key: key });
      if (keyExist){
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
      }
      
      const keys = await Key.create({
        key: key,
        isActive: 1,
        period: period,
        deviceId: '1',
        createdBy: user_id
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