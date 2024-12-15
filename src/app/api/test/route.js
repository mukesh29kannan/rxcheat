import { NextResponse } from "next/server";

const convertToOrd = (str) => {
  const filteredStr = str.replace(/[^a-zA-Z0-9]/g, '');
  return [...filteredStr].map((char) => char.charCodeAt(0)).reduce((acc, val) => acc + val, 0);
};

// Main POST handler
export async function POST(request) {
    try {
        
        const tillDate = new Date("2025-01-14T12:33:39.415Z");
        const Resdata = {
          SLOT: 1,
          EXP: tillDate,
          modname: "rxcheat",
          mod_status: "Safe",
          credit: "rxcheat",
          token: "03b9fa07e4d4d441ea33e891c055529d",
          rng: Math.floor(Date.now() / 1000),
      }
        return NextResponse.json({
                status: true,
                data:Resdata,
                xpath: convertToOrd(JSON.stringify(Resdata))
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
