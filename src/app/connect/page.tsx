"use client";
import React from "react";
import { Vortex } from "@/components/ui/vortex";

export default function Connect() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Vortex
        backgroundColor="black"
        className="flex items-center flex-col justify-center w-full h-full"
      >
       <h2 className="text-2xl relative z-20 md:text-4xl lg:text-7xl font-bold text-center text-white font-sans tracking-tight">
      RX Cheat
      <br></br>
        <div className="relative mx-auto inline-block w-max drop-shadow-lg">
          <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-blue-500 via-purple-500 to-pink-500">
            <span className="blur-sm opacity-80"><a href="https://t.me/rxcheat_hacker">@iamhackerbgmi</a></span>
          </div>
          <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 py-4">
            <span className="shadow-lg"><a href="https://t.me/rxcheat_hacker">@iamhackerbgmi</a></span>
          </div>
        </div>
      </h2>
      </Vortex>
    </div>
  );
}
