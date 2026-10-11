'use client';
import { deleteStudent } from '@/actions/student';
import { Button } from './ui/button';
import { useActionState } from 'react';

export default function DeleteStudentForm(props: { student: Student }) {
  const [state, formAction, pending] = useActionState(deleteStudent, {
    message: '',
  });

  return (
    <form action={formAction}>
      <input
        type="hidden"
        name="studentId"
        value={props.student._id.toString()}
      />
      <Button type="submit" variant="destructive" disabled={pending}>
        {pending ? 'Deleting...' : 'Delete'}
      </Button>
      {state.message && (
        <span role="alert" className="text-xs text-destructive">
          {state.message}
        </span>
      )}
    </form>
  );
}
