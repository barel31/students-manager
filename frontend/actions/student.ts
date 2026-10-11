'use server';
import { notFound, redirect } from 'next/navigation';
import { getToken } from '../helpers/auth-sever';
import { refresh } from 'next/cache';

export const deleteStudent = async (formData: FormData) => {
  const token = await getToken();
  if (!token) redirect('/login', 'push');

  const studentId = formData.get('studentId');
  if (typeof studentId !== 'string' || !studentId.trim()) {
    throw new Error('Missing or invalid student ID');
  }

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/student/${studentId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (!response.ok) throw 'Failed to delete student';
    redirect('/manager');
  } catch (error) {
    console.error('Error deleting student:', error);
    throw error;
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
      `${process.env.BACKEND_URL}/api/student/student`,
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
      `${process.env.BACKEND_URL}/api/teacher/students`,
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
    `${process.env.BACKEND_URL}/api/student/${studentId}`,
    {
      headers: { Authorization: `Bearer ${teacherToken}` },
    },
  );

  if (response.status === 404) notFound();
  if (!response.ok) throw new Error('Failed to fetch student');

  const { student }: { student: Student } = await response.json();
  return student;
};

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
    response = await fetch(
      `${process.env.BACKEND_URL}/api/student/${studentId}/assignment`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ assignment }),
      },
    );
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
      `${process.env.BACKEND_URL}/api/student/${studentId}/assignment`,
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
