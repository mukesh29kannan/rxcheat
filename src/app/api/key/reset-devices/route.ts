import { Key } from "@/lib/models";
import { connectToDb } from "@/lib/mutils";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {

  try {
    connectToDb();
    const { id }: any = await request.json()
    if (id.length) {
      await Key.findByIdAndUpdate(id, { deviceId: [] });
      return NextResponse.json({ status: true, message: 'devices reseted successfully' });
    }
    throw new Error("Invalid payloads");
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong");
  }
};