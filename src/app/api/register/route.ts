import { User } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (request: NextRequest) => {

  try {
    connectToDb();
    const { name, username, password, key }: any = await request.json()
    if (name.length && username.length && password.length && key.length) {

      const user = await User.findOne({ username: username });
      if(user)
        return new Error("Invalid payloads");
      
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      await User.create({
        name: name,
        username: username,
        password: hashedPassword,
        key: key
      });
      return NextResponse.json({ status: true, message: 'user created successfully' });
    }
    throw new Error("Invalid payloads");
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong");
  }
};