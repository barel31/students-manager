'use client';

import { useActionState, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from './ui/button';

type EditableAction = (
  previousState: { message: string; saved?: boolean },
  formData: FormData,
) => Promise<{ message: string; saved?: boolean }>;

export default function EditableCell({
  action,
  field,
  value,
  type,
  displayValue = value,
  required = true,
}: {
  action: EditableAction;
  field: string;
  value: string;
  type?: 'text' | 'date' | 'number' | 'checkbox';
  displayValue?: string;
  required?: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [state, formAction, pending] = useActionState(
    async (
      previousState: { message: string; saved?: boolean },
      formData: FormData,
    ) => {
      const nextState = await action(previousState, formData);
      if (nextState.saved) setEditing(false);
      return nextState;
    },
    { message: '', saved: false },
  );

  if (!editing) {
    return (
      <button
        type="button"
        className="min-h-8 w-full min-w-0 rounded-sm hover:underline text-left"
        onClick={() => setEditing(true)}
        aria-label={`Edit ${field}`}>
        {displayValue}
      </button>
    );
  }

  return (
    <form
      action={formAction}
      className="flex w-full min-w-0 flex-wrap items-center gap-1">
      {type === 'checkbox' ? (
        <>
          <input type="hidden" name="value" value="false" />
          <Input
            autoFocus
            aria-label="Assignment finished"
            className="size-4 accent-primary"
            type="checkbox"
            name="value"
            value="true"
            defaultChecked={value === 'true'}
            disabled={pending}
          />
        </>
      ) : (
        <Input
          autoFocus
          aria-label={`Edit ${field}`}
          className="h-8 w-30 max-w-full px-2"
          type={type}
          name="value"
          defaultValue={value}
          required={required}
          disabled={pending}
        />
      )}
      <div className="flex max-w-full flex-wrap gap-1">
        <Button type="submit" size="sm" className="h-8 px-2" disabled={pending}>
          Save
        </Button>
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="h-8 px-2"
          onClick={() => setEditing(false)}
          disabled={pending}>
          Cancel
        </Button>
      </div>
      {state.message && (
        <span role="alert" className="basis-full text-xs text-destructive">
          {state.message}
        </span>
      )}
    </form>
  );
}
