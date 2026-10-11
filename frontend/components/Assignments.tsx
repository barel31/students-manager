import { useActionState } from 'react';
import { deleteAssignment, updateAssignment } from '@/actions/assignment';
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
import EditableCell from './EditableCell';

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
    <div className="overflow-hidden rounded-lg border">
      <Table className="min-w-[560px] table-fixed text-sm sm:min-w-0">
        <TableHeader>
          <TableRow>
            <TableHead className="px-2 py-2">Name</TableHead>
            <TableHead className="px-2 py-2">Due</TableHead>
            <TableHead className="px-2 py-2">Score</TableHead>
            <TableHead className="px-2 py-2">Status</TableHead>
            <TableHead className="px-2 py-2">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {assignments.map(assignment => (
            <TableRow key={assignment._id.toString()}>
              <TableCell className="px-2 py-2">
                <EditableCell
                  action={updateAssignment.bind(
                    null,
                    studentId,
                    assignment._id.toString(),
                    'name',
                  )}
                  field="name"
                  value={assignment.name}
                  type="text"
                />
              </TableCell>
              <TableCell className="px-2 py-2">
                <EditableCell
                  action={updateAssignment.bind(
                    null,
                    studentId,
                    assignment._id.toString(),
                    'dueDay',
                  )}
                  field="dueDay"
                  value={new Date(assignment.dueDay).toISOString().slice(0, 10)}
                  type="date"
                />
              </TableCell>
              <TableCell className="px-2 py-2">
                <EditableCell
                  action={updateAssignment.bind(
                    null,
                    studentId,
                    assignment._id.toString(),
                    'score',
                  )}
                  field="score"
                  value={String(assignment.score)}
                  type="number"
                />
              </TableCell>
              <TableCell className="px-2 py-2">
                <EditableCell
                  action={updateAssignment.bind(
                    null,
                    studentId,
                    assignment._id.toString(),
                    'status',
                  )}
                  field="status"
                  value={String(assignment.status)}
                  type="checkbox"
                  displayValue={assignment.status ? 'Finished' : 'Unfinished'}
                />
              </TableCell>
              <TableCell className="px-2 py-2">
                <form action={formAction}>
                  <input type="hidden" name="studentId" value={studentId} />
                  <input
                    type="hidden"
                    name="assignmentId"
                    value={assignment._id}
                  />
                  <Button
                    type="submit"
                    variant="destructive"
                    size="sm"
                    disabled={pending}
                    className="h-8 px-2.5 text-xs">
                    Delete
                  </Button>
                  {state.message && (
                    <p className="mt-2 text-xs text-red-500">{state.message}</p>
                  )}
                </form>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
