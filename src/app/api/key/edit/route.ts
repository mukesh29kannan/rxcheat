import { Key } from "@/lib/models";
import { connectToDb } from "@/lib/mutils";
import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/auth";

export const POST = async (request: NextRequest) => {
  try {
    await connectToDb();
    const { id, key, period, noDevices, game }: any = await request.json();

    // Authenticate user
    const session: any = await auth();
    if (!session?.user) {
      return NextResponse.json({ status: false, message: "Unauthorized access" }, { status: 401 });
    }

    // Validate required fields
    if (!id || !key || !period || !noDevices || !game) {
      return NextResponse.json({ status: false, message: "All fields are required" }, { status: 400 });
    }

    // Update the key in the database
    const updatedKey = await Key.findOneAndUpdate(
      { _id: id }, // Find key by ID
      { key, period, noDevices, game }, // Update fields
      { new: true } // Return updated document
    );

    if (!updatedKey) {
      return NextResponse.json({ status: false, message: "Key not found" }, { status: 404 });
    }

    return NextResponse.json({ status: true, message: "Key updated successfully", data: updatedKey }, { status: 200 });
  } catch (error) {
    console.error("Error updating key:", error);
    return NextResponse.json({ status: false, message: "Internal Server Error" }, { status: 500 });
  }
};
