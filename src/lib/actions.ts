'use server'
import { signIn, signOut } from "@/auth";
import { auth } from "@/auth";
import { User } from "@/lib/models";
import { connectToDb } from "@/lib/utils";

export const handleLogout = async () => {
    "use server";
    await signOut();
};

export const handleLogin = async (credentials: any) => {
  "use server"; // Indicates server-side execution

  try {
    console.log("came to handlelogin")
    // Perform the sign-in operation
    const result:any = await signIn('credentials', {
      redirect: false, // Prevent automatic redirection
      ...credentials
    });

    return { error: "Unexpected error occurred." }; // Handle unexpected cases
  } catch (err) {
    console.error("Something went wrong during login:", err);
    return { error: "Something went wrong!" };
  }
};

export const getIsMaintainance = async () => {
  "use server";
   const session: any = await auth();
   const userId = session.user._id;
   await connectToDb();
   if (userId === "66c04834552408d0ab7975e0") return {status:false,isDown:false}
   const user = await User.findById(userId);
   return {
    status: true,
    isDown : user?.isDown == 1 ? true : false
   }

}