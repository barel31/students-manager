'use client';

import { useActionState } from 'react';
import { loginTeacher } from '@/actions/teacher';
import { Button } from './ui/button';

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(loginTeacher, {
    message: '',
  });

  return (
    <form className="flex flex-col gap-4" action={formAction}>
      <label className="grid gap-2 text-sm font-medium text-slate-700">
        Name
        <input
          name="name"
          autoComplete="name"
          required
          className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-500"
        />
      </label>

      <label className="grid gap-2 text-sm font-medium text-slate-700">
        Id
        <input
          name="id"
          autoComplete="off"
          required
          className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-500"
        />
      </label>

      {state.message && <p className="text-sm text-red-500">{state.message}</p>}

      <Button type="submit" disabled={pending}>
        {pending ? 'Logging in...' : 'Login'}
      </Button>
    </form>
  );
}
