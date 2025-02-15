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
        <h2 className="text-white text-2xl md:text-6xl font-bold text-center">
          RX Cheat
        </h2>
        <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center">
          <a href="https://t.me/rxcheat_hacker" className="underline">
            @iamhackerbgmi
          </a>
        </p>
      </Vortex>
    </div>
  );
}
