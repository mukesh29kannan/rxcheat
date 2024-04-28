"use client"
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "react-hot-toast";
import NavbarComp from "@/components/Navbar";
export default function Providers({ children }: any) {
    return (
        <NextUIProvider>
            <NavbarComp />
                {children}
            <Toaster />
        </NextUIProvider>
    )
}