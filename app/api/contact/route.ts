import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message, category } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    console.log("[Support Ticket Received]", {
      name,
      email,
      category: category || "general",
      subject: subject || "No Subject",
      messageLength: message.length,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Your support request has been received. Our team will contact you within 24 hours.",
      supportEmail: "weborbitsolutions0@gmail.com",
    });
  } catch (error: any) {
    console.error("[Contact API Error]", error);
    return NextResponse.json(
      { error: "Internal server error processing request." },
      { status: 500 }
    );
  }
}
