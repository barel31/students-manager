import { getToken } from '@/app/helpers/auth-sever';
import { notFound, redirect } from 'next/navigation';
import Card from '@/app/ui/Card';
import DetailItem from '@/app/ui/DetailItem';
import LinkButton from '@/app/ui/LinkButton';

export default async function StudentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const token = await getToken();

  if (!token) redirect('/login');

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/student/${id}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  if (response.status === 404) notFound();
  if (!response.ok) throw new Error('Failed to fetch student');

  const { student }: { student: Student } = await response.json();

  return (
    <main className="flex-1 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6">
          <LinkButton href="/manager">
            <span aria-hidden="true">←</span>
            Back to students
          </LinkButton>
        </div>
        <Card>
          <h1 className="text-3xl font-bold text-slate-50">{student.name}</h1>
          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            <DetailItem label="Grade" value={student.grade} />
            <DetailItem label="Phone" value={student.phone} />
          </dl>
        </Card>
      </div>
    </main>
  );
}
