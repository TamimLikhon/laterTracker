import {dbConnect} from "@/backend/lib/db";
import Reminder from "@/backend/models/Reminder";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const { email, url } = body;

    // Ensure both email and url are provided
    if (!email || !url) {
      return NextResponse.json({ message: "Missing email or url" }, { status: 400 });
    }

    // Using aggregation to find and verify the document
    const result = await Reminder.aggregate([
      { $match: { userEmail: email, url } },  // Match email and url
      { $project: { _id: 1, url: 1, userEmail: 1 } }  // Project only the relevant fields
    ]);

    // If no document matches, return a 404
    if (result.length === 0) {
      return NextResponse.json({ message: "Reminder not found" }, { status: 404 });
    }

    // Now that we verified, we delete the reminder
    await Reminder.deleteOne({ userEmail: email, url });

    return NextResponse.json({ message: "Reminder deleted successfully" }, { status: 200 });

  } catch (err) {
    console.error("Delete error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
