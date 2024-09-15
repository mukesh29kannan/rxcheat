'use client'
//import { useEffect } from 'react';
//import { useSearchParams } from 'next/navigation';
import KeyListComp from "@/components/KeyListComp";
import AddKeyComp from "@/components/AddKeyComp";
import IsDown from "@/components/IsDown";
import { Chip } from "@nextui-org/react";

export default function Dashboard() {
    return (
        <div className="px-4 py-2">
            <div className="flex justify-between ">
                <div className="pl-2 text-xl font-medium"><Chip color="primary" size="lg" variant="light"><span className="font-semibold">KEYS</span></Chip> </div>
                <div className="flex gap-5">
                    <AddKeyComp />
                    <IsDown/>
                </div>
            </div>
            <div className="py-3">
                <KeyListComp />
            </div>
        </div>
    );
}
