const { MongoClient, ObjectId } = require("mongodb");
const nodemailer = require("nodemailer");
require("dotenv").config();

// MongoDB setup
const MONGODB_URI = process.env.MONGODB_URI;
const dbName = "WatchReminder";
const collectionName = "reminders";
const client = new MongoClient(MONGODB_URI);

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

// Check reminders and send emails
async function checkReminders() {
  try {
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
        console.error(`❌ Failed to send email to ${userEmail}`, err);
      }
    }
  } catch (err) {
    console.error("❌ Error checking reminders", err);
  }
}

// Start polling
async function startServer() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");
    await checkReminders(); // Run immediately
    setInterval(checkReminders, 5 * 60 * 1000); // Every 5 minutes
  } catch (err) {
    console.error("❌ MongoDB connection error", err);
  }
}

startServer();
