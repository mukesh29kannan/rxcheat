import { NextResponse } from "next/server";

const convertToOrd = (str) => {
  
  return [...str].map((char) => char.charCodeAt(0)).reduce((acc, val) => acc + val, 0);
};

// Main POST handler
export async function POST(request) {
    try {
        const data = `{
              "SLOT": 1,
              "EXP": "2025-01-03T04:52:02.247Z",
              "modname": "rxcheat",
              "mod_status": "Safe",
              "credit": "rxcheat",
              "token": "5d060ce55f8c292ac03c6c8ca54f0d4b",
              "rng": 1733423816
          }`;
        const filteredStr = data.replace(/[^a-zA-Z0-9]/g, '');
        return NextResponse.json({
          "status": true,
          "data": {
            "SLOT": 1,
            "EXP": "2025-01-14T12:33:39.415Z",
            "modname": "rxcheat",
            "mod_status": "Safe",
            "credit": "rxcheat",
            "token": "03b9fa07e4d4d441ea33e891c055529d",
            "rng": 1734266064
          }
        });
    }
    catch (error) {
        console.error("API route error:", error);
        return NextResponse.json({ status: false, reason: "Internal server error" }, { status: 500 });
    }
}

// Main GET handler
export async function GET() {
    const htmlContent = `
    <div>
      <h1>RX CHEAT</h1>
    </div>
    <div>
      <p>Telegram username: @iamhackerbgmi</p>
      <p>Telegram Channel Link: <a href="https://t.me/rxcheat_hacker">https://t.me/rxcheat_hacker</a></p>
    </div>
  `;
    return NextResponse.html(htmlContent);
}
