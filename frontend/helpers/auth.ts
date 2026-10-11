import { getToken } from './auth-sever';
import { getBackendUrl } from '../lib/backend-url';

export async function verifyToken() {
  const token = await getToken();
  if (!token) {
    return false;
  }

  try {
    const response = await fetch(getBackendUrl('/api/auth/verify'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      console.error(
        `Error verifying token (HTTP ${response.status} ${response.statusText})`,
      );
      return false;
    }

    const data: { valid?: boolean } = await response.json();
    return data.valid === true;
  } catch (error) {
    console.error('Error verifying token:', error);
    return false;
  }
}

export async function getTeacher() {
  const token = await getToken();
  if (!token) {
    return null;
  }

  try {
    const response = await fetch(
      getBackendUrl('/api/auth/getTeacher'),
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await response.json();
    return (data?.teacher as Teacher) || null;
  } catch (error) {
    console.error('Error fetching teacher:', error);
    return null;
  }
}
