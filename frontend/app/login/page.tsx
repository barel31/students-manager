'use client';

import { useState } from 'react';
import LoginForm from '@/app/components/LoginForm';

export default function Login() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 sm:items-start">
        <h1 className="text-3xl font-bold">Login</h1>
        <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight">
            Please enter your credentials to login.
          </h1>
        </div>
        <div>
          <LoginForm />
          {errorMessage && <p className="mt-4 text-red-500">{errorMessage}</p>}
        </div>
      </main>
    </div>
  );
}
