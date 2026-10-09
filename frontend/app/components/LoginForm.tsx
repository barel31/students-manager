'use client';

import { loginTeacher } from '@/app/actions/teacher';
import Button from '@/app/ui/Button';
import FormField from '@/app/ui/FormField';

export default function LoginForm() {
  return (
    <form className="flex flex-col gap-4" action={loginTeacher}>
      <FormField name="name" label="Name" autoComplete="name" required />
      <FormField
        type="text"
        name="id"
        label="Id"
        autoComplete="off"
        required
      />
      <Button type="submit">
        Login
      </Button>
    </form>
  );
}
