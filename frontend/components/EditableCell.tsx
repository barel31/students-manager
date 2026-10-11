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
}: {
  action: EditableAction;
  field: string;
  value: string;
  type?: 'text' | 'date' | 'number' | 'checkbox';
  displayValue?: string;
}) {
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);
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

  const cancelEditing = () => {
    setInputValue(value);
    setEditing(false);
  };

  if (!editing) {
    return (
      <button
        type="button"
        className="min-h-8 w-full min-w-0 break-words rounded-sm text-left hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        onClick={() => {
          setInputValue(value);
          setEditing(true);
        }}
        aria-label={`Edit ${field}`}>
        {displayValue}
      </button>
    );
  }

  return (
    <form
      action={formAction}
      className="flex min-w-0 flex-wrap items-center gap-1">
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
            checked={inputValue === 'true'}
            onChange={event =>
              setInputValue(event.currentTarget.checked ? 'true' : 'false')
            }
            disabled={pending}
          />
        </>
      ) : (
        <Input
          autoFocus
          aria-label={`Edit ${field}`}
          className="h-8 px-2 w-30"
          type={type === 'date' || type === 'number' ? type : 'text'}
          name="value"
          value={inputValue}
          onChange={event => setInputValue(event.currentTarget.value)}
          required
          disabled={pending}
        />
      )}
      <Button type="submit" size="sm" className="h-8 px-2" disabled={pending}>
        Save
      </Button>
      <Button
        type="button"
        size="sm"
        variant="outline"
        className="h-8 px-2"
        onClick={cancelEditing}
        disabled={pending}>
        Cancel
      </Button>
      {state.message && (
        <span role="alert" className="basis-full text-xs text-destructive">
          {state.message}
        </span>
      )}
    </form>
  );
}
