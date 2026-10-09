'use client';

import Link from 'next/link';
import Button from '@/app/ui/Button';
import LinkButton from '@/app/ui/LinkButton';
import { getTeacher } from '../helpers/auth';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [userName, setUserName] = useState('Guest');

  useEffect(() => {
    (async () => {
      const newUser = await getTeacher();
      if (!newUser) return null;
      setUserName(newUser.name || 'No Name');
    })();
  }, []);

  return (
    <nav className="p-4 w-full h-full flex flex-col items-center justify-center">
      <div className="container mx-full flex items-center justify-between">
        <Link href="/" className="text-4xl font-bold">
          Students Manager
        </Link>
        <div className="flex justify-around w-1/5 align-middle">
          <p className="m-auto">Welcome, {userName}</p>
          {userName !== 'Guest' ? (
            <Button
              variant="danger"
              type="button"
              onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.reload();
              }}
            >
              LOGOUT
            </Button>
          ) : (
            <LinkButton href="/login" variant="primary">
              LOGIN
            </LinkButton>
          )}
        </div>
      </div>
    </nav>
  );
}
