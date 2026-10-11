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
    <main className="flex-1 text-slate-800 px-4 py-10 sm:px-6">
      <div className="m-20">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Degree</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {students?.map(student => (
              <TableRow key={student._id.toString()}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.grade}</TableCell>
                <TableCell>{student.phone}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Link href={`/manager/${student._id}`}>
                      <Button>View</Button>
                    </Link>

                    <DeleteStudentForm student={student} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <CreateStudent />
      </div>
    </main>
  );
}
