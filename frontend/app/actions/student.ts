'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const createStudent = async (formData: FormData): Promise<void> => {
  const token = (await cookies()).get('token')?.value;
  if (!token) {
    redirect('/login');
  }

  const student: Student = {
    name: formData.get('name') as string,
    grade: formData.get('grade') as string,
    phone: formData.get('phone') as string,
  };

  try {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/student/createStudent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(student),
    });
    redirect(`/manager/${student._id}`);
  } catch (error) {
    console.error('Error creating student:', error);
    return;
  }
};
