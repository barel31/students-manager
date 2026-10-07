'use client';

import Link from 'next/link';
import { getUser } from '@/helpers/auth';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [userName, setUserName] = useState('');

  const checkUser = async () => {
    const user = await getUser();
    console.log({ user });
  };

  useEffect(() => {
    (async () => {
      const newUser = await getUser();
      if (!newUser) return null;
      setUserName(newUser.name || '');
    })();
  }, []);

  return (
    <nav className="bg-white text-white p-4 w-full h-full flex items-center justify-center dark:bg-black">
      <div className="container mx-auto">
        <Link href="/" className="text-4xl font-bold">
          Students Manager
        </Link>
        <div>
          <p>Welcome, {userName}</p>
          <button onClick={checkUser}>check user</button>
        </div>
      </div>
    </nav>
  );
}
