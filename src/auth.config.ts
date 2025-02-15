import type { NextAuthConfig } from 'next-auth';
import { User } from './lib/models';
 
export const authConfig = {
  pages: {
    signIn: '/',
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }: any) {
      const isLoggedIn = !!auth?.user;
      const isOnLoginPage = nextUrl.pathname === '/' || nextUrl.pathname === '/connect';

      console.log("Auth user:", auth?.user);
      console.log({ isLoggedIn, isOnLoginPage });

      if (!auth?.user) return false; // Ensure user exists before accessing properties.

      if (isOnLoginPage) {
        const user = await User.findOne({ 
          username: auth.user.username, 
          loginToken: auth.user.loginToken 
        });

        if (!user) return false;

        // Redirect logged-in users from login page to dashboard
        return Response.redirect(new URL('/dashboard', nextUrl));
      }

      return isLoggedIn; // Allow access to other pages only if logged in
    },
    async session({ session, token, user }:any) {
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
  secret: 'JlMBJj5ZjFV5OI1CIIJqmRCQYH1JW2pB',
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;