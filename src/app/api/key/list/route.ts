import {  Key } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {

    try {
        connectToDb();
        const keys = await Key.find({});
        return NextResponse.json({ status: true, data: keys });
    } catch (err) {
        console.log(err);
        throw new Error("Something went wrong");
    }
};