import Link from 'next/link';
import { getTeacher } from '../actions/teacher';
import { Button } from './ui/button';
import { logoutTeacher } from '../actions/teacher';

export default async function Navbar() {
  const teacher = await getTeacher();
  const teacherName = teacher ? teacher.name : 'Guest';

  return (
    <nav className="p-4 w-full h-full flex flex-col items-center justify-center">
      <div className="container mx-full flex items-center justify-between">
        <Link href="/" className="text-4xl font-bold">
          Students Manager
        </Link>
        <div className="flex justify-around w-1/5 align-middle">
          <p className="m-auto">Welcome, {teacherName}</p>
          {teacherName !== 'Guest' ? (
            <form action={logoutTeacher}>
              <Button type="submit">LOGOUT</Button>
            </form>
          ) : (
            <Link href="/login">
              <Button>LOGIN</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
