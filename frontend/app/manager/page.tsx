import { deleteStudent, fetchTeacherStudents } from '../actions/student';
import CreateStudent from '../components/CreateStudentForm';
import Button from '../ui/Button';
import LinkButton from '../ui/LinkButton';

export default async function Manager() {
  const students = await fetchTeacherStudents();

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
                <th scope="col" className="px-5 py-3 font-medium">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700 text-slate-50">
              {students?.map((student, index) => (
                <tr key={index} className="hover:bg-slate-900 cursor-pointer">
                  <td className="px-5 py-4">{student.name}</td>
                  <td className="px-5 py-4">{student.grade}</td>
                  <td className="px-5 py-4">{student.phone}</td>
                  <td className="px-5 py-4">
                    <LinkButton href={`/manager/${student._id}`}>
                      View
                    </LinkButton>
                    <form
                      action={deleteStudent.bind(
                        null,
                        student._id?.toString() ?? '',
                      )}>
                      <Button type="submit" variant="danger">
                        Delete
                      </Button>
                    </form>
                  </td>
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
