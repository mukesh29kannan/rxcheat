"use client"
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "react-hot-toast";
import NavbarComp from "@/components/Navbar";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";

export default function Providers({ children,pageProps: { session, ...pageProps } }: any) {
    const pathname = usePathname();
    return (
        <NextUIProvider>
            <SessionProvider session={session}>
            {pathname != '/' && <NavbarComp />}
                {children}
            <Toaster />
            </SessionProvider>
        </NextUIProvider>
    )
}