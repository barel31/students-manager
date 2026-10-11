'use client';

import { useActionState } from 'react';
import { loginTeacher } from '@/actions/teacher';
import FormField from '@/components/ui/FormField';
import { Button } from './ui/button';

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(loginTeacher, {
    message: '',
  });

  return (
    <form className="flex flex-col gap-4" action={formAction}>
      <FormField name="name" label="Name" autoComplete="name" required />
      <FormField name="id" label="Id" autoComplete="off" required />

      {state.message && <p className="text-sm text-red-500">{state.message}</p>}

      <Button type="submit" disabled={pending}>
        {pending ? 'Logging in...' : 'Login'}
      </Button>
    </form>
  );
}
