import { getToken } from './auth-sever';

export async function verifyToken() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: getToken() }),
    });

    const data = await response.json();
    if (data) {
      console.log('Token verification:', data);
      return data;
    }
  } catch (error) {
    console.error('Error verifying token:', error);
  }
}

export async function getTeacher() {
  if (typeof window === 'undefined') {
    return;
  }

  const token = await getToken();
  if (!token) {
    return;
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/getTeacher`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    });

    const data = await response.json();
    return (data?.teacher as Teacher) || null;
  } catch (error) {
    console.error('Error fetching user:', error);
    return;
  }
}
