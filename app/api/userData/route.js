import dbConnect from "@/backend/lib/db";
import Reminder from "@/backend/models/Reminder";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const { url, reminderTime, userEmail, sessionId } = body;

    if (!url || !reminderTime || !userEmail || !sessionId) {
      return NextResponse.json({ message: "Missing required fields." }, { status: 400 });
    }

    const reminder = await Reminder.create({
      url,
      reminderTime,
      userEmail,
      sessionId,
    });

    return NextResponse.json({ message: "Reminder saved successfully", reminder }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
  }
}
