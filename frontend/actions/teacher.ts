'use server';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { getToken } from '../helpers/auth-sever';
import { getBackendUrl } from '../lib/backend-url';

export const getTeacher = async () => {
  const token = await getToken();
  if (!token) return null;

  try {
    const response = await fetch(
      getBackendUrl('/api/auth/getTeacher'),
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
      },
    );

    if (!response.ok) {
      console.error('Error fetching teacher');
      return null;
    }

    const data: { teacher?: Teacher } = await response.json();
    return data?.teacher ?? null;
  } catch (error) {
    console.error('Error fetching teacher:', error);
    return null;
  }
};

export const loginTeacher = async (
  _previousState: { message: string | null },
  formData: FormData,
) => {
  let token: string;
  try {
    const response = await fetch(getBackendUrl('/api/auth/login'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.get('name'),
        id: formData.get('id'),
      }),
    });

    if (response.status === 401) {
      return { message: 'Invalid name or ID.' };
    }

    if (!response.ok) {
      return { message: 'Invalid name or ID.' };
    }

    const data = await response.json();
    token = data.token;
  } catch (error) {
    console.error('Error logging in:', error);
    return { message: 'Unable to connect. Please try again.' };
  }

  const cookieStore = await cookies();
  cookieStore.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });

  redirect('/manager', 'push');
};

export const logoutTeacher = async () => {
  const cookieStore = await cookies();
  cookieStore.delete('token');
  redirect('/login', 'push');
};
