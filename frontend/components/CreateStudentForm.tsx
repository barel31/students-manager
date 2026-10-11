'use client';
import { createStudent } from '@/actions/student';
import { useState } from 'react';
import { Button } from './ui/button';

export default function CreateStudent() {
  const [visible, setVisible] = useState(false);

  return (
    <div className="space-y-4">
      <Button
        type="button"
        variant="secondary"
        onClick={() => setVisible(!visible)}
        className="w-full sm:w-auto">
        {visible ? 'Close' : '+ Add student'}
      </Button>

      {visible && (
        <div className="rounded-xl border bg-slate-50 p-4 sm:p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold">New student</h2>
            <Button type="button" variant="outline" onClick={() => setVisible(false)}>
              Cancel
            </Button>
          </div>

          <form action={createStudent} className="grid gap-4 sm:grid-cols-3">
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
              Grade
              <input
                name="grade"
                type="text"
                autoComplete="off"
                required
                className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-500"
              />
            </label>

            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Phone
              <input
                name="phone"
                type="text"
                autoComplete="off"
                required
                className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-500"
              />
            </label>

            <div className="sm:col-span-3 flex justify-end">
              <Button type="submit">Create student</Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
