import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      // Check if the user is authenticated 
      const isLoggedIn = !!auth?.user;
      const isOnLoginPage = nextUrl.pathname == '/' || nextUrl.pathname == '/connect';
      console.log("auth user",auth?.user)
      console.log({isLoggedIn,isOnLoginPage})
      if(isOnLoginPage){
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