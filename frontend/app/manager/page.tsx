import Link from 'next/link';
import { redirect } from 'next/navigation';
import CreateStudent from '../../components/CreateStudentForm';
import { Button } from '@/components/ui/button';
import { fetchTeacherStudents } from '../../actions/student';
import { updateStudent } from '@/actions/student';
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
import EditableCell from '@/components/EditableCell';

export default async function Manager() {
  const token = await getToken();
  if (!token) redirect('/login');

  const students = await fetchTeacherStudents();

  return (
    <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="space-y-3 sm:hidden">
          {students?.map(student => (
            <article
              key={student._id.toString()}
              className="space-y-3 rounded-xl border bg-white p-3 shadow-sm">
              {(
                [
                  ['Name', 'name', student.name],
                  ['Grade', 'grade', student.grade],
                  ['Phone', 'phone', student.phone],
                ] as const
              ).map(([label, field, value]) => (
                <div
                  key={field}
                  className="grid grid-cols-[4rem_minmax(0,1fr)] items-center gap-2">
                  <span className="text-sm text-muted-foreground">{label}</span>
                  <EditableCell
                    action={updateStudent.bind(
                      null,
                      student._id.toString(),
                      field,
                    )}
                    field={field}
                    value={value}
                  />
                </div>
              ))}
              <div className="flex flex-wrap gap-2 border-t pt-3">
                <Link href={`/manager/${student._id}`}>
                  <Button className="h-8 px-2.5">View</Button>
                </Link>
                <DeleteStudentForm student={student} />
              </div>
            </article>
          ))}
        </div>

        <div className="hidden overflow-hidden rounded-xl border bg-white shadow-sm sm:block">
          <Table className="w-full text-sm">
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
                  <TableCell className="px-2 py-2">
                    <EditableCell
                      action={updateStudent.bind(
                        null,
                        student._id.toString(),
                        'name',
                      )}
                      field="name"
                      value={student.name}
                    />
                  </TableCell>
                  <TableCell className="px-2 py-2">
                    <EditableCell
                      action={updateStudent.bind(
                        null,
                        student._id.toString(),
                        'grade',
                      )}
                      field="grade"
                      value={student.grade}
                    />
                  </TableCell>
                  <TableCell className="px-2 py-2">
                    <EditableCell
                      action={updateStudent.bind(
                        null,
                        student._id.toString(),
                        'phone',
                      )}
                      field="phone"
                      value={student.phone}
                    />
                  </TableCell>
                  <TableCell className="px-2 py-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <Link href={`/manager/${student._id}`}>
                        <Button className="h-8 px-2.5">View</Button>
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
