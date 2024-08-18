import { User } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { auth } from "@/auth";

export const POST = async (request: NextRequest) => {

  try {
    connectToDb();
    const session:any = await auth();
    const { name, username, password, key }: any = await request.json()
    const userId = session?.user?._id 
    if(!userId || userId != '66c04834552408d0ab7975e0')  return NextResponse.json({ error: 'Who are you' }, { status: 500 })
    if (name.length && username.length && password.length && key.length) {
      const user = await User.findOne({ username: username });
      if(user){
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
      }
     
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      await User.create({
        name: name,
        username: username,
        password: hashedPassword,
        key: key,
        isActive: 1
      });
      return NextResponse.json({ status: true, message: 'user created successfully' });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong");
  }
};