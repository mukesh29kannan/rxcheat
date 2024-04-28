import { Key } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {

  try {
    connectToDb();
    const { key, period }: any = await request.json()
    if (key.length && period.length) {

      const keyExist = await Key.findOne({ key: key });
      if (keyExist){
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
      }
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + parseInt(period));

      const keys = await Key.create({
        key: key,
        validity: futureDate,
        isActive: 1,
        deviceId: '1'
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