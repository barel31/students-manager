export const verifyToken = async () => {
  try {
    const response = await fetch('/api/auth/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: localStorage.getItem('token') }),
    });

    const data = await response.json();
    if (data) {
      console.log('Token verification:', data);
      return data;
    }
  } catch (error) {
    console.error('Error verifying token:', error);
  }
};

export const getUser = async () => {
  if (typeof window === 'undefined') {
    return null;
  }

  const token = localStorage.getItem('token');
  if (!token) {
    return null;
  }

  try {
    const response = await fetch('/api/auth/getUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    const data = await response.json();
    return (data?.user as User) || null;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};

export const setTokenInLocalStorage = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
  }
};
