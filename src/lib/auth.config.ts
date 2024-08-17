import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isLogin = nextUrl.pathname == '/';
      console.log({isLoggedIn,isLogin})
      if (!isLogin) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      }
      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;