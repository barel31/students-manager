import Link from 'next/link';
import { redirect } from 'next/navigation';
import CreateStudent from '../../components/CreateStudentForm';
import { Button } from '@/components/ui/button';
import { fetchTeacherStudents } from '../../actions/student';
import { getToken } from '@/helpers/auth-sever';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import DeleteStudentForm from '../../components/DeleteStudentForm';

export default async function Manager() {
  const token = await getToken();
  if (!token) redirect('/login');

  const students = await fetchTeacherStudents();

  return (
    <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
          <Table className="min-w-[560px] text-sm sm:min-w-0">
            <TableHeader>
              <TableRow>
                <TableHead className="px-2 py-2">Name</TableHead>
                <TableHead className="px-2 py-2">Degree</TableHead>
                <TableHead className="px-2 py-2">Phone</TableHead>
                <TableHead className="px-2 py-2">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {students?.map(student => (
                <TableRow key={student._id.toString()}>
                  <TableCell className="px-2 py-2">{student.name}</TableCell>
                  <TableCell className="px-2 py-2">{student.grade}</TableCell>
                  <TableCell className="px-2 py-2">{student.phone}</TableCell>
                  <TableCell className="px-2 py-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <Link href={`/manager/${student._id}`}>
                        <Button className="h-8 px-2.5 text-xs">View</Button>
                      </Link>

                      <DeleteStudentForm student={student} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <CreateStudent />
      </div>
    </main>
  );
}
