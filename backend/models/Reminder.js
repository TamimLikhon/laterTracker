import mongoose from "mongoose";
import ReminderSchema from "../schema/userReminder";

const Reminder = mongoose.models.Reminder || mongoose.model("Reminder", ReminderSchema);
export default Reminder;
