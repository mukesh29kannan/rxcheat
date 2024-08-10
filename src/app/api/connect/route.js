import { Key } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { createHash } from 'crypto';
import { NextResponse, NextRequest } from 'next/server';
import { parse } from 'querystring';

const generateMD5 = (input) => {
    const hash = createHash('md5');
    hash.update(input);
    return hash.digest('hex');
};

export async function POST(request) {
    try {
        // Parse URL-encoded form data
        const body = await request.text();
        const req = parse(body);
        const { game, user_key: uKey, serial: sDev } = req;

        const form_rules = {
            game: /^[a-zA-Z0-9_-]+$/,
            user_key: /^[a-zA-Z0-9]{1,36}$/,
            serial: /^[a-zA-Z0-9_-]+$/,
        };

        for (const field in form_rules) {
            if (!form_rules[field].test(req[field])) {
                return NextResponse.json({
                    status: false,
                    reason: "Bad Parameter",
                }, { status: 400 });
            }
        }

        await connectToDb(); // Ensure you wait for the DB connection

        const keyExist = await Key.findOne({ key: uKey });

        if (!keyExist) {
            return NextResponse.json({ status: false, reason: 'Key not exists' });
        }

        if (keyExist.isActive === 1) {
            const now = new Date();
            const tillDate = new Date(keyExist.validity);

            if (keyExist.deviceId === '1') {
                await Key.findByIdAndUpdate(keyExist._id, { deviceId: sDev });
            }
            if (now > tillDate) {
                return res.json({ status: false, reason: 'Key is expired' });
            }

            if (keyExist.deviceId !== sDev) {
                return NextResponse.json({ status: false, reason: 'Key already logged in' });
            }

            const tokenGen = generateMD5(`${game}-${uKey}-${sDev}-Vm8Lk7Uj2JmsjCPVPVjrLa7zgfx3uz9E`);
            return NextResponse.json({
                status: true,
                data: {
                    SLOT: 1,
                    EXP: tillDate,
                    modname: "rxcheat",
                    mod_status: "Safe",
                    credit: "rxcheat",
                    token: tokenGen,
                    rng: Math.floor(Date.now() / 1000)
                }
            });
        }

        return NextResponse.json({ status: false, reason: 'Key is blocked' });

    } catch (error) {
        console.error('API route error:', error);
        return NextResponse.json({ status: false, reason: 'Internal server error' }, { status: 500 });
    }
}
export async function GET() {
    const htmlContent = `
        <div>
            <h1>RX CHEAT</h1>
        </div>
        <div>
            <p>Telegram username: @iamhackerbgmi</p>
        </div>
    `;

    return NextResponse.json({
        message: 'This endpoint does not return HTML. Use a Next.js page instead.'
    }, { status: 200 });
}