import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { guestName, attending, numberAttending, dietary, note } = body;

    if (!guestName || typeof attending !== "boolean") {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
    if (!scriptUrl) {
      console.error("GOOGLE_SCRIPT_URL is not set");
      return NextResponse.json(
        { error: "Server not configured" },
        { status: 500 }
      );
    }

    const res = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        guestName,
        attending: attending ? "Yes" : "No",
        numberAttending: attending ? numberAttending || "" : "",
        dietary: dietary || "",
        note: note || "",
      }),
      // Apps Script redirects the POST once when it deploys as a web app
      redirect: "follow",
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Apps Script HTTP error:", res.status, text);
      throw new Error("Failed to write to sheet");
    }

    const resultText = await res.text();
    let result: { result?: string } = {};
    try {
      result = JSON.parse(resultText);
    } catch {
      // Apps Script returned something that isn't JSON — usually an HTML
      // error/login page, which means the script itself failed or access
      // isn't set to "Anyone".
      console.error("Apps Script returned non-JSON response:", resultText);
      throw new Error("Sheet did not confirm the write");
    }

    if (result.result !== "success") {
      console.error("Apps Script did not report success:", resultText);
      throw new Error("Sheet did not confirm the write");
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}