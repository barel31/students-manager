import { deleteStudent } from '@/actions/student';
import { Button } from './ui/button';

export default function DeleteStudentForm(props: { student: Student }) {
  return (
    <form action={deleteStudent}>
      <input
        type="hidden"
        name="studentId"
        value={props.student._id.toString()}
      />
      <Button type="submit" variant="destructive">
        Delete
      </Button>
    </form>
  );
}
