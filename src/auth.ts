import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { connectToDb } from "./lib/utils";
import { User } from "./lib/models";
import bcrypt from "bcryptjs";

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

export const { signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
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
    })
  ],
  callbacks: {
    async session({ session, token, user }:any) {
      console.log({token,user})
      session.user = token.user
      return session;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
});