import { Key } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { createHash } from 'crypto';

const generateMD5 = (input) => {
    const hash = createHash('md5');
    hash.update(input);
    return hash.digest('hex');
  };
  
export const POST = async (req, res) => {
    if (req.method === 'POST') {
        return await index_post(req, res);
    } else {
        const nata = {
            "web_info": {
                "_client": process.env.BASE_NAME,
                "license": "Qp5KSGTquetnUkjX6UVBAURH8hTkZuLM",
                "version": "1.0.0",
            },
            "web__dev": {
                "author": "DhuvadHeet",
            },
        };
        return res.status(200).json(nata);
    }
}

async function index_post(req, res) {
    const { game, user_key: uKey, serial: sDev } = req.body;

    const form_rules = {
        game: /^[a-zA-Z0-9_-]+$/,
        user_key: /^[a-zA-Z0-9]{1,36}$/,
        serial: /^[a-zA-Z0-9_-]+$/,
    };

    for (const field in form_rules) {
        if (!form_rules[field].test(req.body[field])) {
            const data = {
                status: false,
                reason: "Bad Parameter",
            };
            return res.status(400).json(data);
        }
    }

    connectToDb();

    const keyExist = await Key.findOne({ key: uKey });

    if (!keyExist)
        return res.json({ status: false, reason: 'Key not exists' });

    if (keyExist.isActive == 1) {
        const now = new Date();
        const tillDate = new Date(keyExist.validity)
        // if (now > tillDate) {
        //     return res.json({ status: false, reason: 'Key is expired' });
        // }
        if (keyExist.deviceId == '1') {
            await Key.findByIdAndUpdate(keyExist._id, { deviceId: sDev });
            return res.json({ status: true, data: 'user key successfully' });
        }
        if (keyExist.deviceId != sDev) {
            return res.json({ status: false, reason: 'Key already loggedin' });
        }
        const tokenGen = generateMD5(`${game}-${user_key}-${serial}-Vm8Lk7Uj2JmsjCPVPVjrLa7zgfx3uz9E`)
        return res.json({ 
             status: true,
             data: {
                SLOT:1,
                EXP: tillDate,
                modname: "rxcheat",
                mod_status: "Safe",
                credit:"rxcheat",
                token: tokenGen,
                rng: Math.floor(Date.now() / 1000)   
             }
            });
    }
    return res.json({ status: false, reason: 'Key is blocked' });
}
