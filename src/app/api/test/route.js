import { NextResponse } from "next/server";

// Main POST handler
export async function POST(request) {
    try {
        return NextResponse.json({
            status: true,
            data: `}$UNQV$<3.$GZR$<$4247/23/25V26<74<240469\$.$oqfpcog$<$tzejgcv$.$oqfauvcvwu$<$Uchg$.$etgfkv$<$tzejgcv$.$vqmgp$<$7f282eg77h:e4;4ce25e8e:ec76h2f6d$.$tpi$<3955645:38`,
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
