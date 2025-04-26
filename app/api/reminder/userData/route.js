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

export async function GET(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    const reminders = await Reminder.find(
      { userEmail: email },
      { url: 1, reminderTime: 1, _id: 0 }
    );

    return NextResponse.json({ reminders }, { status: 200 });
  } catch (err) {
    console.error("Error fetching reminders:", err);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

