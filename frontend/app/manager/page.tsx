'use client';

import CreateStudent from '../components/CreateStudentForm';
import { getTeacher } from '../helpers/auth';
import { fetchTeacherStudents } from '../helpers/students';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const studentsPlaceholder = [
  { name: 'yossi', grade: '2', phone: '0501234567' },
  { name: 'menash', grade: '3', phone: '1232154124' },
];

export default function Manager() {
  const [students, setStudents] = useState<Student[]>(studentsPlaceholder);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const fetched = await fetchTeacherStudents();
      if (!fetched) return;
      setStudents(fetched);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const user = await getTeacher();
      if (!user) router.push('/login');
    })();
  }, [router]);

  return (
    <main className="flex-1 text-slate-50 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-6 text-2xl font-semibold text-slate-50">
          Students List
        </h1>
        <div className="overflow-x-auto rounded-lg border border-slate-700">
          <table className="w-full min-w-120 text-left text-sm">
            <thead className="bg-slate-950 text-slate-100">
              <tr>
                <th scope="col" className="px-5 py-3 font-medium">
                  Name
                </th>
                <th scope="col" className="px-5 py-3 font-medium">
                  Degree
                </th>
                <th scope="col" className="px-5 py-3 font-medium">
                  Phone
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700 text-slate-50">
              {students.map((student, index) => (
                <tr key={index} className="hover:bg-slate-900">
                  <td className="px-5 py-4 capitalize">{student.name}</td>
                  <td className="px-5 py-4">{student.grade}</td>
                  <td className="px-5 py-4">{student.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <CreateStudent />
      </div>
    </main>
  );
}
