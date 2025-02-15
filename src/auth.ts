import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { connectToDb } from "@/lib/mutils";
import { User } from "@/lib/models";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";
import { createHash } from "crypto";

const generateToken = (username: string) => {
  return createHash("sha256").update(username + Date.now().toString()).digest("hex");
};

const login = async (credentials: any) => {
  try {
    await connectToDb();

    const user = await User.findOne({ username: credentials.username });
    if (!user) throw new Error("Incorrect username or password.");

    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
    if (!isPasswordCorrect) throw new Error("Incorrect username or password.");
    
    if (user.isActive !== 1) throw new Error("User account is not active.");

    // Generate and update login token
    const loginToken = generateToken(credentials.username);
    await User.findOneAndUpdate({ username: credentials.username }, { $set: { loginToken } });

    // Return a valid user object required by NextAuth
    return {
      id: user._id.toString(),  // Required by NextAuth
      username: user.username,
      loginToken,
    };
  } catch (error) {
    console.error("Login failed:", error);
    throw new Error("Authentication failed.");
  }
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          console.log("User authenticated:", user);
          return user;
        } catch (error) {
          console.error("Authorization failed:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }:any) {
      // Attach username and loginToken to session
      session.user = {
        id: token.id,
        username: token.username,
        loginToken: token.loginToken,
      };
      return session;
    },
    async jwt({ token, user }:any) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.loginToken = user.loginToken;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
});
