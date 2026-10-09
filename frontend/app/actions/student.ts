'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getToken } from '../helpers/auth-sever';

export const deleteStudent = async (
  studentId: string,
  _formData: FormData,
): Promise<void> => {
  void _formData;
  const token = await getToken();
  if (!token) redirect('/login', 'push');

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/student/${encodeURIComponent(studentId)}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (!response.ok) throw new Error('Failed to delete student');
    revalidatePath('/manager');
  } catch (error) {
    console.error('Error deleting student:', error);
    throw error;
  }
};

export const createStudent = async (formData: FormData): Promise<void> => {
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
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/student/createStudent`,
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
  if (!token) return null;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/teacher/students`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error('Could not fetch students');
    }

    const data: { students?: Student[] } = await response.json();
    return data?.students;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};
