import { NextResponse } from "next/server";
import dbconnect from "@/backend/lib/db";
import reminderQueue from "@/backend/mail/reminderQueue";

export async function GET(req) {
  try {
    await dbconnect();
    return NextResponse.json({ message: "DB connected!" });
  } catch (err) {
    return NextResponse.json({ error: "DB connection failed" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await dbconnect();
    const body = await req.json();
    const { email, url, reminderTime } = body;

    // Save to DB...

    await reminderQueue.add(
      { email, url },
      { delay: new Date(reminderTime).getTime() - Date.now() }
    );

    return NextResponse.json({ message: "Reminder set!" });
  } catch (err) {
    return NextResponse.json({ error: "Failed to set reminder" }, { status: 500 });
  }
}
