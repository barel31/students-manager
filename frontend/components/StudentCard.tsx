'use client';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
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
import { addAssignment } from '@/actions/student';
import Assignments from './Assignments';

export default function StudentCard(props: { student: Student }) {
  const [state, formAction, pending] = useActionState(addAssignment, {
    message: '',
  });
  const [assignmentForm, setAssignmentForm] = useState(false);

  const { student } = props;
  return (
    <Card>
      <CardHeader>
        <CardTitle>{student.name}</CardTitle>
        <CardDescription>
          Grade: {student.grade} Phone: {student.phone}
        </CardDescription>
        <CardAction>
          <DeleteStudentForm student={student} />
        </CardAction>
      </CardHeader>
      <CardContent>
        {assignmentForm ? (
          <Card>
            <CardHeader>
              <CardTitle>
                Add assignment to Student
                <CardDescription>{student.name}</CardDescription>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form action={formAction}>
                <input type="hidden" name="studentId" value={student._id} />
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      name="name"
                      id="name"
                      type="text"
                      placeholder="Assignment name"
                      required
                    />
                    <Label htmlFor="dueDay">Due date</Label>
                    <Input name="dueDay" id="dueDay" type="date" required />
                    <Label htmlFor="score">Score</Label>
                    <Input
                      name="score"
                      id="score"
                      type="number"
                      placeholder="Assignment score"
                      required
                    />
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

                    <Button type="submit" disabled={pending}>
                      Add assignment
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button type="button" onClick={() => setAssignmentForm(false)}>
                Close
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <Button type="button" onClick={() => setAssignmentForm(true)}>
            Add assignment
          </Button>
        )}
        <Assignments assignments={student?.assignments} />
      </CardContent>
    </Card>
  );
}
