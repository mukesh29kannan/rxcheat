import { connectToDb } from "@/lib/mutils";
import { createHash } from "crypto";
import { NextResponse } from "next/server";
import { parse } from "querystring";
import { User, Key, Logs } from "@/lib/models";

// Helper function to generate MD5 hash
const generateMD5 = (input) => {
    const hash = createHash("md5");
    hash.update(input);
    return hash.digest("hex");
};

const convertToOrd = (str) => {
    const filteredStr = str.replace(/[^a-zA-Z0-9]/g, '');
    return [...filteredStr].map((char) => char.charCodeAt(0)).reduce((acc, val) => acc + val, 0);
  };

// Helper function to return error responses
const respondWithError = async (logType, reason, status = 400) => {
    await updateLogs(false, logType);
    return NextResponse.json({ status: false, reason }, { status });
};

// Log update function
const updateLogs = async (isSuccess, countType) => {
    try {
        const today = new Date().toISOString().split("T")[0];
        let log = await Logs.findOne({ date: today });

        if (!log) {
            const count = {
                total: 1,
                success: isSuccess ? 1 : 0,
                failed: isSuccess ? 0 : 1,
                badRequest: 0,
                noKey: 0,
                isActiveFailed: 0,
                isDownUser: 0,
                inValidGame: 0,
                maxDevice: 0,
                expiredKey: 0,
            };
            if (!isSuccess) {
                count[countType] = 1;
            }
            await Logs.create({ date: today, count });
        } else {
            const count = log.count;
            count.total += 1;
            if (isSuccess) {
                count.success += 1;
            } else {
                count.failed += 1;
                count[countType] = (count[countType] || 0) + 1;
            }
            await Logs.findByIdAndUpdate(log._id, { count });
        }
    } catch (error) {
        console.error("Error updating logs:", error);
    }
};

// Main POST handler
export async function POST(request) {
    try {
        const body = await request.text();
        const req = parse(body);
        const { game, user_key: uKey, serial: sDev } = req;

        const formRules = {
            game: /^[a-zA-Z0-9_-]+$/,
            user_key: /^[a-zA-Z0-9]{1,36}$/,
            serial: /^[a-zA-Z0-9_-]+$/,
        };

        for (const field in formRules) {
            if (!formRules[field].test(req[field])) {
                return await respondWithError("badRequest", "Bad Parameter");
            }
        }

        await connectToDb();
        const keyExist = await Key.findOne({ key: uKey });

        if (!keyExist) {
            return await respondWithError("noKey", "Key not exists");
        }

        if (keyExist.isActive === 1) {
            const devices = keyExist.deviceId || [];
            const user = await User.findById(keyExist.createdBy);

            if (user?.isDown === 1) {
                return await respondWithError("isDownUser", "Hack was under maintenance");
            }

            if (keyExist.game !== game) {
                return await respondWithError("inValidGame", "Invalid App");
            }

            if (!devices.includes(sDev)) {
                if (devices.length >= keyExist.noDevices) {
                    return await respondWithError("maxDevice", "Max Device Reached");
                }
                await Key.findByIdAndUpdate(keyExist._id, { deviceId: [...devices, sDev] });
            }

            if (!keyExist.validity) {
                const futureDate = new Date();
                futureDate.setDate(futureDate.getDate() + parseInt(keyExist.period));
                await Key.findByIdAndUpdate(keyExist._id, { validity: futureDate });
            }

            const now = new Date();
            const tillDate = new Date(keyExist.validity);
            if (keyExist.validity && now > tillDate) {
                return await respondWithError("expiredKey", "Key is expired");
            }

            const tokenGen = generateMD5(`PUBG-${uKey}-${sDev}-Vm8Lk7Uj2JmsjCPVPVjrLa7zgfx3uz9E`);
            await updateLogs(true, "success");

            const resData = {
                SLOT: 1,
                EXP: tillDate,
                modname: "rxcheat",
                mod_status: "Safe",
                credit: "rxcheat",
                token: tokenGen,
                rng: Math.floor(Date.now() / 1000),
            };
            return NextResponse.json({
                status: true,
                data: resData,
                xpath: convertToOrd(JSON.stringify(resData))
            });
        }

        return await respondWithError("isActiveFailed", "Key is blocked");
    } catch (error) {
        console.error("API route error:", error);
        return NextResponse.json({ status: false, reason: "Internal server error" }, { status: 500 });
    }
}

// Main GET handler
export async function GET() {
    return NextResponse.redirect("https://rxcheat.vercel.app/connect");
}
