'use client';

import { useActionState } from 'react';
import { loginTeacher } from '@/actions/teacher';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(loginTeacher, {
    message: '',
  });

  return (
    <form className="flex flex-col gap-4" action={formAction}>
      <Label htmlFor="teacher-name">Name</Label>
      <Input
        id="teacher-name"
        name="name"
        placeholder="Enter your name"
        autoComplete="name"
        required
      />

        <Label htmlFor="teacher-id">Id</Label>
        <Input
          id="teacher-id"
          name="id"
          placeholder="Enter your ID"
          autoComplete="off"
          required
        />

      {state.message && <p className="text-sm text-red-500">{state.message}</p>}

      <Button type="submit" disabled={pending}>
        {pending ? 'Logging in...' : 'Login'}
      </Button>
    </form>
  );
}
