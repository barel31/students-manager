import { useActionState } from 'react';
import { deleteAssignment } from '@/actions/student';
import { useParams } from 'next/navigation';

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from './ui/button';

export default function Assignments(props: { assignments?: Assignment[] }) {
  const { assignments } = props;
  const [state, formAction, pending] = useActionState(deleteAssignment, {
    message: '',
  });

  const params = useParams();

  const studentId = params.id as string;

  if (!assignments?.length) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon"></EmptyMedia>
          <EmptyTitle>No Assignments Yet</EmptyTitle>
          <EmptyDescription>
            You haven&apos;t created any assignments yet. Get started by
            creating first assignment.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Duo day</TableHead>
          <TableHead>Score</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {assignments.map((assignment, index) => (
          <TableRow key={index}>
            <TableCell>{assignment.name}</TableCell>
            <TableCell>
              {new Date(assignment.dueDay).toISOString().slice(0, 10)}
            </TableCell>
            <TableCell>{assignment.score}</TableCell>
            <TableCell>
              Status: {assignment.status ? 'Finished' : 'Unfinished'}
            </TableCell>
            <TableCell>
              <form action={formAction}>
                <input type="hidden" name="studentId" value={studentId} />
                <input
                  type="hidden"
                  name="assignmentId"
                  value={assignment._id}
                />
                <Button type="submit" variant="destructive" disabled={pending}>
                  Delete
                </Button>
                {state.message && (
                  <p className="mt-2 text-sm text-red-500">{state.message}</p>
                )}
              </form>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
