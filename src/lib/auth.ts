import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDb } from "./utils";
import { User } from "./models";
import bcrypt from "bcryptjs";
import { authConfig } from './auth.config';

// Login function with improved error handling
const login = async (credentials: any) => {
  try {
    await connectToDb(); // Ensure connection is established

    const user = await User.findOne({ username: credentials.username });
    if (!user) throw new Error("Incorrect username or password.");

    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
    if (!isPasswordCorrect) throw new Error("Incorrect username or password.");

    return user;
  } catch (error) {
    console.error("Login failed:", error);
    throw new Error("Authentication failed.");
  }
};

// NextAuth configuration
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} =  NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          console.log({user})
          return user; // Return user object if successful
        } catch (error) {
          console.error("Authorization failed:", error);
          return null; // Return null if authentication fails
        }
      },
    }),
  ],
});
