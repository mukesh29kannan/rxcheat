'use server'
import { signIn, signOut } from "../auth";

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
