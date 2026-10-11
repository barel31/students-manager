import Link from 'next/link';
import { getTeacher } from '../actions/teacher';
import { Button } from './ui/button';
import { logoutTeacher } from '../actions/teacher';

export default async function Navbar() {
  const teacher = await getTeacher();
  const teacherName = teacher ? teacher.name : 'Guest';

  return (
    <nav className="border-b bg-white/90">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="text-xl font-bold sm:text-2xl">
          Students Manager
        </Link>

        <div className="flex items-center justify-between gap-3 sm:justify-end">
          <p className="text-sm text-slate-600">Welcome, {teacherName}</p>

          {teacherName !== 'Guest' ? (
            <form action={logoutTeacher}>
              <Button type="submit" className="h-9 px-3 text-sm">
                Logout
              </Button>
            </form>
          ) : (
            <Link href="/login">
              <Button className="h-9 px-3 text-sm">Login</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
