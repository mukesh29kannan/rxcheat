import type { Metadata } from "next";
import { Inter } from "next/font/google";
import './../../public/assets/scss/style.scss'
import "./globals.css";
import Providers from "./providers";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RX Cheat",
  description: "Telegram username: @iamhackerbgmi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}><Providers>{children}</Providers></body>
    </html>
  );
}
