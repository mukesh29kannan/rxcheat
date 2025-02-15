import type { NextAuthConfig } from 'next-auth';
import { User } from './lib/models';
 
export const authConfig = {
  pages: {
    signIn: '/',
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }:any) {
      // Check if the user is authenticated
      const isLoggedIn = !!auth?.user;
      const isOnLoginPage = nextUrl.pathname == '/' || nextUrl.pathname == '/connect';
      console.log("auth user",auth?.user)
      console.log({isLoggedIn,isOnLoginPage})
      if(isOnLoginPage){
        const user = await User.findOne({ username : auth?.user?.username , loginToken: auth?.user?.loginToken });

        if (!user) {
          return false;
        }

        if(isLoggedIn) return Response.redirect(new URL('/dashboard', nextUrl));
        return true;
      }
      else{
        if(isLoggedIn) return true;
        return false;
      }
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