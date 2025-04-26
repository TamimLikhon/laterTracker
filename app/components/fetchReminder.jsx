"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function ReminderList() {
  const { data: session, status } = useSession();
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Don't shadow handleDelete
  const handleDelete = async (url) => {
    if (!session?.user?.email) return;

    try {
      const res = await fetch("/api/reminder/duserData", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session.user.email,
          url,
        }),
      });

      if (res.ok) {
        setReminders((prev) => prev.filter((r) => r.url !== url));
      } else {
        const data = await res.json();
        console.error("Delete failed:", data.message);
      }
    } catch (err) {
      console.error("Error deleting reminder:", err);
    }
  };

  useEffect(() => {
    if (status !== "authenticated" || !session?.user?.email) return;

    const fetchReminders = async () => {
      try {
        const res = await fetch(`/api/reminder/userData?email=${session.user.email}`);
        const data = await res.json();

        if (res.ok) {
          setReminders(data.reminders);
        } else {
          console.error("Error:", data.message);
        }
      } catch (err) {
        console.error("Error fetching reminders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReminders();
  }, [status, session]);

  if (loading) return <p>Loading reminders...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Reminders</h2>
      <ul className="space-y-4">
        {reminders.map((reminder, index) => (
          <li key={index} className="bg-gray-100 p-3 rounded-lg shadow">
            <p>
              <strong>URL:</strong>{" "}
              <a
                href={reminder.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {reminder.url}
              </a>
            </p>
            <p>
              <strong>Reminder Time:</strong>{" "}
              {new Date(reminder.reminderTime).toLocaleString()}
            </p>
            <button
              onClick={() => handleDelete(reminder.url)}
              className="text-red-500 mt-2"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
