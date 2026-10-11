'use server';
import { notFound, redirect } from 'next/navigation';
import { getToken } from '../helpers/auth-sever';
import { refresh } from 'next/cache';
import { getBackendUrl } from '../lib/backend-url';

export const deleteStudent = async (
  _previousState: { message: string },
  formData: FormData,
) => {
  const token = await getToken();
  if (!token) redirect('/login', 'push');

  const studentId = formData.get('studentId');
  if (typeof studentId !== 'string' || !studentId.trim()) {
    return { message: 'Missing or invalid student ID' };
  }

  try {
    const response = await fetch(
      getBackendUrl(`/api/student/${studentId}`),
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (!response.ok) {
      console.error(
        `Error deleting student: backend returned HTTP ${response.status}`,
      );
      return { message: 'Unable to connect. Please try again.' };
    }
  } catch (error) {
    console.error('Error deleting student:', error);
    return { message: 'Unable to connect. Please try again.' };
  }

  redirect('/manager');
};

export const updateStudent = async (
  studentId: string,
  field: string,
  _previousState: { message: string; saved?: boolean },
  formData: FormData,
) => {
  const token = await getToken();
  if (!token) redirect('/login', 'push');

  const value = formData.get('value');
  if (!studentId.trim() || typeof value !== 'string' || !value.trim()) {
    return { message: 'Enter a valid value' };
  }

  try {
    const response = await fetch(
      getBackendUrl(`/api/student/${studentId}`),
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
        `Error updating student: backend returned HTTP ${response.status}`,
      );
      return {
        message: `Unable to update student (server error ${response.status}).`,
      };
    }

    refresh();
    return { message: '', saved: true };
  } catch (error) {
    console.error('Error updating student:', error);
    return { message: 'Unable to connect. Please try again.' };
  }
};

export const createStudent = async (formData: FormData) => {
  const token = await getToken();
  if (!token) redirect('/login', 'push');

  const student: Student = {
    name: formData.get('name') as string,
    grade: formData.get('grade') as string,
    phone: formData.get('phone') as string,
  };

  let createdStudent: Student;

  try {
    const response = await fetch(
      getBackendUrl('/api/student/student'),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ student }),
      },
    );
    const result = await response.json();
    createdStudent = result.student;
  } catch (error) {
    console.error('Error creating student:', error);
    return;
  }
  redirect(`/manager/${createdStudent._id}`, 'push');
};

export const fetchTeacherStudents = async () => {
  const token = await getToken();
  if (!token) redirect('/login', 'push');

  try {
    const response = await fetch(
      getBackendUrl('/api/teacher/students'),
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      throw `Could not fetch students (HTTP ${response.status} ${response.statusText})`;
    }

    const data: { students?: Student[] } = await response.json();
    return data?.students;
  } catch (error) {
    console.error('Error fetching students:', error);
    return null;
  }
};

export const fetchStudent = async (teacherToken: string, studentId: string) => {
  const response = await fetch(
    getBackendUrl(`/api/student/${studentId}`),
    {
      headers: { Authorization: `Bearer ${teacherToken}` },
    },
  );

  if (response.status === 404) notFound();
  if (!response.ok) throw new Error('Failed to fetch student');

  const { student }: { student: Student } = await response.json();
  return student;
};
