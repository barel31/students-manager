'use server';
import { redirect } from 'next/navigation';
import { getToken } from '../helpers/auth-sever';
import { refresh } from 'next/cache';
import { getBackendUrl } from '../lib/backend-url';

export const addAssignment = async (
  _previousState: { message: string | null },
  formData: FormData,
) => {
  const token = await getToken();
  if (!token) redirect('/login', 'push');

  const assignment: Assignment = {
    name: formData.get('name') as string,
    dueDay: new Date(formData.get('dueDay') as string),
    score: Number(formData.get('score')),
    status: Boolean(formData.get('status')),
  };

  const studentId = formData.get('studentId') as string;
  let response: Response;
  try {
    response = await fetch(getBackendUrl(`/api/assignment/${studentId}/`), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ assignment }),
    });
  } catch (error) {
    console.error('Unable to connect while adding assignment:', error);
    return { message: 'Unable to connect. Please try again.' };
  }

  if (!response.ok) {
    console.error(
      `Error adding assignment: backend returned HTTP ${response.status} ${response.statusText}`,
    );
    return {
      message: `Unable to add assignment (server error ${response.status}).`,
    };
  }

  refresh();
  return { message: '' };
};

export const deleteAssignment = async (
  _previousState: { message: string },
  formData: FormData,
) => {
  const token = await getToken();
  if (!token) redirect('/login', 'push');

  const studentId = formData.get('studentId') as string;
  const assignmentId = formData.get('assignmentId') as string;

  if (!studentId?.trim() || !assignmentId?.trim()) {
    return { message: 'Missing or invalid assignment data' };
  }

  try {
    const response = await fetch(
      getBackendUrl(`/api/assignment/${studentId}/`),
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ assignmentId }),
      },
    );

    if (!response.ok) {
      return {
        message: `Unable to delete assignment (server error ${response.status}).`,
      };
    }

    refresh();
    return { message: '' };
  } catch (error) {
    console.error('Error deleting assignment:', error);
    return { message: 'Unable to connect. Please try again.' };
  }
};

export const updateAssignment = async (
  studentId: string,
  assignmentId: string,
  field: string,
  _previousState: { message: string; saved?: boolean },
  formData: FormData,
) => {
  const token = await getToken();
  if (!token) redirect('/login', 'push');

  if (!studentId.trim() || !assignmentId.trim()) {
    return { message: 'Missing or invalid assignment data' };
  }

  const values = formData.getAll('value');
  const value = field === 'status' ? values.includes('true') : values[0];
  if (typeof value !== 'string' && typeof value !== 'boolean') {
    return { message: 'Invalid assignment value' };
  }

  try {
    const response = await fetch(
      getBackendUrl(`/api/assignment/${studentId}/${assignmentId}`),
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ field, value }),
      },
    );

    if (!response.ok) {
      console.error(
        `Error updating assignment: backend returned HTTP ${response.status} ${response.statusText}`,
      );
      return {
        message: `Unable to update assignment (server error ${response.status}).`,
      };
    }

    refresh();
    return { message: '', saved: true };
  } catch (error) {
    console.error('Error updating assignment:', error);
    return { message: 'Unable to connect. Please try again.' };
  }
};
