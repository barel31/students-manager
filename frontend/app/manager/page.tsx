'use client';

import { getUser } from '@/helpers/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Manager() {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const user = await getUser();
      if (!user) {
        console.log('not auth, redirected to /');
        router.push('/login');
      }
    })();
  }, [router]);
  return <div>manager</div>;
}
