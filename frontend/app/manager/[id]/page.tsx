import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getToken } from '@/helpers/auth-sever';
import { redirect } from 'next/navigation';
import { fetchStudent } from '@/actions/student';
import StudentCard from '@/components/StudentCard';

export default async function StudentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const token = await getToken();

  if (!token) redirect('/login');

  const student = await fetchStudent(token, id);

  return (
    <main className="flex-1 px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-4xl space-y-4">
        <Link href="/manager">
          <Button className="h-9 m-4">← Back to students</Button>
        </Link>

        <StudentCard student={student} />
      </div>
    </main>
  );
}
