import { MongoClient, ObjectId } from "mongodb";
import nodemailer from "nodemailer";

const MONGODB_URI = process.env.MONGODB_URI;
const client = new MongoClient(MONGODB_URI);
const dbName = "WatchReminder";
const collectionName = "reminders";

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
}

export async function GET() {
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
            $set: { reminderSent: true, reminderSentTime: new Date() },
          }
        );
      } catch (err) {
        console.error("Failed to send email", err);
      }
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error checking reminders:", error);
    return new Response(JSON.stringify({ success: false }), { status: 500 });
  }
}
