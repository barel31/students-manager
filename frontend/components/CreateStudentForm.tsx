'use client';
import { createStudent } from '@/actions/student';
import FormField from '@/components/ui/FormField';
import { useState } from 'react';
import { Button } from './ui/button';

export default function CreateStudent() {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <div className="m-5">
        <Button
          type="button"
          variant="secondary"
          onClick={() => setVisible(!visible)}>
          Create student
        </Button>
      </div>
      {visible && (
        <form
          className="flex flex-col gap-4 w-1/2 m-auto"
          action={createStudent}>
          <FormField name="name" label="Name" autoComplete="name" required />
          <FormField
            name="grade"
            label="Grade"
            type="text"
            autoComplete="off"
            required
          />
          <FormField
            name="phone"
            label="Phone"
            type="text"
            autoComplete="off"
            required
          />
          <Button type="submit">Create</Button>
        </form>
      )}
    </div>
  );
}
