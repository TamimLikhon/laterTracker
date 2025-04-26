'use client';
import { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { v4 as uuidv4 } from 'uuid';
export default function ReminderForm() {
    const { data: session } = useSession();
  const [url, setUrl] = useState('');
  const [reminderTime, setReminderTime] = useState('');
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    let sessionId = sessionStorage.getItem('sessionId');
    if (!sessionId) {
      sessionId = uuidv4();
      sessionStorage.setItem('sessionId', sessionId);
    }

    if (!url || !reminderTime) {
        setMessage("Please fill out all fields.");
        return;
      } else if (!session) {
        setMessage("Please sign in to save your reminder.");
        signIn();
        return;
      }
      

    try {
      const res = await fetch('/api/reminder/userData', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, reminderTime, userEmail: session.user.email, sessionId }),
      });

      if (res.ok) {
        setMessage('Reminder saved!');
        setUrl('');
        setReminderTime('');
      } else {
        setMessage('Failed to save reminder.');
      }
    } catch (err) {
      console.error(err);
      setMessage('Something went wrong.');
    }
  };

  return (
    <div className="bg-white relative isolate px-6 pt-14 lg:px-8">
      {/* Background blur shapes */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-xl py-20 sm:py-32">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900">Set a Reminder</h2>
          <p className="mt-4 text-lg text-gray-600">Paste the video link and pick when to be reminded.</p>
        </div>

        <div className="mt-10 space-y-6">
          <textarea
            className="w-full rounded-lg border border-gray-300 p-4 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="Paste YouTube video URL..."
            rows={2}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <input
            type="datetime-local"
            className="w-full rounded-lg border border-gray-300 p-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            value={reminderTime}
            onChange={(e) => setReminderTime(e.target.value)}
          />
          <button
            onClick={handleSubmit}
            className="w-full rounded-md bg-indigo-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
            <p className="text-sm text-pretty font-bold text-black text-center">We suggest you to signin before proceeding </p>
        </div>
        {message && (
  <p className="mt-2 text-sm text-red-600">
    {message}
  </p>
)}

      </div>

      {/* Bottom blur shape */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
        />
      </div>
    </div>
  );
}
