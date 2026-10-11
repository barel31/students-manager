import LoginForm from '@/components/LoginForm';

export default function Login() {
  return (
    <main className="font-sans flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 sm:items-start">
      <h1 className="text-3xl font-bold">Login</h1>
      <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
        <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight">
          Please enter your credentials to login.
        </h1>
      </div>
      <div>
        <LoginForm />
      </div>
    </main>
  );
}
