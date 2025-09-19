import { NextResponse } from "next/server";

const WEB_A_URL = process.env.WEB_A_URL || "https://it3b-api-key-act6.vercel.app/";
const WEB_A_API_KEY = process.env.WEB_A_API_KEY || "";

// Proxy GET → Web A /api/keys
export async function GET(req: Request) {
  try {
    const apiKey = req.headers.get("x-api-key") ?? WEB_A_API_KEY;

    const res = await fetch(`${WEB_A_URL}/api/keys`, {
      headers: { "x-api-key": apiKey },
    });

    const data = await res.json();

    if (res.ok && data.items && data.items.length > 0) {
      return NextResponse.json(data.items[0], { status: 200 });
    }

    return NextResponse.json({ error: "Key not found" }, { status: 404 });
  } catch (error) {
    console.error("Proxy GET failed:", error);
    return NextResponse.json(
      { error: "❌ Failed to reach Website A" },
      { status: 500 }
    );
  }
}

// Proxy POST → Web A /api/keys
export async function POST(req: Request) {
  try {
    const apiKey = req.headers.get("x-api-key") ?? WEB_A_API_KEY;
    const body = await req.json();

    const res = await fetch(`${WEB_A_URL}/api/keys`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Proxy POST failed:", error);
    return NextResponse.json(
      { error: "❌ Failed to reach Website A" },
      { status: 500 }
    );
  }
}
