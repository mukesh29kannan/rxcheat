'use server'
import { signIn, signOut } from "./auth";

export const handleLogout = async () => {
    "use server";
    await signOut();
};

export const handleLogin = async (credentials:any) => {
    "use server";
    try{
        const response = await signIn('credentials',credentials);
        return {status:true}
    }
    catch (err) {
        console.log(err);
        return { error: "Something went wrong!" };
      }

};