import { NextResponse } from "next/server";

// Main POST handler
export async function POST(request) {
    try {
        return NextResponse.json({
            status: true,
            data: "|#TMPU#;2-#FYQ#;#3136.12.14U15;63;13/358[#-#npeobnf#;#sydifbu#-#npe`tubuvt#;#Tbgf#-#dsfeju#;#sydifbu#-#uplfo#;#6e171df66g9d3:3bd14d7d9db65g1e5c#-#soh#;2844534927~",
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
