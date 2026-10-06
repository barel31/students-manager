'use client';

import { useState } from 'react';
import LoginForm from '@/components/LoginForm';

export default function Login() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (data: { name: string; id: string }) => {
    async function login() {
      console.log('Submitting login data:', data);
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          const data = await response.json();
          console.log('Login successful:', data);
        } else {
          console.log('Login failed:', response.statusText);
          setErrorMessage(response.statusText);
        }
      } catch (error) {
        console.log('Error during login:', error);
        setErrorMessage('An error occurred during login. Please try again.');
      }
    }

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
        <LoginForm onSubmit={handleSubmit} />
      </main>
    </div>
  );
}
