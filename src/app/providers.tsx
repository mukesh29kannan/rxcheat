"use client"
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "react-hot-toast";
import NavbarComp from "@/components/Navbar";
import { usePathname } from "next/navigation";

export default function Providers({ children }: any) {
    const pathname = usePathname();

    // Pathnames where you want to skip NextUIProvider and Navbar
    const skipWrapperPaths = ["/connect"];
    const hideNavbarPaths = ["/", "/UDRUftcHJVLNrxZF3IZqw", "/free-keys"];

    if (skipWrapperPaths.includes(pathname)) {
        return <>{children}</>;
    }

    return (
        <NextUIProvider>
            {!hideNavbarPaths.includes(pathname) && <NavbarComp />}
            {children}
            <Toaster />
        </NextUIProvider>
    );
}
