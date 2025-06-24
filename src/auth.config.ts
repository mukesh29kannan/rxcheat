import next from 'next';
import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/',
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }:any) {
      // Check if the user is authenticated
      const isLoggedIn = !!auth?.user;
      const isOnLoginPage = nextUrl.pathname == '/';
      console.log("auth user",auth?.user)
      console.log({isLoggedIn,isOnLoginPage});
      if(nextUrl.pathname == '/connect' || nextUrl.pathname == '/UDRUftcHJVLNrxZF3IZqw') return true; 
      if(isLoggedIn){
        const res = await fetch('https://rxcheat.vercel.app/api/check-user', {
          method: "POST",
          body: JSON.stringify({
            username: auth.user.username,
            loginToken: auth.user.loginToken,
          }),
          headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();
        console.log({data})
        if (!data.valid) return false;
      }
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