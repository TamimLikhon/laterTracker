import { Schema } from "mongoose";

const ReminderSchema = new Schema({
  url: String,
  reminderTime: Date,
  userEmail: String,
  sessionId: String,
  createdAt: { type: Date, default: Date.now },
  Emailsend: { type: Boolean, default: false },
  reminderSent: { type: Boolean, default: false },
  reminderSentTime: { type: Date, default: null },
  FollowupEmail: { type: Boolean, default: false },
  FollowupEmailSent: { type: Boolean, default: false },
  FollowupEmailTime: { type: Date, default: null },
  watched: { type: Boolean, default: false },
});

export default ReminderSchema;
