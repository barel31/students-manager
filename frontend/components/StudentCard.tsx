'use client';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import DeleteStudentForm from './DeleteStudentForm';
import { Button } from './ui/button';
import { useActionState, useState } from 'react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';
import { Field, FieldGroup, FieldLabel } from './ui/field';
import { addAssignment } from '@/actions/assignment';
import Assignments from './Assignments';

export default function StudentCard(props: { student: Student }) {
  const [state, formAction, pending] = useActionState(addAssignment, {
    message: '',
  });
  const [assignmentForm, setAssignmentForm] = useState(false);

  const { student } = props;
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle className="text-xl">{student.name}</CardTitle>
          <CardDescription className="mt-1 text-sm">
            Grade: {student.grade} • Phone: {student.phone}
          </CardDescription>
        </div>

        <CardAction>
          <DeleteStudentForm student={student} />
        </CardAction>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-4">
          <Button
            type="button"
            variant="secondary"
            onClick={() => setAssignmentForm(!assignmentForm)}
            className="w-full sm:w-auto">
            {assignmentForm ? 'Close' : '+ Add assignment'}
          </Button>

          {assignmentForm && (
            <div className="rounded-xl border bg-slate-50 p-4 sm:p-5">
              <form action={formAction} className="grid gap-4 sm:grid-cols-3">
                <input type="hidden" name="studentId" value={student._id} />
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    name="name"
                    id="name"
                    type="text"
                    placeholder="Assignment name"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="dueDay">Due date</Label>
                  <Input
                    name="dueDay"
                    id="dueDay"
                    type="date"
                    placeholder="Select due date"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="score">Score</Label>
                  <Input
                    name="score"
                    id="score"
                    type="number"
                    placeholder="Assignment score"
                    required
                  />
                </div>

                <FieldGroup className="w-max">
                  <Field orientation="horizontal">
                    <FieldLabel htmlFor="status" className="text-nowrap">
                      Assignment finished?
                    </FieldLabel>
                    <Checkbox name="status" id="status" />
                  </Field>
                </FieldGroup>

                {state.message && (
                  <p className="text-sm text-red-500">{state.message}</p>
                )}

                <div className="sm:col-span-3 flex justify-end">
                  <Button type="submit" disabled={pending}>
                    Add assignment
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>

        <Assignments assignments={student?.assignments} />
      </CardContent>
    </Card>
  );
}
