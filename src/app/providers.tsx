"use client"
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "react-hot-toast";
import NavbarComp from "@/components/Navbar";
import { usePathname } from "next/navigation";

export default function Providers({ children }: any) {
    const pathname = usePathname();
    return (
         (pathname == "/connect") ? <> {children} </> : <NextUIProvider>
            {(pathname != '/' && !pathname.includes('?callbackUrl')) && <NavbarComp />}
                {children}
            <Toaster />
        </NextUIProvider>
    )
}