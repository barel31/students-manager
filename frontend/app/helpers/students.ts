import { getToken } from './auth-sever';

export const fetchTeacherStudents = async () => {
  if (typeof window === 'undefined') {
    return null;
  }

  const token = await getToken();
  if (!token) {
    return null;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/students/fetchTeacherStudents`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await response.json();
    return (data?.students as Student[]) || null;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};
