'use client';

import Link from 'next/link';
import { getUser } from '@/helpers/auth';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [userName, setUserName] = useState('Guest');

  useEffect(() => {
    (async () => {
      const newUser = await getUser();
      if (!newUser) return null;
      setUserName(newUser.name || 'No Name');
    })();
  }, []);

  return (
    <nav className="bg-white text-white p-4 w-full h-full flex flex-col items-center justify-center dark:bg-black ">
      <div className="container mx-full flex items-center justify-between">
        <Link href="/" className="text-4xl font-bold">
          Students Manager
        </Link>
        <div>
          <p>Welcome, {userName}</p>
        </div>
        <div>
          {userName !== 'Guest' ? (
            <button
              onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.reload();
              }}
              className="cursor-pointer px-4 py-2 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
              LOGOUT
            </button>
          ) : (
            <Link
              href="/login"
              className="cursor-pointer px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
              LOGIN
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
