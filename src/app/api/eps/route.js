// app/api/get-eps/route.js or route.ts
import { EpsDistance } from "@/lib/models";
import { connectToDb } from "@/lib/mutils";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectToDb(); // make sure it's awaited
    const { distance } = await request.json();

    // Clear existing distances and add new one
    await EpsDistance.deleteMany({});
    await EpsDistance.create({ distance });

    return NextResponse.json({
      status: true,
      message: "Distance saved successfully",
    });
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json(
      { status: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
