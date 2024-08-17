'use server'
import { signIn, signOut } from "./auth";

export const handleLogout = async () => {
    "use server";
    await signOut();
};

export const handleLogin = async (credentials: any) => {
  "use server"; // Indicates server-side execution

  try {
    // Perform the sign-in operation
    const result:any = await signIn('credentials', {
      redirect: false, // Prevent automatic redirection
      ...credentials
    });

    // Check the result object to determine the outcome
    if (result?.error) {
      console.error("Login failed:", result.error);
      return { error: result.error };
    }

    if (result?.ok) {
      return { status: true }; // Login successful
    }

    return { error: "Unexpected error occurred." }; // Handle unexpected cases
  } catch (err) {
    console.error("Something went wrong during login:", err);
    return { error: "Something went wrong!" };
  }
};
