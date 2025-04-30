import { MongoClient, ObjectId } from "mongodb";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

// MongoDB Setup
const client = new MongoClient(process.env.MONGODB_URI);
const dbName = "WatchReminder";
const collectionName = "reminders";

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendReminderEmail(to, url) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: "⏰ YouTube Video Reminder",
    text: `Hey! This is your reminder to watch: ${url}`,
  };

  await transporter.sendMail(mailOptions);
  console.log(`✅ Reminder sent to ${to}`);
}

export async function GET(req) {
  // ✅ Check Authorization header
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "");

  if (token !== process.env.CRON_SECRET) {
    return NextResponse.json(
      { error: "Unauthorized access. Invalid token." },
      { status: 401 }
    );
  }

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const now = new Date();
    const reminders = await collection
      .find({ reminderTime: { $lte: now }, reminderSent: false })
      .toArray();

    for (const { _id, userEmail, url } of reminders) {
      try {
        await sendReminderEmail(userEmail, url);
        await collection.updateOne(
          { _id: new ObjectId(_id) },
          {
            $set: {
              reminderSent: true,
              reminderSentTime: new Date(),
            },
          }
        );
      } catch (err) {
        console.error(`❌ Failed to send to ${userEmail}`, err);
      }
    }

    return NextResponse.json({ success: true, count: reminders.length }, { status: 200 });
  } catch (error) {
    console.error("❌ API Error", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
