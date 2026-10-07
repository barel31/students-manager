'use client';

import { useState } from 'react';
import LoginForm from '@/components/LoginForm';
import { setTokenInLocalStorage } from '@/helpers/auth';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = (data: { name: string; id: string }) => {
    const login = async () => {
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          const data = await response.json();
          console.log('Login successful:', data);
          setTokenInLocalStorage(data.token);
          setSuccessMessage(data.message);
          setErrorMessage(null);
          router.push('/manager');
        } else {
          console.log('Login failed:', response.statusText);
          setErrorMessage(`Login failed: ${response.statusText}`);
          setSuccessMessage(null);
        }
      } catch (error) {
        console.log('Error during login:', error);
        setErrorMessage('An error occurred during login. Please try again.');
        setSuccessMessage(null);
      }
    };

    login();
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="text-3xl font-bold">Login</h1>
        <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Please enter your credentials to login.
          </h1>
        </div>
        <div>
          <LoginForm onSubmit={handleSubmit} />
          <p
            className={`mt-4 ${errorMessage ? 'text-red-500' : 'text-green-500'}`}>
            {errorMessage || successMessage}
          </p>
        </div>
      </main>
    </div>
  );
}
