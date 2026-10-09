'use client';

import { verifyToken } from './helpers/auth';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';

export default function Home() {
  useEffect(() => {
    (async () => {
      const token = await verifyToken();
      if (!token) {
        redirect('/login', 'push');
      } else redirect('/manager', 'push');
    })();
  });

  return (
    <main className="flex font-sans">
      <div className="flex m-5 ">
        <h1 className="text-3xl">Student Manager</h1>
      </div>
    </main>
  );
}
