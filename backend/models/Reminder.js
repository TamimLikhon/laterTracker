// models/Reminder.ts
import mongoose, { models, model } from "mongoose";
import ReminderSchema from "../schema/userReminder";

const Reminder = models.Reminder || model("Reminder", ReminderSchema);
export default Reminder;
