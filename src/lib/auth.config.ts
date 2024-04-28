export const authConfig = {
    pages: {
      signIn: "/login",
    },
    providers: [],
    callbacks: {
      async jwt({ token, user }:any) {
        if (user) {
          token.id = user.id;
          token.isAdmin = user.isAdmin;
        }
        return token;
      },
      async session({ session, token }:any) {
        if (token) {
          session.user.id = token.id;
          session.user.isAdmin = token.isAdmin;
        }
        return session;
      },
      authorized({ auth, request }:any) {
        const user = auth?.user;
        const isPrelogin = request.nextUrl?.pathname == '/';
        if(!isPrelogin && !user)
          return false;
        if(isPrelogin && user)
          return Response.redirect(new URL("/dashboard", request.nextUrl));
        return true
      },
    },
  };