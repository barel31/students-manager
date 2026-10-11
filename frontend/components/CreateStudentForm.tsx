'use client';
import { createStudent } from '@/actions/student';
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

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
          <form action={createStudent} className="grid gap-4 sm:grid-cols-3">
            <div className="grid gap-2">
              <Label htmlFor="student-name">Name</Label>
              <Input
                id="student-name"
                name="name"
                placeholder="Enter student name"
                autoComplete="name"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="student-grade">Grade</Label>
              <Input
                id="student-grade"
                name="grade"
                type="text"
                placeholder="e.g. Grade 10"
                autoComplete="off"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="student-phone">Phone</Label>
              <Input
                id="student-phone"
                name="phone"
                type="text"
                placeholder="e.g. 050-123-4567"
                autoComplete="off"
                required
              />
            </div>

            <div className="sm:col-span-3 flex justify-end">
              <Button type="submit">Create student</Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
