import { MongoClient, ObjectId } from "mongodb";
import nodemailer from "nodemailer";
import { NextResponse } from 'next/server';

// MongoDB setup
const MONGODB_URI = process.env.MONGODB_URI;
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

// Email sender function
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

export async function POST(request) {
  const body = await request.json();
  
  // Verify a secret key to prevent unauthorized access
  if (body.secretKey !== process.env.CRON_SECRET_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const now = new Date();
    const reminders = await collection
      .find({ reminderTime: { $lte: now }, reminderSent: false })
      .toArray();

    const results = [];
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
        results.push({ email: userEmail, status: 'sent' });
      } catch (err) {
        console.error(`❌ Failed to send email to ${userEmail}`, err);
        results.push({ email: userEmail, status: 'failed', error: err.message });
      }
    }

    await client.close();
    
    return NextResponse.json({ 
      processed: reminders.length,
      results 
    });
  } catch (err) {
    console.error("❌ Error checking reminders", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}