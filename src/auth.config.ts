import type { NextAuthConfig } from "next-auth";
import { connectToDb } from "@/lib/mutils";
import { User } from "@/lib/models";

export const authConfig = {
  pages: {
    signIn: "/",
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }:any) {
      const isLoggedIn = !!auth?.user;
      const isOnLoginPage = ["/", "/connect"].includes(nextUrl.pathname);

      console.log("Auth user:", auth?.user);
      console.log({ isLoggedIn, isOnLoginPage });

      if (isOnLoginPage) return !isLoggedIn; 

      // If user is logged in, validate the loginToken in the database
      if (isLoggedIn && auth?.user?.loginToken) {
        await connectToDb();
        const dbUser = await User.findOne({ username: auth.user.username });

        if (!dbUser || dbUser.loginToken !== auth.user.loginToken) {
          console.log("Invalid or expired loginToken. Logging out...");
          return false; // Deny access if token doesn't match
        }

        return true; // Allow access if token is valid
      }

      return false; // Block access if not logged in or missing token
    },
    async session({ session, token }: any) {
      if (token.user) {
        session.user = token.user;
      } else {
        session.user = null; // Ensure session is invalid if token is missing
      }
      return session;
    },
    async jwt({ token, user }: any) {
      if (user) {
        token.user = user;
      }

      // Ensure token has a valid loginToken
      if (!token.user?.loginToken) {
        return {};
      }

      return token;
    },
  },
  secret: "JlMBJj5ZjFV5OI1CIIJqmRCQYH1JW2pB",
  providers: [], // Add authentication providers here
} satisfies NextAuthConfig;
