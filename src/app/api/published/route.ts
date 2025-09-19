import { NextResponse } from "next/server";

const WEB_A_URL = process.env.WEB_A_URL || "https://it3b-api-key-act6.vercel.app/";
const WEB_A_API_KEY = process.env.WEB_A_API_KEY || "";

// GET → fetch all active artifacts for published page
export async function GET(req: Request) {
  try {
    const apiKey = req.headers.get("x-api-key") ?? WEB_A_API_KEY;

    const res = await fetch(`${WEB_A_URL}/api/keys`, {
      headers: { "x-api-key": apiKey },
    });

    const data = await res.json();

    if (res.ok && data.items) {
      // Filter out revoked artifacts
      const activeItems = data.items.filter((item: any) => !item.revoked);
      return NextResponse.json({ items: activeItems }, { status: 200 });
    }

    return NextResponse.json({ items: [], error: "No artifacts found" }, { status: 200 });
  } catch (error) {
    console.error("Published GET failed:", error);
    return NextResponse.json(
      { items: [], error: "❌ Failed to reach Website A" },
      { status: 500 }
    );
  }
}
