'use server';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export const loginTeacher = async (formData: FormData) => {
  let data;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.get('name'),
        id: formData.get('id'),
      }),
    });

    if (!response.ok) {
      return;
    }

    data = await response.json();
  } catch (error) {
    console.error('Error logging in:', error);
    return;
  }

  const cookieStore = await cookies();
  cookieStore.set('token', data.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });

  redirect('/manager');
};
