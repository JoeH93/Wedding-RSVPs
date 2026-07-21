import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fileName, mimeType, base64Data, uploaderName } = body;

    if (!fileName || !mimeType || !base64Data) {
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
        type: "photo",
        fileName,
        mimeType,
        base64Data,
        uploaderName: uploaderName || "Guest",
      }),
      redirect: "follow",
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Apps Script HTTP error:", res.status, text);
      throw new Error("Failed to upload photo");
    }

    const resultText = await res.text();
    let result: { result?: string } = {};
    try {
      result = JSON.parse(resultText);
    } catch {
      console.error("Apps Script returned non-JSON response:", resultText);
      throw new Error("Drive did not confirm the upload");
    }

    if (result.result !== "success") {
      console.error("Apps Script did not report success:", resultText);
      throw new Error("Drive did not confirm the upload");
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