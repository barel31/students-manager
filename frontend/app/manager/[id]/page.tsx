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
    <main>
      <div className="mx-auto max-w-3xl">
        <div className="mb-6">
          <Link href="/manager">
            <Button>← Back to students</Button>
          </Link>
        </div>

        <StudentCard student={student} />
      </div>
    </main>
  );
}
