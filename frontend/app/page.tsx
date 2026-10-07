'use client';

import Link from 'next/link';

export default function Home() {
  const checkServerStatus = () => {
    fetch('/api/status')
      .then(response => response.json())
      .then(data => console.log('Server status:', data))
      .catch(error => console.error('Error checking server status:', error));
  };

  const verifyToken = () => {
    fetch('/api/auth/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: localStorage.getItem('token') }),
    })
      .then(response => response.json())
      .then(data => console.log('Token verification:', data))
      .catch(error => console.error('Error verifying token:', error));
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="text-3xl font-bold">Students Manager</h1>
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Welcome to Students Manager, a simple app to manage your students.
          </h1>
          <p className="max-w-xs text-lg leading-7 text-black/70 dark:text-zinc-400">
            This app is built with Next.js, Tailwind CSS, and TypeScript in the
            frontend, Node.js, Express.js in the backend and MongoDB as the
            database. It has a simple app to manage your students.
          </p>
        </div>
        <div className="mt-10 flex items-center gap-4">
          <Link
            href="/login"
            className="px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            LOGIN
          </Link>
          <button
            onClick={checkServerStatus}
            className="px-4 py-2 bg-green-500 text-white font-medium rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
            SERVER STATUS
          </button>
          <button
            onClick={verifyToken}
            className="px-4 py-2 bg-purple-500 text-white font-medium rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500">
            VERIFY TOKEN
          </button>
          <button
            onClick={() => localStorage.removeItem('token')}
            className="px-4 py-2 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
            LOGOUT
          </button>
        </div>
      </main>
    </div>
  );
}
