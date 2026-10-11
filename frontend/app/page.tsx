import { redirect } from 'next/navigation';
import { verifyToken } from '../helpers/auth';

export default async function Home() {
  if (await verifyToken()) {
    redirect('/manager');
  }

  redirect('/login');
}
